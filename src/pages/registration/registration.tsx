import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { sdkService } from '../../commercetool/sdk.service';
import { tokenController } from '../../commercetool/token.service';
import { testRegisterUser } from '../../utils/constants';
import { storage } from '../../utils/storage';

export function Registration() {
  const [isLogined, setIsLogines] = useState(false);

  const register = async () => {
    const registerResult = await sdkService.register(testRegisterUser);
    if (registerResult) {
      const loginResult = await sdkService.loginUser(testRegisterUser.email, testRegisterUser.password);
      storage.saveTokenStore(tokenController.get());
      setIsLogines(loginResult);
    }
    // в then можно добавить всплытие модалки - что успешно
    // или показывать в p
  };

  return (
    <div>
      {isLogined && <Navigate to="/" replace />}
      <h1>Registration Page</h1>
      <Link to="/login">Link to Login Page </Link>
      <button style={{ padding: '10px 20px', border: '2px solid white' }} type="button" onClick={register}>
        Register
      </button>
    </div>
  );
}
