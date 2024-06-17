import { RotatingLines } from 'react-loader-spinner';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <RotatingLines
        visible
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        strokeColor="#d9d4c9"
      />
    </div>
  );
};
