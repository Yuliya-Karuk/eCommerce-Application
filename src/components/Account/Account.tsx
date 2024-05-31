/* eslint-disable max-lines-per-function */
import { sdkService } from '@commercetool/sdk.service';
import { Customer, CustomerDraft, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { ProfilePassword } from '@components/ProfilePassword/ProfilePassword';
import { useToast } from '@contexts/toastProvider';
import { SuccessUpdateDataMessage } from '@utils/constants';
import { dateValidationRules, emailValidationRules, nameValidationRules } from '@utils/validationConst';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Account.module.scss';

interface AccountProps {
  customerData: Customer;
  setCustomerData: (data: Customer) => void;
}

export const Account = ({ customerData, setCustomerData }: AccountProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CustomerDraft>({ mode: 'all' });

  const [isEditing, setIsEditing] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);
  const { successNotify, errorNotify } = useToast();

  const watchedFields = watch(['email', 'firstName', 'lastName', 'dateOfBirth']);

  const setInputs = () => {
    setValue('email', customerData.email);
    setValue('firstName', customerData.firstName);
    setValue('lastName', customerData.lastName);
    setValue('dateOfBirth', customerData.dateOfBirth);
  };

  const resetChanges = () => {
    setInputs();
    setDataEdited(false);
    setIsEditing(!isEditing);
  };

  const onSubmitInfo = async () => {
    const newChanges: MyCustomerUpdateAction[] = [];
    if (watchedFields[0] !== customerData.email) {
      newChanges.push({ action: 'changeEmail', email: watchedFields[0] });
    }
    if (watchedFields[1] !== customerData.firstName) {
      newChanges.push({ action: 'setFirstName', firstName: watchedFields[1] });
    }
    if (watchedFields[2] !== customerData.lastName) {
      newChanges.push({ action: 'setLastName', lastName: watchedFields[2] });
    }
    if (watchedFields[3] !== customerData.dateOfBirth) {
      newChanges.push({ action: 'setDateOfBirth', dateOfBirth: watchedFields[3] });
    }

    try {
      const newCustomer = await sdkService.updateAccountData({
        version: customerData.version,
        actions: newChanges,
      });
      setCustomerData(newCustomer);
      successNotify(SuccessUpdateDataMessage);
    } catch (e) {
      errorNotify((e as Error).message);
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (
      watchedFields[0] !== customerData.email ||
      watchedFields[1] !== customerData.firstName ||
      watchedFields[2] !== customerData.lastName ||
      watchedFields[3] !== customerData.dateOfBirth
    ) {
      setDataEdited(true);
    } else {
      setDataEdited(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedFields]);

  useEffect(() => {
    setInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  return (
    <div className={styles.account}>
      <h2 className={styles.accountHeading}>Personal info</h2>
      <form onSubmit={handleSubmit(onSubmitInfo)} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            name="email"
            label="E-mail:"
            register={register}
            validationSchema={emailValidationRules}
            isInvalid={!!errors.email}
            disabled={!isEditing}
            autocomplete="username"
          />
          <p className={styles.error}>{errors?.email?.message}</p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            name="firstName"
            label="First name:"
            register={register}
            validationSchema={nameValidationRules}
            isInvalid={!!errors.firstName}
            disabled={!isEditing}
          />
          <p className={styles.error}>{errors?.firstName?.message}</p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            name="lastName"
            label="Last name:"
            register={register}
            validationSchema={nameValidationRules}
            isInvalid={!!errors.lastName}
            disabled={!isEditing}
          />
          <p className={styles.error}>{errors?.lastName?.message}</p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            name="dateOfBirth"
            label="Date of birth:"
            type="date"
            register={register}
            validationSchema={dateValidationRules}
            isInvalid={!!errors.dateOfBirth}
            disabled={!isEditing}
          />
          <p className={styles.error}>{errors?.dateOfBirth?.message}</p>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.submitButton} onClick={resetChanges}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            className={classnames(styles.submitButton, { [styles.hidden]: !isEditing })}
            type="submit"
            disabled={!(isValid && dataEdited)}
          >
            Save
          </button>
        </div>
      </form>
      <h2 className={styles.accountHeading}>Password</h2>
      <ProfilePassword customerData={customerData} />
    </div>
  );
};
