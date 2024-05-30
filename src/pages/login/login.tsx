import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { sdkService } from '@commercetool/sdk.service';
import { AuthFormHeader } from '@components/AuthFormHeader/AuthFormHeader';
import { Input } from '@components/Input/Input';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { LoginFormData } from '@models/index';
import { InputEmailErrors, InputPasswordErrors } from '@utils/validationConst';
import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styles from './login.module.scss';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordValidationRules: RegisterOptions = {
  required: InputPasswordErrors.required,
  minLength: { value: 8, message: InputPasswordErrors.minLength },
  validate: {
    uppercase: value => /(?=.*[A-Z])/.test(value) || InputPasswordErrors.uppercase,
    lowercase: value => /(?=.*[a-z])/.test(value) || InputPasswordErrors.lowercase,
    digit: value => /(?=.*\d)/.test(value) || InputPasswordErrors.digit,
    specialChar: value => /(?=.*[!@#$%^&*])/.test(value) || InputPasswordErrors.specialChar,
    noWhitespace: value => !/\s/.test(value) || InputPasswordErrors.noWhitespace,
  },
};

const emailValidationRules: RegisterOptions = {
  required: InputEmailErrors.required,
  pattern: {
    value: validEmailRegExp,
    message: InputEmailErrors.pattern,
  },
};

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: 'onChange' });

  const { isLoggedIn, login } = useAuth();
  const { customToast, promiseNotify } = useToast();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await sdkService.loginUser(data.email, data.password);
      login();
    } catch (error) {
      sdkService.createAnonymousClient();
      const errorMessage = (error as Error).message || 'Unknown error';
      throw new Error(errorMessage);
    }
  };

  const notify = (userData: LoginFormData) => promiseNotify(userData, 'Login', onSubmit);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <AuthFormHeader
          titleText="Log in"
          linkDescription="New to this site?"
          linkText="Sign Up"
          linkTo="/registration"
        />
        <form onSubmit={handleSubmit(notify)} className={styles.form}>
          <Input
            name="email"
            label="E-mail"
            register={register}
            validationSchema={emailValidationRules}
            isInvalid={!!errors.email}
            required
            autocomplete="username"
          />

          <p className={styles.emailError}>{errors?.email?.message}</p>

          <Input
            name="password"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            register={register}
            validationSchema={passwordValidationRules}
            isInvalid={!!errors.password}
            required
            autocomplete="current-password"
          />

          <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
            <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
          </button>

          <p className={styles.passwordError}>{errors?.password?.message}</p>

          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
}
