import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkButton.module.scss';

interface ILinkButtonProps {
  to: string;
}

export const LinkButton: FC<React.PropsWithChildren & ILinkButtonProps> = ({ to, children, ...props }) => {
  return (
    <Link to={to} className={styles.linkButton} {...props}>
      {children}
    </Link>
  );
};
