import { CustomerDraft } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Input } from '../Input/Input';
import styles from './AddressForm.module.scss';

interface AddressFormProps {
  register: UseFormRegister<CustomerDraft>;
  errors: FieldErrors<CustomerDraft>;
  index: 0 | 1;
}

const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

const cityValidationRules: RegisterOptions = {
  required: 'This field is required',
  pattern: {
    value: onlyLatinLettersRegExp,
    message: 'City must contain latin letter and no special characters or numbers',
  },
};

const countries = ['Europe', 'Belarus', 'Poland'];

const getPostalCodeValidationRules = (selectedCountry: string): RegisterOptions => {
  switch (selectedCountry) {
    case 'Europe':
      return {
        required: 'Postal code is required',
        pattern: {
          value: /^[0-9]{5}$/, // Example pattern for Europe postal code
          message: 'Invalid postal code format for Europe',
        },
      };
    case 'Belarus':
      return {
        required: 'Postal code is required',
        pattern: {
          value: /^[0-9]{6}$/, // Example pattern for Belarus postal code
          message: 'Invalid postal code format for Belarus',
        },
      };
    case 'Poland':
      return {
        required: 'Postal code is required',
        pattern: {
          value: /^[0-9]{2}-[0-9]{3}$/, // Example pattern for Poland postal code
          message: 'Invalid postal code format for Poland',
        },
      };
    default:
      return {
        required: 'Postal code is required',
      };
  }
};

// eslint-disable-next-line max-lines-per-function
export function AddressForm(props: AddressFormProps) {
  const { register, errors, index } = props;
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <>
      <label htmlFor={`country-${index}`} className={styles.label}>
        Country:<span className={styles.orange}>*</span>
        <select
          id={`country-${index}`}
          className={styles.select}
          {...register(`addresses.${index}.country`, { required: true })}
          defaultValue=""
          onChange={handleCountryChange}
        >
          <option value="" disabled hidden>
            Select country
          </option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <p className={styles.countryError}>{errors?.addresses?.[index]?.country?.message}</p>

      <Input
        name={`addresses.${index}.city`}
        label="City:"
        placeholder="City"
        register={register}
        validationSchema={cityValidationRules}
        isInvalid={!!errors.addresses?.[index]?.city}
        required
      />
      <p className={styles.addressError}>{errors?.addresses?.[index]?.city?.message}</p>

      <Input
        name={`addresses.${index}.postalCode`}
        label="Postal code:"
        placeholder="Postal code"
        register={register}
        validationSchema={getPostalCodeValidationRules(selectedCountry)}
        isInvalid={!!errors.addresses?.[index]?.postalCode}
        required
      />
      <p className={styles.addressError}>{errors?.addresses?.[index]?.postalCode?.message}</p>

      <Input
        name={`addresses.${index}.streetName`}
        label="Street name:"
        placeholder="Street name"
        register={register}
        validationSchema={{ required: 'This field is required' }}
        isInvalid={!!errors.addresses?.[index]?.streetName}
        required
      />
      <p className={styles.addressError}>{errors?.addresses?.[index]?.streetName?.message}</p>
    </>
  );
}
