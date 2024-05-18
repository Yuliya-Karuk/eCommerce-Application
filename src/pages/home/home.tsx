import { sdkService } from '@commercetool/sdk.service';
import { Product } from '@commercetools/platform-sdk';
import { useAuth } from '@contexts//authProvider';
import { useToast } from '@contexts/toastProvider';
import { AppRoutes } from '@router/routes';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoggedIn, isLoginSuccess, setIsLoginSuccess, logout } = useAuth();
  const { customToast, successNotify } = useToast();

  const getProds = async () => {
    const data = await sdkService.getProducts();
    setProducts(data);
  };

  const handleLogout = () => {
    sdkService.logoutUser();
    logout();
  };

  const notify = () => {
    successNotify();
    setIsLoginSuccess(false);
  };

  useEffect(() => {
    getProds();
    if (isLoginSuccess) {
      notify();
    }
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <div>
        {products.slice(0, 4).map(product => (
          <div key={product.key}>
            <Link to={product.key ? `${AppRoutes.PRODUCT_ROUTE}/${product.key}` : '/'}>
              {product.masterData.current.name['en-US']}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registration</Link>
      {isLoggedIn && (
        <button type="button" onClick={handleLogout} style={{ color: 'white' }}>
          Logout
        </button>
      )}
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </>
  );
}
