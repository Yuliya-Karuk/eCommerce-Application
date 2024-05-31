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
  // register: UseFormRegister<CustomerDraft>;
  // errors: FieldErrors<CustomerDraft>;
  // index: 0 | 1;
  // trigger: UseFormTrigger<CustomerDraft>;
  // setValue: UseFormSetValue<CustomerDraft>;
  // unregister: UseFormUnregister<CustomerDraft>;
  // billingAddressIsSameAsShipping: boolean;
  // setBillingAddressIsSameAsShipping: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line max-lines-per-function
export function AddressView(props: AddressViewProps) {
  const {
    address,
    //   register,
    //   unregister,
    //   errors,
    //   index,
    //   trigger,
    //   setValue,
    //   billingAddressIsSameAsShipping,
    //   setBillingAddressIsSameAsShipping,
  } = props;
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    // watch,
    formState: { errors, isValid },
  } = useForm<MyCustomerChangeAddressAction>({ mode: 'all' });

  let id: string;

  if (address) {
    setValue('address.country', address.country);
    setValue('address.postalCode', address.postalCode);
    setValue('address.city', address.city);
    setValue('address.streetName', address.streetName);
    id = address.id || 'no_id';
  } else {
    id = 'new_address';
  }

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
          Country:<span className={styles.orange}>*</span>
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
        <p className={styles.countryError}>{errors?.address?.country?.message}</p>

        <Input
          name="address.city"
          label="City:"
          register={register}
          validationSchema={cityValidationRules}
          isInvalid={!!errors.address?.city}
          required
        />
        <p className={styles.addressError}>{errors?.address?.city?.message}</p>

        <Input
          name="address.postalCode"
          label="Postal code:"
          register={register}
          validationSchema={getPostalCodeValidationRules(selectedCountry)}
          isInvalid={!!errors.address?.postalCode}
          required
        />
        <p className={styles.addressError}>{errors?.address?.postalCode?.message}</p>

        <Input
          name="address.streetName"
          label="Street name:"
          register={register}
          validationSchema={{ required: 'This field is required' }}
          isInvalid={!!errors.address?.streetName}
          required
        />
        <p className={styles.addressError}>{errors?.address?.streetName?.message}</p>
        <label className={styles.checkboxLabel} htmlFor={`default-address-${id}`}>
          <input
            className={styles.checkbox}
            id={`default-address-${id}`}
            type="checkbox"
            onChange={handleDefaultAddressCheckbox}
          />
          Make address as default
        </label>

        <button className={styles.submitButton} type="submit" disabled={!isValid}>
          Submit
        </button>
      </fieldset>
    </form>
  );
}
