import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
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
    formState: { errors, isValid },
  } = useForm<CustomerDraft>({ mode: 'all' });

  console.log(customerData);

  setValue('email', customerData.email);
  setValue('firstName', customerData.firstName);
  setValue('lastName', customerData.lastName);
  setValue('dateOfBirth', customerData.dateOfBirth);

  const onSubmit = () => {
    console.log('request');
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
              required
            />
            <p className={styles.dateOfBirthError}>{errors?.dateOfBirth?.message}</p>
          </div>
        </div>
        <button type="submit" className={styles.submitButton} disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
