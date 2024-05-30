/* eslint-disable max-lines-per-function */
import { Customer } from '@commercetools/platform-sdk';
import { findAddresses } from '@utils/utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './ProfileAddresses.module.scss';

interface AddressesProps {
  customerData: Customer;
}

export const ProfileAddresses = ({ customerData }: AddressesProps) => {
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   formState: { errors, isValid },
  // } = useForm<CustomerDraft>({ mode: 'all' });
  const shippingAddresses = findAddresses(customerData.addresses, customerData.shippingAddressIds);
  const billingAddresses = findAddresses(customerData.addresses, customerData.billingAddressIds);

  console.log(shippingAddresses);
  console.log(billingAddresses);
  const [isEditing, setIsEditing] = useState(false);
  const [dataEdited, setDataEdited] = useState(false);

  // const setInputs = () => {
  //   setValue('email', customerData.email);
  //   setValue('firstName', customerData.firstName);
  //   setValue('lastName', customerData.lastName);
  //   setValue('dateOfBirth', customerData.dateOfBirth);
  // };

  const resetChanges = () => {
    // setInputs();
    setDataEdited(false);
    setIsEditing(!isEditing);
  };

  // const onSubmitInfo = () => {};

  useEffect(() => {
    // setInputs();
    setDataEdited(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  return (
    <div className={styles.addresses}>
      <h2 className={styles.accountHeading}>Billing addresses</h2>
      <div className={styles.billings}>
        {billingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            {/* <AddressForm
              register={register}
              index={0}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
              unregister={unregister}
              billingAddressIsSameAsShipping={billingAddressIsSameAsShipping}
              setBillingAddressIsSameAsShipping={setBillingAddressIsSameAsShipping}
            /> */}
            <div className={styles.buttons}>
              <button type="button" className={styles.deleteButton} aria-label="delete address">
                <span className={styles.buttonDeleteImg} />
              </button>
              <button type="button" className={styles.submitButton} onClick={resetChanges}>
                {isEditing ? 'Reset' : 'Edit'}
              </button>
              <button
                className={classnames(styles.submitButton, { [styles.hidden]: !isEditing })}
                type="submit"
                disabled={!dataEdited}
                // disabled={!isValid || !dataEdited}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
        {/* надо в форму поместить галку что это дефолтный если с customerData.defaultBillingAddressId === addr.id  */}
      </div>
      <h2 className={styles.accountHeading}>Shipping addresses</h2>
      <div className={styles.billings}>
        {billingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            {/* <AddressForm
              register={register}
              index={0}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
              unregister={unregister}
              billingAddressIsSameAsShipping={billingAddressIsSameAsShipping}
              setBillingAddressIsSameAsShipping={setBillingAddressIsSameAsShipping}
            /> */}
            <div className={styles.buttons}>
              <button type="button" className={styles.deleteButton} aria-label="delete address">
                <span className={styles.buttonDeleteImg} />
              </button>
              <button type="button" className={styles.submitButton} onClick={resetChanges}>
                {isEditing ? 'Reset' : 'Edit'}
              </button>
              <button
                className={classnames(styles.submitButton, { [styles.hidden]: !isEditing })}
                type="submit"
                disabled={!dataEdited}
                // disabled={!isValid || !dataEdited}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
        {/* надо в форму поместить галку что это дефолтный если с customerData.defaultBillingAddressId === addr.id  */}
      </div>
    </div>
  );
};
