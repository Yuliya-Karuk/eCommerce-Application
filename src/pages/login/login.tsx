import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { sdkService } from '@commercetool/sdk.service';
import { AuthFormHeader } from '@components/AuthFormHeader/AuthFormHeader';
import { Input } from '@components/Input/Input';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { LoginFormData } from 'src/modals/index';
import styles from './login.module.scss';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordValidationRules: RegisterOptions = {
  required: 'Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters long' },
  validate: {
    uppercase: value => /(?=.*[A-Z])/.test(value) || 'Password must contain at least one uppercase letter (A-Z)',
    lowercase: value => /(?=.*[a-z])/.test(value) || 'Password must contain at least one lowercase letter (a-z)',
    digit: value => /(?=.*\d)/.test(value) || 'Password must contain at least one digit (0-9)',
    specialChar: value =>
      /(?=.*[!@#$%^&*])/.test(value) || 'Password must contain at least one special character (e.g., !@#$%^&*)',
    noWhitespace: value => !/\s/.test(value) || 'Password cannot contain leading or trailing whitespace',
  },
};

const emailValidationRules: RegisterOptions = {
  required: 'E-mail is required',
  pattern: {
    value: validEmailRegExp,
    message: 'Invalid e-mail format',
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
