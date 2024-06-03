import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { sdkService } from '@commercetool/sdk.service';
import { tokenController } from '@commercetool/token.service';
import { Customer } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { useToast } from '@contexts/toastProvider';
import { ChangePasswordData } from '@models/index';
import { SuccessUpdatePasswordMessage } from '@utils/constants';
import { storage } from '@utils/storage';
import { passwordValidationRules } from '@utils/validationConst';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ProfilePassword.module.scss';

interface ProfilePasswordProps {
  customerData: Customer;
  setCustomerData: (data: Customer) => void;
}

export const ProfilePassword = ({ customerData, setCustomerData }: ProfilePasswordProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ChangePasswordData>({ mode: 'onChange' });

  const [isEditing, setIsEditing] = useState(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const { successNotify, errorNotify } = useToast();

  const resetPasswordFields = () => {
    setValue('currentPassword', '');
    setValue('newPassword', '');
  };

  const resetChanges = () => {
    resetPasswordFields();
    setIsEditing(!isEditing);
  };

  const onSubmitPassword = async (data: ChangePasswordData) => {
    let result;
    try {
      result = await sdkService.updatePassword({
        version: customerData.version,
        ...data,
      });
      resetPasswordFields();

      result = await sdkService.loginUser(result.email, data.newPassword);
      storage.setTokenStore(tokenController.get());

      setCustomerData(result);
      successNotify(SuccessUpdatePasswordMessage);
    } catch (e) {
      errorNotify((e as Error).message);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    resetPasswordFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  return (
    <>
      <h2 className={styles.heading}>Password</h2>
      <form onSubmit={handleSubmit(onSubmitPassword)} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            name="currentPassword"
            label="Current password:"
            type={isCurrentPasswordVisible ? 'text' : 'password'}
            register={register}
            validationSchema={passwordValidationRules}
            disabled={!isEditing}
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
            disabled={!isEditing}
            isInvalid={!!errors.newPassword}
            autocomplete="new-password"
          />

          <button type="button" onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} className={styles.eye}>
            <img src={isNewPasswordVisible ? eyeOn : eyeOff} alt="eye" />
          </button>

          <p className={styles.error}>{errors?.newPassword?.message}</p>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.submitButton} onClick={resetChanges}>
            {isEditing ? 'Reset' : 'Change'}
          </button>
          <button
            className={classnames(styles.submitButton, { [styles.hidden]: !isEditing })}
            type="submit"
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
