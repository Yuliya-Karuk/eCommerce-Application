import { createContext, ReactNode, useContext, useState } from 'react';
import { tokenController } from '../commercetool/token.service';
import { storage } from '../utils/storage';

interface IContext {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<IContext>({} as IContext);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const initialState = Boolean(storage.getTokenStore());
  const [isLogin, setIsLogin] = useState(initialState);

  const login = () => {
    storage.setTokenStore(tokenController.get());
    setIsLogin(true);
  };

  const logout = () => {
    storage.removeTokenStore();
    setIsLogin(false);
  };

  return <AuthContext.Provider value={{ isLogin, login, logout }}>{children}</AuthContext.Provider>;
}
