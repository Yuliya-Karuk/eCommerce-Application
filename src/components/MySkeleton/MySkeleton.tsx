import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './MySkeleton.module.scss';

export const MySkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <Skeleton
        baseColor="#D9D2C6"
        highlightColor="#F0E9E0"
        count={1}
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
      />
    </div>
  );
};
