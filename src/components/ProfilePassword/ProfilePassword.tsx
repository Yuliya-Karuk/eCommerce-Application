/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import styles from './ProfilePassword.module.scss';

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

interface ProfilePasswordProps {
  customerData: Customer;
}

export const ProfilePassword = ({ customerData }: ProfilePasswordProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    formState: { errors, isValid },
  } = useForm<CustomerDraft>({ mode: 'all' });

  const [isEditing, setIsEditing] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // const watchedFields = watch(['password']);

  const setInputs = () => {
    setValue('password', '');
  };

  const resetChanges = () => {
    setInputs();
    setDataEdited(false);
    setIsEditing(!isEditing);
  };

  const onSubmitPassword = () => {
    console.log('gdgd');
  };

  useEffect(() => {
    setInputs();
    setDataEdited(true);
  }, [customerData]);

  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} className={styles.form}>
      {isEditing && (
        <div className={styles.inputContainer}>
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
        </div>
      )}
      {isEditing && (
        <div className={styles.inputContainer}>
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
        </div>
      )}
      <div className={styles.buttons}>
        <button type="button" className={styles.submitButton} onClick={resetChanges}>
          {isEditing ? 'Reset' : 'Change'}
        </button>
        <button
          className={classnames(styles.submitButton, { [styles.hidden]: !isEditing })}
          type="submit"
          disabled={!isValid || !dataEdited}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
