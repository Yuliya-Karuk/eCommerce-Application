import { CustomerDraft } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import {
  FieldErrors,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormUnregister,
} from 'react-hook-form';
import { Input } from '../Input/Input';
import styles from './AddressForm.module.scss';

interface AddressFormProps {
  register: UseFormRegister<CustomerDraft>;
  errors: FieldErrors<CustomerDraft>;
  index: 0 | 1;
  trigger: UseFormTrigger<CustomerDraft>;
  setValue: UseFormSetValue<CustomerDraft>;
  getValues: UseFormGetValues<CustomerDraft>;
  unregister: UseFormUnregister<CustomerDraft>;
}

const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

const cityValidationRules: RegisterOptions = {
  required: 'This field is required',
  pattern: {
    value: onlyLatinLettersRegExp,
    message: 'City must contain latin letter and no special characters or numbers',
  },
};

interface Country {
  name: string;
  code: string;
  postalCodePattern: RegExp;
  validationMessage: string;
}

const countries: Country[] = [
  {
    name: 'Germany',
    code: 'DE',
    postalCodePattern: /^[0-9]{5}$/,
    validationMessage: 'Postal code format for Germany - 5 digits',
  },
  {
    name: 'Belarus',
    code: 'BY',
    postalCodePattern: /^[0-9]{6}$/,
    validationMessage: 'Postal code format for Belarus - 6 digits',
  },
  {
    name: 'Poland',
    code: 'PL',
    postalCodePattern: /^[0-9]{2}-[0-9]{3}$/,
    validationMessage: 'Postal code format for Poland - 2 digits, dash, 3 digits',
  },
];

const getPostalCodeValidationRules = (selectedCountry: string): RegisterOptions => {
  const currentCountry = countries.find(country => country.code === selectedCountry);
  if (currentCountry) {
    return {
      required: 'Postal code is required',
      pattern: {
        value: currentCountry.postalCodePattern,
        message: currentCountry.validationMessage,
      },
    };
  }
  return {
    required: 'Postal code is required',
  };
};

// eslint-disable-next-line max-lines-per-function
export function AddressForm(props: AddressFormProps) {
  const { register, unregister, errors, index, trigger, setValue, getValues } = props;
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const defaultAddressName = index === 0 ? 'defaultShippingAddress' : 'defaultBillingAddress';

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue(defaultAddressName, index);
    } else {
      unregister(defaultAddressName);
    }
  };

  const handleCopyAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const values = getValues(`addresses.0`);
      setValue(`addresses.1.country`, values.country);
      setSelectedCountry(values.country);
      setValue(`addresses.1.city`, values.city);
      setValue(`addresses.1.postalCode`, values.postalCode);
      setValue(`addresses.1.streetName`, values.streetName);
    } else {
      setValue(`addresses.1.country`, '');
      setValue(`addresses.1.city`, '');
      setValue(`addresses.1.postalCode`, '');
      setValue(`addresses.1.streetName`, '');
    }
    trigger(`addresses.1.country`);
    trigger(`addresses.1.city`);
    trigger(`addresses.1.postalCode`);
    trigger(`addresses.1.streetName`);
  };

  useEffect(() => {
    if (selectedCountry) {
      trigger(`addresses.${index}.postalCode`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  return (
    <>
      {index === 1 && (
        <label className={styles.checkboxLabel} htmlFor="copy-address">
          <input className={styles.checkbox} id="copy-address" type="checkbox" onChange={handleCopyAddress} />
          Copy from shipping address
        </label>
      )}
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
            <option key={country.code} value={country.code}>
              {country.name}
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
      <label className={styles.checkboxLabel} htmlFor={`default-address-${index}`}>
        <input
          className={styles.checkbox}
          id={`default-address-${index}`}
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        Make as default {index === 0 ? 'Shipping' : 'Billing'} Address
      </label>
    </>
  );
}
