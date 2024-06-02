/* eslint-disable max-lines-per-function */
import { sdkService } from '@commercetool/sdk.service';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { AddressView } from '@components/AddressView/AddressView';
import { addAddressActions, AddressesTypes, defaultAddress, setDefaultAddressActions } from '@utils/constants';
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
  const [isNewShippingOpen, setIsNewShippingOpen] = useState(false);
  const [isNewBillingOpen, setIsNewBillingOpen] = useState(false);

  const { defaultShippingAddressId } = customerData;
  const { defaultBillingAddressId } = customerData;
  console.log(customerData);

  const addAddress = async (newAddress: BaseAddress, type: AddressesTypes, isDefault: boolean) => {
    let result = await sdkService.addAddress(customerData.version, [
      {
        action: 'addAddress',
        address: newAddress,
      },
    ]);

    const setAddress = findNewAddresses(result.addresses, result.billingAddressIds, result.shippingAddressIds);
    result = await sdkService.setAddressBillingOrShipping(result.version, [
      {
        action: addAddressActions[type],
        addressId: setAddress.id,
      },
    ]);

    if (isDefault) {
      result = await sdkService.setDefaultBillingOrShippingAddress(result.version, [
        {
          action: setDefaultAddressActions[type],
          addressId: setAddress.id,
        },
      ]);
    }
    setCustomerData(result);
  };

  const changeAddress = async (changedAddress: BaseAddress, id: string, type: AddressesTypes, isDefault: boolean) => {
    let result = await sdkService.addAddress(customerData.version, [
      {
        action: 'changeAddress',
        addressId: id,
        address: changedAddress,
      },
    ]);
    if (isDefault) {
      result = await sdkService.setDefaultBillingOrShippingAddress(result.version, [
        {
          action: setDefaultAddressActions[type],
          addressId: id,
        },
      ]);
    } else if (
      (AddressesTypes.isBilling && id === defaultBillingAddressId) ||
      (AddressesTypes.isShipping && id === defaultShippingAddressId)
    ) {
      result = await sdkService.setDefaultBillingOrShippingAddress(result.version, [
        {
          action: setDefaultAddressActions[type],
        },
      ]);
    }
    setCustomerData(result);
  };

  const removeAddress = async (address: BaseAddress) => {
    const newCustomer = await sdkService.addAddress(customerData.version, [
      {
        action: 'removeAddress',
        addressId: isNotNullable(address.id),
      },
    ]);
    setCustomerData(newCustomer);
  };

  return (
    <div className={styles.addresses}>
      <div className={styles.addressesHeaderWrapper}>
        <h2 className={styles.heading}>Shipping addresses</h2>
      </div>
      <div className={styles.addressesWrapper}>
        {shippingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView
              address={addr}
              defaultAddressId={defaultShippingAddressId}
              removeAddress={removeAddress}
              type={AddressesTypes.isShipping}
              changeAddress={changeAddress}
            />
          </div>
        ))}
        {isNewShippingOpen && (
          <div className={styles.addressContainer}>
            <AddressView
              address={defaultAddress}
              defaultAddressId={defaultShippingAddressId}
              removeAddress={removeAddress}
              setIsNewAddress={setIsNewShippingOpen}
              addAddress={addAddress}
              type={AddressesTypes.isShipping}
            />
          </div>
        )}
        <button type="button" className={styles.addNewAddressBtn} onClick={() => setIsNewShippingOpen(true)}>
          +
        </button>
      </div>
      <h2 className={styles.heading}>Billing addresses</h2>
      <div className={styles.addressesWrapper}>
        {billingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView
              address={addr}
              defaultAddressId={defaultBillingAddressId}
              removeAddress={removeAddress}
              type={AddressesTypes.isBilling}
              changeAddress={changeAddress}
            />
          </div>
        ))}
        {isNewBillingOpen && (
          <div className={styles.addressContainer}>
            <AddressView
              address={defaultAddress}
              defaultAddressId={defaultBillingAddressId}
              removeAddress={removeAddress}
              setIsNewAddress={setIsNewBillingOpen}
              addAddress={addAddress}
              type={AddressesTypes.isBilling}
            />
          </div>
        )}
        <button type="button" className={styles.addNewAddressBtn} onClick={() => setIsNewBillingOpen(true)}>
          +
        </button>
      </div>
    </div>
  );
};
