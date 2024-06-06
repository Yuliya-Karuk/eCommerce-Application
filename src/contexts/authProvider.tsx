/* eslint-disable react-refresh/only-export-components */
import { tokenController } from '@commercetool/token.service';
import { storage } from '@utils/storage';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextValue {
  isLoggedIn: boolean;
  isLoginSuccess: boolean;
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const initialState = Boolean(storage.getTokenStore());
  const [isLoggedIn, setIsLoggedIn] = useState(initialState);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const login = () => {
    storage.setTokenStore(tokenController.get());
    storage.removeCartStore();
    setIsLoggedIn(true);
    setIsLoginSuccess(true);
  };

  const logout = () => {
    storage.removeTokenStore();
    storage.removeCartStore();
    setIsLoggedIn(false);
    setIsLoginSuccess(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoginSuccess, setIsLoginSuccess, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};
