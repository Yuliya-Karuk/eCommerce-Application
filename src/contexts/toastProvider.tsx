/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from 'react';
import { toast, ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextValue {
  customToast: ({ position, autoClose }: ToastContainerProps) => JSX.Element;
  promiseNotify: <T>(userData: T, action: string, callback: (userData: T) => Promise<unknown>) => void;
  successNotify: (message: string) => void;
  errorNotify: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({} as ToastContextValue);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const customToast = function CustomToast({ position, autoClose }: ToastContainerProps) {
    return <ToastContainer position={position} autoClose={autoClose} />;
  };

  const promiseNotify = <T,>(userData: T, action: string, callback: (userData: T) => Promise<unknown>) => {
    toast.promise(() => callback(userData), {
      pending: `${action} in progress, wait, please`,
      error: {
        render({ data }) {
          return `${(data as Error).message}`;
        },
      },
    });
  };

  const successNotify = (message: string) => toast.success(message);
  const errorNotify = (message: string) => toast.error(message);

  return (
    <ToastContext.Provider value={{ customToast, promiseNotify, successNotify, errorNotify }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast hook must be used within a ToastProvider');
  }

  return context;
};
