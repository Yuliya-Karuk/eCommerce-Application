import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/404.svg';
import styles from './notFound.module.scss';
import { Routes } from '../../router/routes';

function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <img className={styles.notFoundImage} src={notFoundImage} alt="Icon Not Found" />
      <p className={styles.notFoundText}>Looks like there`s nothing here.</p>
      <p className={styles.notFoundText}>Feel free to continue browsing the site.</p>
      <Link className={styles.notFoundLink} to={Routes.HOME_ROUTE}>
        Back to Home page
      </Link>
    </div>
  );
}

export default NotFoundPage;
