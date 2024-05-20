import { sdkService } from '@commercetool/sdk.service';
import { Product } from '@commercetools/platform-sdk';
import { Banner, Footer, Header } from '@components/index';
import { useAuth } from '@contexts//authProvider';
import { useToast } from '@contexts/toastProvider';
import { useEffect, useState } from 'react';
import styles from './home.module.scss';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { customToast, successNotify } = useToast();

  const getProds = async () => {
    const data = await sdkService.getProducts();
    setProducts(data);
    console.log(products);
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
      </div>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </>
  );
}
