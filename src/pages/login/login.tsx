import { Link, Navigate } from 'react-router-dom';
import { sdkService } from '../../commercetool/sdk.service';
import { useAuth } from '../../providers/authProvider';
import { testLoginUser } from '../../utils/constants';

export function Login() {
  const { isLogin, login } = useAuth();

  const handleLogin = async () => {
    await sdkService.loginUser(testLoginUser.email, testLoginUser.password);
    login();
  };

  return (
    <div>
      {isLogin && <Navigate to="/" replace />}
      <h1>Login Page</h1>
      <Link to="/registration">Link to Registration Page </Link>
      <button style={{ padding: '10px 20px', border: '2px solid white' }} type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
