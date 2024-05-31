/* eslint-disable max-lines-per-function */
import { sdkService } from '@commercetool/sdk.service';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { AddressView } from '@components/AddressView/AddressView';
import { addAddressActions, AddressesTypes, defaultAddress } from '@utils/constants';
import { findAddresses, findNewAddresses, isNotNullable } from '@utils/utils';
import { useState } from 'react';
import styles from './ProfileAddresses.module.scss';

interface AddressesProps {
  customerData: Customer;
  setCustomerData: (data: Customer) => void;
}

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
  const addAddress = async (newAddress: BaseAddress, type: AddressesTypes) => {
    let result = await sdkService.addAddress({
      version: customerData.version,
      actions: [
        {
          action: 'addAddress',
          address: newAddress,
        },
      ],
    });
    const setAddress = findNewAddresses(result.addresses, result.billingAddressIds, result.shippingAddressIds);
    result = await sdkService.setAddressBillingOrShipping(result.version, [
      {
        action: addAddressActions[type],
        addressId: setAddress.id,
      },
    ]);

    // if (isDeafult) {
    //   result = sdkService. здесь будет запрос сделать дефолтным
    // }

    setCustomerData(result);
  };

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
        <h2 className={styles.accountHeading}>Shipping addresses</h2>
      </div>
      <div className={styles.addressesWrapper}>
        {shippingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView
              address={addr}
              defaultAddressId={customerData.defaultShippingAddressId}
              removeAddress={removeAddress}
              type={AddressesTypes.isShipping}
            />
          </div>
        ))}
        {isNewShipping && (
          <AddressView
            address={defaultAddress}
            defaultAddressId={customerData.defaultShippingAddressId}
            removeAddress={removeAddress}
            setIsNewAddress={setIsNewShipping}
            addAddress={addAddress}
            type={AddressesTypes.isShipping}
          />
        )}
        <button type="button" className={styles.addNewAddressBtn} onClick={() => setIsNewShipping(true)}>
          +
        </button>
      </div>
      <h2 className={styles.accountHeading}>Billing addresses</h2>
      <div className={styles.addressesWrapper}>
        {billingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView
              address={addr}
              defaultAddressId={customerData.defaultBillingAddressId}
              removeAddress={removeAddress}
              type={AddressesTypes.isBilling}
            />
          </div>
        ))}
        {isNewBilling && (
          <AddressView
            address={defaultAddress}
            defaultAddressId={customerData.defaultBillingAddressId}
            removeAddress={removeAddress}
            setIsNewAddress={setIsNewBilling}
            addAddress={addAddress}
            type={AddressesTypes.isBilling}
          />
        )}
        <button type="button" className={styles.addNewAddressBtn} onClick={() => setIsNewBilling(true)}>
          +
        </button>
      </div>
    </div>
  );
};
