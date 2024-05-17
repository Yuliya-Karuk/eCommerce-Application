import { FC } from 'react';

interface ContainerProps {
  classname?: string;
}

export const Container: FC<React.PropsWithChildren & ContainerProps> = ({ children, classname }) => {
  return <div className={classname ? `${classname}__container` : 'container'}>{children}</div>;
};
