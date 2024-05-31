/* eslint-disable max-lines-per-function */
import { Customer } from '@commercetools/platform-sdk';
import { AddressView } from '@components/AddressView/AddressView';
import { findAddresses } from '@utils/utils';
import styles from './ProfileAddresses.module.scss';

interface AddressesProps {
  customerData: Customer;
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

export const ProfileAddresses = ({ customerData }: AddressesProps) => {
  const shippingAddresses = findAddresses(customerData.addresses, customerData.shippingAddressIds);
  const billingAddresses = findAddresses(customerData.addresses, customerData.billingAddressIds);
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

  // НУЖНОЕ !!!!!
  // const removeAddress = async (address: BaseAddress) => {
  //   await sdkService.addAddress({
  //     version: customerData.version,
  //     actions: [
  //       {
  //         action: 'removeAddress',
  //         addressId: address.id,
  //       },
  //     ],
  //   });
  // };

  return (
    <div className={styles.addresses}>
      <h2 className={styles.accountHeading}>Billing addresses</h2>
      <div className={styles.billings}>
        {shippingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView address={addr} defaultAddressId={customerData.defaultShippingAddressId} />
          </div>
        ))}
      </div>
      <h2 className={styles.accountHeading}>Shipping addresses</h2>
      <div className={styles.billings}>
        {billingAddresses.map(addr => (
          <div key={addr.id} className={styles.addressContainer}>
            <AddressView address={addr} defaultAddressId={customerData.defaultBillingAddressId} />
          </div>
        ))}
      </div>
    </div>
  );
};
