import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { sdkService } from '../../commercetool/sdk.service';
import { tokenController } from '../../commercetool/token.service';
import { testLoginUser } from '../../utils/constants';
import { storage } from '../../utils/storage';

export function Login() {
  const [isLogined, setIsLogines] = useState(false);

  const login = async () => {
    const loginResult = await sdkService.loginUser(testLoginUser.email, testLoginUser.password);
    storage.saveTokenStore(tokenController.get());
    setIsLogines(loginResult);
  };

  return (
    <div>
      {isLogined && <Navigate to="/" replace />}
      <h1>Login Page</h1>
      <Link to="/registration">Link to Registration Page </Link>
      <button style={{ padding: '10px 20px', border: '2px solid white' }} type="button" onClick={login}>
        Login
      </button>
    </div>
  );
}
