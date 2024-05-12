import classNames from 'classnames';
import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import { AuthFormHeader } from '../../components/AuthFormHeader/AuthFormHeader';
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

// eslint-disable-next-line max-lines-per-function
export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: 'onChange' });

  const onSubmit = (data: LoginFormData) => {
    console.log(data); // form submission logic here
  };
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
          <label htmlFor="e-mail" className={styles.label}>
            Email
            <input
              className={classNames(styles.input, { [styles.invalid]: errors.email })}
              type="email"
              id="e-mail"
              placeholder="E-mail"
              {...register('email', emailValidationRules)}
              autoComplete="username"
            />
          </label>
          <p className={styles.errors}>{errors?.email?.message}</p>

          <label htmlFor="password" className={styles.label}>
            <div className={styles.showPasswordWrapper}>Password</div>
            <input
              className={classNames(styles.input, { [styles.invalid]: errors.password })}
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              {...register('password', passwordValidationRules)}
              autoComplete="current-password"
            />
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
              <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
            </button>
          </label>
          <p className={styles.errors}>{errors?.password?.message}</p>
          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
