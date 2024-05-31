import { BaseAddress } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { AddressesTypes, countries } from '@utils/constants';
import { getPostalCodeValidationRules, isNotNullable } from '@utils/utils';
import { cityValidationRules } from '@utils/validationConst';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddressView.module.scss';

interface AddressViewProps {
  address: BaseAddress;
  defaultAddressId?: string;
  removeAddress: (data: BaseAddress) => void;
  setIsNewAddress?: (data: boolean) => void;
  addAddress?: (newAddress: BaseAddress, type: AddressesTypes, isDefault: boolean) => void;
  type: AddressesTypes;
}

// eslint-disable-next-line max-lines-per-function
export function AddressView(props: AddressViewProps) {
  const { address, defaultAddressId, removeAddress, setIsNewAddress, addAddress, type } = props;
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<BaseAddress>({ mode: 'all' });

  const { id } = address;

  function setInputs() {
    if (address) {
      setValue('country', address.country);
      setValue('postalCode', address.postalCode);
      setValue('city', address.city);
      setValue('streetName', address.streetName);
    }
  }

  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(id === 'no_id');
  const [dataEdited, setDataEdited] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const watchedFields = watch(['country', 'postalCode', 'city', 'streetName']);

  useEffect(() => {
    setInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsDefaultAddress(false);
    if (defaultAddressId === address.id) {
      setIsDefaultAddress(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultAddressId]);

  useEffect(() => {
    if (
      watchedFields[0] !== address?.country ||
      watchedFields[1] !== address.postalCode ||
      watchedFields[2] !== address.city ||
      watchedFields[3] !== address.streetName
    ) {
      setDataEdited(true);
    } else {
      setDataEdited(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedFields]);

  const resetChanges = () => {
    setInputs();
    setDataEdited(false);
    setIsEditing(!isEditing);
    if (id === 'no_id' && setIsNewAddress) {
      setIsNewAddress(false);
    }
  };

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    if (selectedCountry) {
      trigger(`postalCode`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const onSubmit = (data: BaseAddress) => {
    if (addAddress && setIsNewAddress) {
      addAddress(data, type, isDefaultAddress);
      setIsNewAddress(false);
    }
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend>{`Address ${id}`}</legend>
        <label htmlFor={`country-${id}`} className={styles.label}>
          Country:{!address ? <span className={styles.orange}>*</span> : ''}
          <select
            required
            id={`country-${id}`}
            className={styles.select}
            {...register(`country`, { required: true })}
            defaultValue=""
            onChange={handleCountryChange}
            autoComplete="off"
            disabled={!isEditing}
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
        <p className={styles.error}>{errors?.country?.message}</p>

        <Input
          name="city"
          label="City:"
          register={register}
          validationSchema={cityValidationRules}
          isInvalid={!!errors.city}
          required={!address}
          disabled={!isEditing}
        />
        <p className={styles.error}>{errors?.city?.message}</p>

        <Input
          name="postalCode"
          label="Postal code:"
          register={register}
          validationSchema={getPostalCodeValidationRules(selectedCountry)}
          isInvalid={!!errors.postalCode}
          required={!address}
          disabled={!isEditing}
        />
        <p className={styles.error}>{errors?.postalCode?.message}</p>

        <Input
          name="streetName"
          label="Street name:"
          register={register}
          validationSchema={{ required: 'This field is required' }}
          isInvalid={!!errors.streetName}
          required={!address}
          disabled={!isEditing}
        />
        <p className={styles.error}>{errors?.streetName?.message}</p>
        <label className={styles.checkboxLabel} htmlFor={`default-address-${id}`}>
          <input
            className={styles.checkbox}
            id={`default-address-${id}`}
            type="checkbox"
            checked={isDefaultAddress}
            onChange={() => setIsDefaultAddress(!isDefaultAddress)}
          />
          Make address as default
        </label>
        <div className={styles.buttons}>
          <button className={styles.editButton} type="button" onClick={resetChanges}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            className={classNames(styles.submitButton, { [styles.hidden]: !isEditing })}
            type="submit"
            disabled={!(isValid && dataEdited)}
          >
            Submit
          </button>
          {id !== 'no-id' && (
            <button
              className={classNames(styles.submitButton, { [styles.hidden]: isEditing })}
              type="button"
              onClick={() => removeAddress(isNotNullable(address))}
            >
              Delete
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
}
