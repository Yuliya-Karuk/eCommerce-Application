import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import styles from './login.module.scss';

function LoginFormHeader() {
  return (
    <>
      <h1 className={styles.title}>Log In</h1>
      <div className={styles.linkWrapper}>
        <p className={styles.subtitle}>New to this site?</p>
        <Link to="/registration" className={styles.link}>
          Sign Up
        </Link>
      </div>
    </>
  );
}

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface PasswordValidationProps {
  required: string;
  minLength: { value: number; message: string };
  validate: {
    uppercase: (value: string) => boolean | string;
    lowercase: (value: string) => boolean | string;
    digit: (value: string) => boolean | string;
    specialChar: (value: string) => boolean | string;
    noWhitespace: (value: string) => boolean | string;
  };
}

const passwordValidationProps: PasswordValidationProps = {
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

// eslint-disable-next-line max-lines-per-function
export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data); // form submission logic here
  };
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <LoginFormHeader />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="e-mail" className={styles.label}>
            Email
            <input
              className={classNames(styles.input, { [styles.invalid]: errors.email })}
              type="email"
              id="e-mail"
              placeholder="E-mail"
              {...register('email', {
                required: 'E-mail is required',
                pattern: {
                  value: validEmailRegExp,
                  message: 'Invalid e-mail format',
                },
              })}
              autoComplete="username"
            />
          </label>

          {errors.email && <p className={styles.errors}>{errors.email.message}</p>}

          <label htmlFor="password" className={styles.label}>
            <div className={styles.showPasswordWrapper}>Password</div>
            <input
              className={classNames(styles.input, { [styles.invalid]: errors.password })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              {...register('password', passwordValidationProps)}
              autoComplete="current-password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eye}>
              <img src={showPassword ? eyeOn : eyeOff} alt="eye" />
            </button>
          </label>
          {errors.password && <p className={styles.errors}>{errors.password.message}</p>}

          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
