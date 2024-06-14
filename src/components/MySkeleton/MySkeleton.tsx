import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const MySkeleton = () => {
  return (
    <Skeleton
      baseColor="#D9D2C6"
      highlightColor="#F0E9E0"
      count={1}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    />
  );
};
