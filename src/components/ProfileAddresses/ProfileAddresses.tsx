/* eslint-disable max-lines-per-function */
import { sdkService } from '@commercetool/sdk.service';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { AddressView } from '@components/AddressView/AddressView';
import { defaultAddress } from '@utils/constants';
import { findAddresses, isNotNullable } from '@utils/utils';
import { useState } from 'react';
import styles from './ProfileAddresses.module.scss';

interface AddressesProps {
  customerData: Customer;
  setCustomerData: (data: Customer) => void;
}

// НУЖНОЕ !!!!!!
// const typesAddresses: { [key: string]: string } = {
//   shipping: 'addShippingAddressId',
//   billing: 'addBillingAddressId',
// };
// enum Types {
//   addShippingAddressId = 'addShippingAddressId',
//   addBillingAddressId = 'addBillingAddressId',
// }

export const ProfileAddresses = ({ customerData, setCustomerData }: AddressesProps) => {
  const shippingAddresses = findAddresses(customerData.addresses, customerData.shippingAddressIds);
  const billingAddresses = findAddresses(customerData.addresses, customerData.billingAddressIds);
  const [isNewShipping, setIsNewShipping] = useState(false);
  const [isNewBilling, setIsNewBilling] = useState(false);
  const { defaultBillingAddressId } = customerData;
  const { defaultShippingAddressId } = customerData;
  console.log(customerData);
  console.log(defaultBillingAddressId);
  console.log(defaultShippingAddressId);

  // НУЖНОЕ !!!!!!
  // const addAddress = async (newAddress: BaseAddress, type: Types) => {
  //   const result = await sdkService.addAddress({
  //     version: customerData.version,
  //     actions: [
  //       {
  //         action: 'addAddress',
  //         address: newAddress,
  //       },
  //     ],
  //   });
  //   const setAddress = findNewAddresses(result.addresses, result.billingAddressIds, result.shippingAddressIds);
  //   sdkService.setAddressBillingOrShipping({
  //     version: customerData.version,
  //     actions: [
  //       {
  //         action: Types[type],
  //         addressId: setAddress.id,
  //       },
  //     ],
  //   });
  // };

  const removeAddress = async (address: BaseAddress) => {
    const newCustomer = await sdkService.addAddress({
      version: customerData.version,
      actions: [
        {
          action: 'removeAddress',
          addressId: isNotNullable(address.id),
        },
      ],
    });
    setCustomerData(newCustomer);
  };

  return (
    <div className={styles.addresses}>
      <div className={styles.addressesHeaderWrapper}>
        <h2 className={styles.accountHeading}>Billing addresses</h2>
      </div>
      <div className={styles.addressesWrapper}>
        {shippingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView
              address={addr}
              defaultAddressId={customerData.defaultShippingAddressId}
              removeAddress={removeAddress}
            />
          </div>
        ))}
        {isNewBilling && (
          <AddressView
            address={defaultAddress}
            defaultAddressId={customerData.defaultShippingAddressId}
            removeAddress={removeAddress}
            setIsNewAddress={setIsNewBilling}
          />
        )}
        <button type="button" className={styles.addNewAddressBtn} onClick={() => setIsNewBilling(true)}>
          +
        </button>
      </div>
      <h2 className={styles.accountHeading}>Shipping addresses</h2>
      <div className={styles.addressesWrapper}>
        {billingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView
              address={addr}
              defaultAddressId={customerData.defaultBillingAddressId}
              removeAddress={removeAddress}
            />
          </div>
        ))}
        {isNewShipping && (
          <AddressView
            address={defaultAddress}
            defaultAddressId={customerData.defaultShippingAddressId}
            removeAddress={removeAddress}
            setIsNewAddress={setIsNewShipping}
          />
        )}
        <button type="button" className={styles.addNewAddressBtn} onClick={() => setIsNewShipping(true)}>
          +
        </button>
      </div>
    </div>
  );
};
