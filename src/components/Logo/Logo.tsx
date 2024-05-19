import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../router/routes';
import styles from './_Logo.module.scss';

interface LogoProps {
  spritePaths: string;
  title?: string;
  width?: string;
  height?: string;
}

export const Logo: FC<LogoProps> = ({ spritePaths, title, width, height, ...props }) => {
  return (
    <Link to={Routes.HOME_ROUTE}>
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
