import { useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import { AuthFormHeader } from '../../components/AuthFormHeader/AuthFormHeader';
import { Input } from '../../components/Input_/Input_';
import styles from './registration.module.scss';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

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

interface Address {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
}
// Replace with "CustomerDraft"
export interface RegisterFormData {
  email: string;
  password: string;
  addresses: Address[];
  defaultShippingAddress: number;
  defaultBillingAddress: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

// eslint-disable-next-line max-lines-per-function
export function Registration() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: 'onChange' });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data); // form submission logic here
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <AuthFormHeader
          titleText="Registration"
          linkDescription="Already have an account?"
          linkText="Go to login page"
          linkTo="/login"
        />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <section className={styles.userDataSection}>
            <Input
              name="email"
              label="E-mail:"
              placeholder="E-mail"
              register={register}
              validationSchema={emailValidationRules}
              isInvalid={!!errors.email}
              required
            />
            <p className={styles.emailError}>{errors?.email?.message}</p>

            <Input
              name="password"
              label="Password:"
              placeholder="Password"
              type={isPasswordVisible ? 'text' : 'password'}
              register={register}
              validationSchema={passwordValidationRules}
              isInvalid={!!errors.password}
              required
            />
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
              <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
            </button>
            <p className={styles.passwordError}>{errors?.password?.message}</p>

            <Input
              name="firstName"
              label="First name:"
              placeholder="First name"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.firstName}
              required
            />
            <p className={styles.firstNameError}>{errors?.firstName?.message}</p>

            <Input
              name="lastName"
              label="Last name:"
              placeholder="Last name"
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
          <section className={styles.userAddressSection}>
            <div>
              <Input
                name="addresses.0.country"
                label="Country:"
                placeholder="Country"
                register={register}
                validationSchema={{ required: 'This field is required' }}
                isInvalid={!!errors.addresses?.[0]?.country}
                required
              />
              <p className={styles.firstNameError}>{errors?.addresses?.[0]?.country?.message}</p>

              <Input
                name="addresses.0.city"
                label="City:"
                placeholder="City"
                register={register}
                validationSchema={{ required: 'This field is required' }}
                isInvalid={!!errors.addresses?.[0]?.city}
                required
              />
              <p className={styles.lastNameError}>{errors?.addresses?.[0]?.city?.message}</p>

              <Input
                name="addresses.0.postalCode"
                label="Postal code:"
                placeholder="Postal code"
                // type="date"
                register={register}
                validationSchema={{ required: 'This field is required' }}
                isInvalid={!!errors.addresses?.[0]?.postalCode}
                required
              />
              <p className={styles.dateOfBirthError}>{errors?.addresses?.[0]?.postalCode?.message}</p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
