import { Link, Navigate } from 'react-router-dom';
import { sdkService } from '../../commercetool/sdk.service';
import { useAuth } from '../../contexts/authProvider';
import { testRegisterUser } from '../../utils/constants';

export function Registration() {
  const { isLoggedIn, login } = useAuth();

  const register = async () => {
    const registerResult = await sdkService.register(testRegisterUser);
    if (registerResult) {
      await sdkService.loginUser(testRegisterUser.email, testRegisterUser.password);
      login();
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Registration Page</h1>
      <Link to="/login">Link to Login Page </Link>
      <button style={{ padding: '10px 20px', border: '2px solid white' }} type="button" onClick={register}>
        Register
      </button>
    </div>
  );
}
