/* eslint-disable react-hooks/exhaustive-deps */
import { Customer, CustomerDraft, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { useEffect, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import styles from './Account.module.scss';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

const emailValidationRules: RegisterOptions = {
  required: 'E-mail is required',
  pattern: {
    value: validEmailRegExp,
    message: 'Invalid e-mail format',
  },
};

const nameValidationRules: RegisterOptions = {
  required: 'This field is required',
  pattern: {
    value: onlyLatinLettersRegExp,
    message: 'Only Latin letters are allowed',
  },
};

const dateValidationRules: RegisterOptions = {
  required: 'This field is required',
  validate: value => {
    const dateOfBirth = new Date(value);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);

    return dateOfBirth <= minAgeDate || 'You must be 13 years old or older';
  },
};

interface AccountProps {
  customerData: Customer;
}

export const Account = ({ customerData }: AccountProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CustomerDraft>({ mode: 'all' });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue('email', customerData.email);
    setValue('firstName', customerData.firstName);
    setValue('lastName', customerData.lastName);
    setValue('dateOfBirth', customerData.dateOfBirth);
  }, [customerData]);

  const watchedFields = watch(['email', 'firstName', 'lastName', 'dateOfBirth']);

  const onSubmit = () => {
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

    console.log(newChanges);
    // setIsEditing(false);
  };

  return (
    <div className={styles.account}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputsSection}>
          <div>
            <Input
              name="email"
              label="E-mail:"
              register={register}
              validationSchema={emailValidationRules}
              isInvalid={!!errors.email}
              disabled={!isEditing}
              required
              autocomplete="username"
            />
            <p className={styles.emailError}>{errors?.email?.message}</p>
          </div>
          <div>
            <Input
              name="firstName"
              label="First name:"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.firstName}
              disabled={!isEditing}
              required
            />
            <p className={styles.firstNameError}>{errors?.firstName?.message}</p>
          </div>
          <div>
            <Input
              name="lastName"
              label="Last name:"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.lastName}
              disabled={!isEditing}
              required
            />
            <p className={styles.lastNameError}>{errors?.lastName?.message}</p>
          </div>
          <div>
            <Input
              name="dateOfBirth"
              label="Date of birth:"
              type="date"
              register={register}
              validationSchema={dateValidationRules}
              isInvalid={!!errors.dateOfBirth}
              disabled={!isEditing}
              required
            />
            <p className={styles.dateOfBirthError}>{errors?.dateOfBirth?.message}</p>
          </div>
        </div>
        <button
          type={!isEditing ? 'submit' : 'button'}
          className={styles.submitButton}
          disabled={!(isValid || !isEditing)}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Submit' : 'Edit'}
        </button>
      </form>
    </div>
  );
};
