import { useMemo } from 'react';

export const useGetScrollWidth = () => {
  const scrollWidth = useMemo(() => {
    return (
      window.innerWidth -
      Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth
      )
    );
  }, []);

  return scrollWidth;
};
