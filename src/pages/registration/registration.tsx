import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { sdkService } from '@commercetool/sdk.service';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { AddressForm } from '@components/AddressForm/AddressForm';
import { AuthFormHeader } from '@components/AuthFormHeader/AuthFormHeader';
import { Input } from '@components/Input/Input';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { InputDateErrors, InputEmailErrors, InputNameErrors, InputPasswordErrors } from '@utils/validationConst';
import { useEffect, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
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
  const { isLoggedIn, login } = useAuth();
  const { customToast, promiseNotify } = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    getValues,
    unregister,
  } = useForm<CustomerDraft>({ mode: 'all' });

  const [billingAddressIsSameAsShipping, setBillingAddressIsSameAsShipping] = useState<boolean>(false);

  useEffect(() => {
    setValue('shippingAddresses', [0]);

    if (billingAddressIsSameAsShipping) {
      setValue('billingAddresses', [0]);
      unregister(`addresses.1`);
      if (getValues('defaultShippingAddress') === 0) {
        setValue('defaultBillingAddress', 0);
      } else {
        unregister('defaultBillingAddress');
      }
    } else {
      setValue('billingAddresses', [1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingAddressIsSameAsShipping, setValue, unregister]);

  const onSubmit = async (userData: CustomerDraft) => {
    try {
      await sdkService.register(userData);
      await sdkService.loginUser(userData.email, userData.password as string);
      login();
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      throw new Error(errorMessage);
    }
  };

  const notify = (userData: CustomerDraft) => promiseNotify(userData, 'Registration', onSubmit);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <AuthFormHeader
          titleText="Registration"
          linkDescription="Already have an account?"
          linkText="Log in"
          linkTo="/login"
        />
        <form onSubmit={handleSubmit(notify)} className={styles.form}>
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
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
}
