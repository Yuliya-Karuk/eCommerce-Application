import { Banner, Footer, Header } from '@components/index';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { useEffect } from 'react';
import styles from './home.module.scss';

export function Home() {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { customToast, successNotify } = useToast();

  const notify = () => {
    successNotify();
    setIsLoginSuccess(false);
  };

  useEffect(() => {
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
      </div>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </>
  );
}
