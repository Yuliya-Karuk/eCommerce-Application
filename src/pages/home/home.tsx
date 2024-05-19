import { Banner, Footer, Header } from '../../components/index';
import styles from './_home.module.scss';

export function Home() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.hero}>
          <Header />
          <Banner />
        </div>
      </div>
      <Footer />
    </>
  );
}
