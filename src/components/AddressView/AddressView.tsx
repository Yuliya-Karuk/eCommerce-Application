import { BaseAddress, MyCustomerChangeAddressAction } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { countries } from '@utils/constants';
import { getPostalCodeValidationRules } from '@utils/utils';
import { cityValidationRules } from '@utils/validationConst';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddressView.module.scss';

interface AddressViewProps {
  address?: BaseAddress;
  defaultAddressId?: string;
}

// eslint-disable-next-line max-lines-per-function
export function AddressView(props: AddressViewProps) {
  const { address, defaultAddressId } = props;
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<MyCustomerChangeAddressAction>({ mode: 'all' });

  let id: string = 'new_address';
  if (address) {
    id = address.id || 'no_id';
  }
  function setInputs() {
    if (address) {
      setValue('address.country', address.country);
      setValue('address.postalCode', address.postalCode);
      setValue('address.city', address.city);
      setValue('address.streetName', address.streetName);
    }
  }

  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const watchedFields = watch(['address.country', 'address.postalCode', 'address.city', 'address.streetName']);

  useEffect(() => {
    setInputs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (defaultAddressId && address) {
      if (defaultAddressId === address.id) {
        setIsDefaultAddress(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  };

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  // const defaultAddressName = index === 0 ? 'defaultShippingAddress' : 'defaultBillingAddress';

  const handleDefaultAddressCheckbox = () => {};

  function handleDeleteButton() {}

  useEffect(() => {
    if (selectedCountry) {
      trigger(`address.postalCode`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const onSubmit = () => {
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
            {...register(`address.country`, { required: true })}
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
        <p className={styles.error}>{errors?.address?.country?.message}</p>

        <Input
          name="address.city"
          label="City:"
          register={register}
          validationSchema={cityValidationRules}
          isInvalid={!!errors.address?.city}
          required={!address}
          disabled={!isEditing}
        />
        <p className={styles.error}>{errors?.address?.city?.message}</p>

        <Input
          name="address.postalCode"
          label="Postal code:"
          register={register}
          validationSchema={getPostalCodeValidationRules(selectedCountry)}
          isInvalid={!!errors.address?.postalCode}
          required={!address}
          disabled={!isEditing}
        />
        <p className={styles.error}>{errors?.address?.postalCode?.message}</p>

        <Input
          name="address.streetName"
          label="Street name:"
          register={register}
          validationSchema={{ required: 'This field is required' }}
          isInvalid={!!errors.address?.streetName}
          required={!address}
          disabled={!isEditing}
        />
        <p className={styles.error}>{errors?.address?.streetName?.message}</p>
        <label className={styles.checkboxLabel} htmlFor={`default-address-${id}`}>
          <input
            className={styles.checkbox}
            id={`default-address-${id}`}
            type="checkbox"
            checked={isDefaultAddress}
            onChange={handleDefaultAddressCheckbox}
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
          <button
            className={classNames(styles.submitButton, { [styles.hidden]: isEditing })}
            type="button"
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        </div>
      </fieldset>
    </form>
  );
}
