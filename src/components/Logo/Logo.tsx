import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

interface LogoProps {
  spritePaths: string;
  title?: string;
  width?: string;
  height?: string;
}

export const Logo: FC<LogoProps> = ({ spritePaths, title, width, height, ...props }) => {
  return (
    <Link className={styles.link} to={AppRoutes.HOME_ROUTE}>
      <div className={styles.logo} {...props}>
        <div className={styles.logoImage}>
          <svg width={width} height={height}>
            <use xlinkHref={`${spritePaths}#logo`} />
          </svg>
        </div>
        {title && <p className={styles.logoText}>{title}</p>}
      </div>
    </Link>
  );
};
