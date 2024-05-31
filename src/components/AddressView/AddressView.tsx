import { BaseAddress, MyCustomerChangeAddressAction } from '@commercetools/platform-sdk';
import { Input } from '@components/Input/Input';
import { countries } from '@utils/constants';
import { getPostalCodeValidationRules } from '@utils/utils';
import { cityValidationRules } from '@utils/validationConst';
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
    // watch,
    formState: { errors, isValid },
  } = useForm<MyCustomerChangeAddressAction>({ mode: 'all' });

  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);

  let id: string = 'new_address';
  if (address) {
    id = address.id || 'no_id';
  }

  useEffect(() => {
    if (address) {
      setValue('address.country', address.country);
      setValue('address.postalCode', address.postalCode);
      setValue('address.city', address.city);
      setValue('address.streetName', address.streetName);
    }

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

  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  // const defaultAddressName = index === 0 ? 'defaultShippingAddress' : 'defaultBillingAddress';

  const handleDefaultAddressCheckbox = () => {
    // const handleDefaultAddressCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.checked) {
    //   setValue(defaultAddressName, index);
    //   if (billingAddressIsSameAsShipping) {
    //     setValue('defaultBillingAddress', 0);
    //   }
    // } else {
    //   unregister(defaultAddressName);
    //   if (billingAddressIsSameAsShipping) {
    //     unregister('defaultBillingAddress');
    //   }
    // }
  };

  // const handleCheckboxUseAsBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.checked) {
  //     setBillingAddressIsSameAsShipping(true);
  //     unregister(`addresses.1`);
  //   } else {
  //     setBillingAddressIsSameAsShipping(false);
  //     setValue(`addresses.1.country`, '');
  //     setValue(`addresses.1.city`, '');
  //     setValue(`addresses.1.postalCode`, '');
  //     setValue(`addresses.1.streetName`, '');
  //     trigger(`addresses.1`);
  //   }
  // };

  useEffect(() => {
    if (selectedCountry) {
      trigger(`address.postalCode`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const onSubmit = () => {
    // try {
    //   sdkService.updatePassword({
    //     version: customerData.version,
    //     ...data,
    //   });
    //   successNotify(SuccessUpdatePasswordMessage);
    //   resetPasswordFields();
    // } catch (e) {
    //   errorNotify((e as Error).message);
    // }
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
        />
        <p className={styles.error}>{errors?.address?.city?.message}</p>

        <Input
          name="address.postalCode"
          label="Postal code:"
          register={register}
          validationSchema={getPostalCodeValidationRules(selectedCountry)}
          isInvalid={!!errors.address?.postalCode}
          required={!address}
        />
        <p className={styles.error}>{errors?.address?.postalCode?.message}</p>

        <Input
          name="address.streetName"
          label="Street name:"
          register={register}
          validationSchema={{ required: 'This field is required' }}
          isInvalid={!!errors.address?.streetName}
          required={!address}
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
          <button className={styles.editButton} type="button">
            Edit
          </button>
          <button className={styles.submitButton} type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}
