import { sdkService } from '@commercetool/sdk.service';
import { Customer } from '@commercetools/platform-sdk';
import { Account } from '@components/Account/Account';
import { Container } from '@components/Container/Container';
import { Header } from '@components/Header/Header';
import { useEffect, useState } from 'react';
import styles from './profile.module.scss';

const tabs: { [key: string]: string } = {
  account: 'My Account',
  addresses: 'My Addresses',
};

export const Profile = () => {
  const [activeTab, setActiveTab] = useState(tabs.account);
  const [customerData, setCustomerData] = useState<Customer>({} as Customer);

  const getCustomerData = async () => {
    const customer = await sdkService.getCustomerData();
    console.log(customer);
    setCustomerData(customer);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className={styles.profile}>
      <Header />
      <Container classname={styles.profile}>
        <div className={styles.profileContainer}>
          <div className={styles.profileMenu}>
            {Object.entries(tabs).map(([key, value]) => (
              <button
                className={styles.profileMenuButton}
                key={key}
                type="button"
                onClick={() => setActiveTab(tabs[key])}
              >
                {value}
              </button>
            ))}
          </div>
          {activeTab === tabs.account && <Account customerData={customerData} />}
          {activeTab === tabs.addresses && <div>Second</div>}
        </div>
      </Container>
    </div>
  );
};
