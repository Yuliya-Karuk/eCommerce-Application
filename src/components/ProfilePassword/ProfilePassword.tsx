import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { passwordValidationRules } from '@utils/validationConst';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ProfilePassword.module.scss';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} className={styles.form}>
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
