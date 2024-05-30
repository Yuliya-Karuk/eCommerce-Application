/* eslint-disable react-hooks/exhaustive-deps */
import { sdkService } from '@commercetool/sdk.service';
import { Banner } from '@components/Banner/Banner';
import { Discover } from '@components/Discover/Discover';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { NewArrivals } from '@components/NewArrivals/NewArrivals';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useEffect } from 'react';
import styles from './home.module.scss';

export function Home() {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { customToast, successNotify } = useToast();

  const getProds = async () => {
    await sdkService.getProducts();
  };

  const notify = () => {
    successNotify();
    setIsLoginSuccess(false);
  };

  useEffect(() => {
    getProds();
    if (isLoginSuccess) {
      notify();
    }
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.hero}>
          <Header />
          <Banner />
        </div>
        <NewArrivals />
        <Discover />
      </div>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </>
  );
}
