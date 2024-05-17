import { FC } from 'react';
import styles from './_Hero.module.scss';

export const Hero: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.hero}>{children}</div>;
};
