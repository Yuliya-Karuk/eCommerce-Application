import { AboutBanner } from '@components/AboutBanner/AboutBanner';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { SuccessLoginMessage } from '@utils/constants';
import { useEffect } from 'react';
import styles from './about.module.scss';

export function About() {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { customToast, successNotify } = useToast();

  const notify = () => {
    successNotify(SuccessLoginMessage);
    setIsLoginSuccess(false);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={styles.main}>
        <div className={styles.hero}>
          <Header />
          <AboutBanner />
        </div>
      </div>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </>
  );
}
