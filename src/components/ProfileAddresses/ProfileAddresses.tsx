/* eslint-disable max-lines-per-function */
import { sdkService } from '@commercetool/sdk.service';
import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import { AddressView } from '@components/AddressView/AddressView';
import { findAddresses, findNewAddresses } from '@utils/utils';
import styles from './ProfileAddresses.module.scss';

interface AddressesProps {
  customerData: Customer;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typesAddresses: { [key: string]: string } = {
  shipping: 'addShippingAddressId',
  billing: 'addBillingAddressId',
};

enum Types {
  addShippingAddressId = 'addShippingAddressId',
  addBillingAddressId = 'addBillingAddressId',
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
  const { defaultBillingAddressId } = customerData;
  const { defaultShippingAddressId } = customerData;
  console.log(customerData);
  console.log(defaultBillingAddressId);
  console.log(defaultShippingAddressId);

  // console.log(shippingAddresses);
  // console.log(billingAddresses);
  // const [isEditing, setIsEditing] = useState(false);
  // const [dataEdited, setDataEdited] = useState(false);

  // const setInputs = () => {
  //   setValue('email', customerData.email);
  //   setValue('firstName', customerData.firstName);
  //   setValue('lastName', customerData.lastName);
  //   setValue('dateOfBirth', customerData.dateOfBirth);
  // };

  // const resetChanges = () => {
  //   // setInputs();
  //   setDataEdited(false);
  //   setIsEditing(!isEditing);
  // };

  // const onSubmitInfo = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addAddress = async (newAddress: BaseAddress, type: Types) => {
    const result = await sdkService.addAddress({
      version: customerData.version,
      actions: [
        {
          action: 'addAddress',
          address: newAddress,
        },
      ],
    });
    const setAddress = findNewAddresses(result.addresses, result.billingAddressIds, result.shippingAddressIds);
    sdkService.setAddressBillingOrShipping({
      version: customerData.version,
      actions: [
        {
          action: Types[type],
          addressId: setAddress.id,
        },
      ],
    });
  };

  // useEffect(() => {
  //   // setInputs();
  //   setDataEdited(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [customerData]);

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
