import { FC } from 'react';
import { Link } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import { Routes } from '../../router/routes';
import './_UserServices.scss';

interface UserServicesProps {
  className?: string;
  id?: string;
  width?: string;
  height?: string;
}

export const UserServices: FC<UserServicesProps> = ({ className, id, width, height, ...props }) => {
  return (
    <div className="userservices" {...props}>
      <Link to={Routes.LOGIN_ROUTE} className="userservices__login">
        <div className="userservices__icon">
          <svg width={width} height={height}>
            <use xlinkHref={`${sprite}#login`} />
          </svg>
        </div>
        <span className="userservices__text">Log In</span>
      </Link>
      <div className="userservices__promo">
        <svg width={width} height={height}>
          <use xlinkHref={`${sprite}#present`} />
        </svg>
      </div>
      <div className="userservices__cart">
        <svg width={width} height={height}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
      </div>
    </div>
  );
};
