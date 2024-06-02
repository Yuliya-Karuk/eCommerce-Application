/* eslint-disable max-lines-per-function */
import { sdkService } from '@commercetool/sdk.service';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { AddressView } from '@components/AddressView/AddressView';
import { useToast } from '@contexts/toastProvider';
import {
  addAddressActions,
  AddressesTypes,
  defaultAddress,
  setDefaultAddressActions,
  SuccessChangeAddressMessage,
  SuccessNewAddressMessage,
  SuccessRemoveAddressMessage,
} from '@utils/constants';
import { findAddresses, findNewAddresses, prepareAddressRequest } from '@utils/utils';
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
  const { successNotify, errorNotify } = useToast();

  const addAddress = async (newAddress: BaseAddress, type: AddressesTypes, isDefault: boolean) => {
    try {
      const addAddressRequest = prepareAddressRequest('addAddress', newAddress);
      let result = await sdkService.updateAddresses(customerData.version, addAddressRequest);

      const setAddress = findNewAddresses(result.addresses, result.billingAddressIds, result.shippingAddressIds);
      const makeBillingOrShippingRequest = prepareAddressRequest(addAddressActions[type], setAddress, setAddress.id);
      result = await sdkService.updateAddresses(result.version, makeBillingOrShippingRequest);

      if (isDefault) {
        const makeDefaultRequest = prepareAddressRequest(setDefaultAddressActions[type], setAddress, setAddress.id);
        result = await sdkService.updateAddresses(result.version, makeDefaultRequest);
      }
      setCustomerData(result);
      successNotify(SuccessNewAddressMessage);
    } catch (e) {
      errorNotify((e as Error).message);
    }
  };

  const changeAddress = async (changedAddress: BaseAddress, id: string, type: AddressesTypes, isDefault: boolean) => {
    try {
      const changeAddressRequest = prepareAddressRequest('changeAddress', changedAddress, id);
      let result = await sdkService.updateAddresses(customerData.version, changeAddressRequest);
      if (isDefault) {
        const makeDefaultRequest = prepareAddressRequest(setDefaultAddressActions[type], changedAddress, id);
        result = await sdkService.updateAddresses(result.version, makeDefaultRequest);
      } else if (
        (AddressesTypes.isBilling && id === defaultBillingAddressId) ||
        (AddressesTypes.isShipping && id === defaultShippingAddressId)
      ) {
        const makeNotDefaultRequest = prepareAddressRequest(setDefaultAddressActions[type], changedAddress);
        result = await sdkService.updateAddresses(result.version, makeNotDefaultRequest);
      }

      setCustomerData(result);
      successNotify(SuccessChangeAddressMessage);
    } catch (e) {
      errorNotify((e as Error).message);
    }
  };

  const removeAddress = async (address: BaseAddress) => {
    try {
      const removeAddressRequest = prepareAddressRequest('removeAddress', address, address.id);
      const result = await sdkService.updateAddresses(customerData.version, removeAddressRequest);

      setCustomerData(result);
      successNotify(SuccessRemoveAddressMessage);
    } catch (e) {
      errorNotify((e as Error).message);
    }
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
