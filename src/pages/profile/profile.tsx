import avatar from '@assets/avatar.svg';
import { sdkService } from '@commercetool/sdk.service';
import { Customer } from '@commercetools/platform-sdk';
import { Account } from '@components/Account/Account';
import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
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
          <div className={styles.profileTitle}>
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={avatar} alt="avatar icon" />
            </div>
            <h2 className={styles.profileHeading}>Profile</h2>
          </div>
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
          <div className={styles.profileContent}>
            {activeTab === tabs.account && <Account customerData={customerData} />}
            {activeTab === tabs.addresses && <div>Second</div>}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
