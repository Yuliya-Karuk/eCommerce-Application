import { Link, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sdkService } from '../../commercetool/sdk.service';
import { useAuth } from '../../contexts/authProvider';
import { testRegisterUser } from '../../utils/constants';

export function Registration() {
  const { isLoggedIn, login } = useAuth();

  const onSubmit = async () => {
    try {
      await sdkService.register(testRegisterUser);
      await sdkService.loginUser(testRegisterUser.email, testRegisterUser.password);
      login();
    } catch (error) {
      const errorMessage = (error as Error).message || 'Unknown error';
      throw new Error(errorMessage);
    }
  };

  // в notify надо передать userData и потом ее в onSubmit
  const notify = () =>
    toast.promise(() => onSubmit(), {
      pending: 'Registration in progress, wait, please',
      error: {
        render({ data }) {
          return `${(data as Error).message}`;
        },
      },
    });

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Registration Page</h1>
      <Link to="/login">Link to Login Page </Link>
      <button style={{ padding: '10px 20px', border: '2px solid white' }} type="button" onClick={notify}>
        Register
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
