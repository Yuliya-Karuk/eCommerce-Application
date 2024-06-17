import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const route = useLocation();

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  }, [route]);
  return null;
};
