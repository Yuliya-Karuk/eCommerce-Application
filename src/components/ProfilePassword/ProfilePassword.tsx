import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { passwordValidationRules } from '@utils/validationConst';
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
  } = useForm<MyCustomerChangePassword>({ mode: 'all' });

  // const [isEditing, setIsEditing] = useState(false);
  // const [dataEdited, setDataEdited] = useState(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  // const watchedFields = watch(['password']);

  const resetPasswordFields = () => {
    setValue('currentPassword', '');
    setValue('newPassword', '');
  };

  // const resetChanges = () => {
  //   setInputs();
  //   // setDataEdited(false);
  //   setIsEditing(!isEditing);
  // };

  const onSubmitPassword = (data: MyCustomerChangePassword) => {
    const changePswdRequest = {
      version: 1, // The current version of the customer's data
      actions: [
        {
          action: 'changePassword',
          ...data,
        },
      ],
    };

    console.log(changePswdRequest);
    resetPasswordFields();
  };

  useEffect(() => {
    resetPasswordFields();
    // setDataEdited(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} className={styles.form}>
      <div className={styles.inputContainer}>
        <Input
          name="currentPassword"
          label="Current password:"
          type={isCurrentPasswordVisible ? 'text' : 'password'}
          register={register}
          validationSchema={passwordValidationRules}
          isInvalid={!!errors.currentPassword}
          autocomplete="current-password"
        />

        <button
          type="button"
          onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
          className={styles.eye}
        >
          <img src={isCurrentPasswordVisible ? eyeOn : eyeOff} alt="eye" />
        </button>

        <p className={styles.error}>{errors?.currentPassword?.message}</p>
      </div>
      <div className={styles.inputContainer}>
        <Input
          name="newPassword"
          label="New-password"
          type={isNewPasswordVisible ? 'text' : 'password'}
          register={register}
          validationSchema={passwordValidationRules}
          isInvalid={!!errors.newPassword}
          autocomplete="new-password"
        />

        <button type="button" onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} className={styles.eye}>
          <img src={isNewPasswordVisible ? eyeOn : eyeOff} alt="eye" />
        </button>

        <p className={styles.error}>{errors?.newPassword?.message}</p>
      </div>
      <div className={styles.buttons}>
        {/* <button type="button" className={styles.submitButton} onClick={resetChanges}>
          {isEditing ? 'Reset' : 'Change'}
        </button> */}
        <button
          // className={classnames(styles.submitButton, { [styles.hidden]: !isEditing })}
          className={styles.submitButton}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
