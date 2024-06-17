import { AppRoutes } from '@router/routes';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LinkButton.module.scss';

interface ILinkButtonProps {
  to: string;
}

export const LinkButton: FC<React.PropsWithChildren & ILinkButtonProps> = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  const gotoAboutButtonHandler = useCallback(() => {
    navigate(AppRoutes.ABOUT_ROUTE);
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button type="button" className={styles.linkButton} onClick={gotoAboutButtonHandler} {...props}>
      About
    </button>
  );
};
