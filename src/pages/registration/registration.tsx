import { CustomerDraft } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import { AddressForm } from '../../components/AddressForm/AddressForm';
import { AuthFormHeader } from '../../components/AuthFormHeader/AuthFormHeader';
import { Input } from '../../components/Input/Input';
import { InputDateErrors, InputEmailErrors, InputNameErrors, InputPasswordErrors } from '../../utils/validationConst';
import styles from './registration.module.scss';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

const passwordValidationRules: RegisterOptions = {
  required: InputPasswordErrors.required,
  minLength: { value: 8, message: InputPasswordErrors.minLength },
  validate: {
    uppercase: value => /(?=.*[A-Z])/.test(value) || InputPasswordErrors.uppercase,
    lowercase: value => /(?=.*[a-z])/.test(value) || InputPasswordErrors.lowercase,
    digit: value => /(?=.*\d)/.test(value) || InputPasswordErrors.digit,
    specialChar: value => /(?=.*[!@#$%^&*])/.test(value) || InputPasswordErrors.specialChar,
    noWhitespace: value => !/\s/.test(value) || InputPasswordErrors.noWhitespace,
  },
};

const emailValidationRules: RegisterOptions = {
  required: InputEmailErrors.required,
  pattern: {
    value: validEmailRegExp,
    message: InputEmailErrors.pattern,
  },
};

const nameValidationRules: RegisterOptions = {
  required: InputNameErrors.required,
  pattern: {
    value: onlyLatinLettersRegExp,
    message: InputNameErrors.pattern,
  },
};

const dateValidationRules: RegisterOptions = {
  required: InputDateErrors.required,
  validate: value => {
    const dateOfBirth = new Date(value);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);

    return dateOfBirth <= minAgeDate || InputDateErrors.minAge;
  },
};

// eslint-disable-next-line max-lines-per-function
export function Registration() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    unregister,
  } = useForm<CustomerDraft>({ mode: 'all' });

  const [billingAddressIsSameAsShipping, setBillingAddressIsSameAsShipping] = useState<boolean>(false);

  const onSubmit = async (data: CustomerDraft) => {
    console.log(data); // form submission logic here
  };

  useEffect(() => {
    setValue('shippingAddresses', [0]);

    if (billingAddressIsSameAsShipping) {
      setValue('billingAddresses', [0]);
      unregister(`addresses.1`);
    } else {
      setValue('billingAddresses', [1]);
    }
  }, [billingAddressIsSameAsShipping, setValue, unregister]);

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <AuthFormHeader
          titleText="Registration"
          linkDescription="Already have an account?"
          linkText="Log in"
          linkTo="/login"
        />
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

              <Input
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
              <p className={styles.passwordError}>{errors?.password?.message}</p>

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

            <AddressForm
              register={register}
              index={0}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
              unregister={unregister}
              billingAddressIsSameAsShipping={billingAddressIsSameAsShipping}
              setBillingAddressIsSameAsShipping={setBillingAddressIsSameAsShipping}
            />

            {billingAddressIsSameAsShipping ? (
              ''
            ) : (
              <AddressForm
                register={register}
                index={1}
                errors={errors}
                trigger={trigger}
                setValue={setValue}
                unregister={unregister}
                billingAddressIsSameAsShipping={billingAddressIsSameAsShipping}
                setBillingAddressIsSameAsShipping={setBillingAddressIsSameAsShipping}
              />
            )}
          </div>
          <button type="submit" className={styles.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
