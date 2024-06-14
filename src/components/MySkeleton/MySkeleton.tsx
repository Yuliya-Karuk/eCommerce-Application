import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const MySkeleton = () => {
  return <Skeleton baseColor="red" highlightColor="#eee" count={5} />;
};
