import { sdkService } from '@commercetool/sdk.service';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { useAuth } from '@contexts//authProvider';
import { useToast } from '@contexts/toastProvider';
import { testRegisterUser } from '@utils/constants';
import { Link, Navigate } from 'react-router-dom';

export function Registration() {
  const { isLoggedIn, login } = useAuth();
  const { customToast, promiseNotify } = useToast();

  const onSubmit = async (userData: CustomerDraft) => {
    try {
      await sdkService.register(userData);
      await sdkService.loginUser(userData.email, userData.password as string);
      login();
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      throw new Error(errorMessage);
    }
  };

  // в notify надо передать userData и потом ее в onSubmit
  const notify = (userData: CustomerDraft) => promiseNotify(userData, 'Registration', onSubmit);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Registration Page</h1>
      <Link to="/login">Link to Login Page </Link>
      <button
        style={{ padding: '10px 20px', border: '2px solid white' }}
        type="button"
        onClick={() => notify(testRegisterUser)}
      >
        Register
      </button>
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
}
