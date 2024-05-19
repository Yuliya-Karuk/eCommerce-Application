import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import { AuthFormHeader } from '../../components/AuthFormHeader/AuthFormHeader';
import { Input } from '../../components/Input/Input';
import { EmailLoginErrors, PasswordLoginErrors } from '../../utils/validationConst';
import styles from './login.module.scss';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordValidationRules: RegisterOptions = {
  required: PasswordLoginErrors.required,
  minLength: { value: 8, message: PasswordLoginErrors.minLength },
  validate: {
    uppercase: value => /(?=.*[A-Z])/.test(value) || PasswordLoginErrors.uppercase,
    lowercase: value => /(?=.*[a-z])/.test(value) || PasswordLoginErrors.lowercase,
    digit: value => /(?=.*\d)/.test(value) || PasswordLoginErrors.digit,
    specialChar: value => /(?=.*[!@#$%^&*])/.test(value) || PasswordLoginErrors.specialChar,
    noWhitespace: value => !/\s/.test(value) || PasswordLoginErrors.noWhitespace,
  },
};

const emailValidationRules: RegisterOptions = {
  required: EmailLoginErrors.required,
  pattern: {
    value: validEmailRegExp,
    message: EmailLoginErrors.pattern,
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
    </div>
  );
}
