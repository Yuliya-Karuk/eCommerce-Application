import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './login.module.scss';

function LoginFormHeader() {
  return (
    <>
      <h1 className={styles.title}>Log In</h1>
      <div className={styles.linkWrapper}>
        <h2 className={styles.subtitle}>New to this site?</h2>
        <Link to="/registration" className={styles.link}>
          Sign Up
        </Link>
      </div>
    </>
  );
}

// eslint-disable-next-line max-lines-per-function
export function LoginForm() {
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
    // eslint-disable-next-line no-console
    console.log(data); // form submission logic here
  };
  return (
    <div className={styles.wrapper}>
      <LoginFormHeader />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Email"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format',
              },
            })}
            autoComplete="username"
          />
        </label>

        {errors.email && <p className={styles.errors}>{errors.email.message}</p>}

        <label htmlFor="password" className={styles.label}>
          <div className={styles.showPasswordWrapper}>
            Password
            <label htmlFor="showPasswordCheckbox">
              <input
                type="checkbox"
                id="showPasswordCheckbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
          <input
            className={styles.input}
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              validate: {
                uppercase: value =>
                  /(?=.*[A-Z])/.test(value) || 'Password must contain at least one uppercase letter (A-Z)',
                lowercase: value =>
                  /(?=.*[a-z])/.test(value) || 'Password must contain at least one lowercase letter (a-z)',
                digit: value => /(?=.*\d)/.test(value) || 'Password must contain at least one digit (0-9)',
                specialChar: value =>
                  /(?=.*[!@#$%^&*])/.test(value) ||
                  'Password must contain at least one special character (e.g., !@#$%^&*)',
                noWhitespace: value => !/\s/.test(value) || 'Password cannot contain leading or trailing whitespace',
              },
            })}
            autoComplete="current-password"
          />
        </label>
        {errors.password && <p className={styles.errors}>{errors.password.message}</p>}

        <button type="submit" className={styles.submitButton} disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}
