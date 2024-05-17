import React, { FC } from 'react';

interface ListItemProps {
  className?: string;
}

export const ListItem: FC<React.PropsWithChildren & ListItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={`${className}__item`} {...props}>
      {children}
    </li>
  );
};
