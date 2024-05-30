import { CustomerDraft } from '@commercetools/platform-sdk';
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

export const Account = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CustomerDraft>({ mode: 'all' });

  const onSubmit = () => {
    console.log('request');
  };

  return (
    <div className={styles.account}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputsSection}>
          <section className={styles.userDataSection}>
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

            {/* <Input
              name="password"
              label="Password:"
              type={isPasswordVisible ? 'text' : 'password'}
              register={register}
              validationSchema={passwordValidationRules}
              isInvalid={!!errors.password}
              required
              autocomplete="new-password"
            />
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
              <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
            </button>
            <p className={styles.passwordError}>{errors?.password?.message}</p> */}

            <Input
              name="firstName"
              label="First name:"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.firstName}
              required
            />
            <p className={styles.firstNameError}>{errors?.firstName?.message}</p>

            <Input
              name="lastName"
              label="Last name:"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.lastName}
              required
            />
            <p className={styles.lastNameError}>{errors?.lastName?.message}</p>

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
          </section>
        </div>
        <button type="submit" className={styles.submitButton} disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
