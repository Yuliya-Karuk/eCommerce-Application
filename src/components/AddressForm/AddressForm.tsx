import { CustomerDraft } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { Input } from '../Input/Input';
import styles from './AddressForm.module.scss';

interface AddressFormProps {
  register: UseFormRegister<CustomerDraft>;
  errors: FieldErrors<CustomerDraft>;
  index: 0 | 1;
  trigger: UseFormTrigger<CustomerDraft>;
}

const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

const cityValidationRules: RegisterOptions = {
  required: 'This field is required',
  pattern: {
    value: onlyLatinLettersRegExp,
    message: 'City must contain latin letter and no special characters or numbers',
  },
};

const countries = ['Germany', 'Belarus', 'Poland'];

const getPostalCodeValidationRules = (selectedCountry: string): RegisterOptions => {
  switch (selectedCountry) {
    case 'Germany':
      return {
        required: 'Postal code is required',
        pattern: {
          value: /^[0-9]{5}$/, // Example pattern for Germany postal code
          message: 'Postal code format for Germany - 5 digits',
        },
      };
    case 'Belarus':
      return {
        required: 'Postal code is required',
        pattern: {
          value: /^[0-9]{6}$/, // Example pattern for Belarus postal code
          message: 'Postal code format for Belarus - 6 digits',
        },
      };
    case 'Poland':
      return {
        required: 'Postal code is required',
        pattern: {
          value: /^[0-9]{2}-[0-9]{3}$/, // Example pattern for Poland postal code
          message: 'Postal code format for Poland - 2 digits, dash, 3 digits',
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
  const { register, errors, index, trigger } = props;
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    if (selectedCountry) {
      trigger(`addresses.${index}.postalCode`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

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
          autoComplete="off"
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
