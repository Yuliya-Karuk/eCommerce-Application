import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../router/routes';
import './_Logo.scss';

interface LogoProps {
  spritePaths: string;
  spriteId: string;
  classPrefix?: string;
  title?: string;
  width?: string;
  height?: string;
}

export const Logo: FC<LogoProps> = ({ spritePaths, spriteId, classPrefix, title, width, height, ...props }) => {
  return (
    <Link to={Routes.HOME_ROUTE}>
      <div className={`${classPrefix}__${spriteId} ${spriteId}`} {...props}>
        <div className={`${spriteId}__image`}>
          <svg width={width} height={height}>
            <use xlinkHref={`${spritePaths}#${spriteId}`} />
          </svg>
        </div>
        {title && <p className={`${spriteId}__text`}>{title}</p>}
      </div>
    </Link>
  );
};
