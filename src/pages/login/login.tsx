import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/registration">Link to Registration Page </Link>
    </div>
  );
}

export default Login;
