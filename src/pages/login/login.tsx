import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { sdkService } from '../../commercetool/sdk.service';
import { useAuth } from '../../providers/authProvider';
import { CustomErrors } from '../../types/enums';
import { testLoginUser } from '../../utils/constants';

export function Login() {
  const { isLogin, login } = useAuth();

  const [isLoginError, setIsLoginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleLogin = async () => {
    const emailRegistered = await sdkService.checkCustomerIsRegistered(testLoginUser.email);

    if (emailRegistered) {
      const loginResult = await sdkService.loginUser(testLoginUser.email, testLoginUser.password);
      setIsLoginError(false);
      if (loginResult) {
        login();
        setIsPasswordError(false);
      } else {
        setIsPasswordError(true);
      }
    } else {
      setIsLoginError(true);
    }
  };

  return (
    <div>
      {isLogin && <Navigate to="/" replace />}
      <h1>Login Page</h1>
      <Link to="/registration">Link to Registration Page </Link>
      {isLoginError && <p>{CustomErrors.LOGIN_ERROR}</p>}
      {isPasswordError && <p>{CustomErrors.PASSWORD_ERROR}</p>}
      <button style={{ padding: '10px 20px', border: '2px solid white' }} type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
