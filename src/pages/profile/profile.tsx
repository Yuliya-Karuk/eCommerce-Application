import avatar from '@assets/avatar.svg';
import { sdkService } from '@commercetool/sdk.service';
import { Customer } from '@commercetools/platform-sdk';
import { Account } from '@components/Account/Account';
import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ProfileAddresses } from '@components/ProfileAddresses/ProfileAddresses';
import { ProfilePassword } from '@components/ProfilePassword/ProfilePassword';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './profile.module.scss';

const tabs: { [key: string]: string } = {
  account: 'My Account',
  addresses: 'My Addresses',
};

export const Profile = () => {
  const [activeTab, setActiveTab] = useState(tabs.account);
  const [customerData, setCustomerData] = useState<Customer>({} as Customer);
  const { isLoggedIn } = useAuth();
  const { customToast } = useToast();

  const getCustomerData = async () => {
    const customer = await sdkService.getCustomerData();
    setCustomerData(customer);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

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
                className={classnames(styles.profileMenuButton, { [styles.active]: value === activeTab })}
                key={key}
                type="button"
                onClick={() => setActiveTab(tabs[key])}
              >
                {value}
              </button>
            ))}
          </div>
          <div className={styles.profileContent}>
            {activeTab === tabs.account && (
              <div className={styles.userData}>
                <Account customerData={customerData} setCustomerData={setCustomerData} />
                <ProfilePassword customerData={customerData} setCustomerData={setCustomerData} />
              </div>
            )}
            {activeTab === tabs.addresses && (
              <ProfileAddresses customerData={customerData} setCustomerData={setCustomerData} />
            )}
          </div>
        </div>
      </Container>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
};
