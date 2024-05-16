import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import { sdkService } from '../../commercetool/sdk.service';
import { AuthFormHeader } from '../../components/AuthFormHeader/AuthFormHeader';
import { Input } from '../../components/input/input';
import { useAuth } from '../../contexts/authProvider';
import { CustomErrors } from '../../types/enums';
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

export interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: 'onChange' });

  const { isLoggedIn, login } = useAuth();

  const [isLoginError, setIsLoginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    // const emailRegistered = await sdkService.checkCustomerIsRegistered(data.email);
    const emailRegistered = true;

    if (emailRegistered) {
      const loginResult = await sdkService.loginUser(data.email, data.password);
      setIsLoginError(false);
      if (loginResult) {
        login();
        setIsPasswordError(false);
      } else {
        sdkService.createAnonymousClient();
        setIsPasswordError(true);
      }
    } else {
      setIsLoginError(true);
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            name="email"
            label="E-mail"
            placeholder="E-mail"
            register={register}
            validationSchema={emailValidationRules}
          />

          <p className={styles.emailError}>{isLoginError ? CustomErrors.LOGIN_ERROR : errors?.email?.message}</p>

          <Input
            name="password"
            label="Password"
            placeholder="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            register={register}
            validationSchema={passwordValidationRules}
          />

          <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
            <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
          </button>

          <p className={styles.passwordError}>
            {isPasswordError ? CustomErrors.PASSWORD_ERROR : errors?.password?.message}
          </p>

          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
