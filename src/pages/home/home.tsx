import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sdkService } from '../../commercetool/sdk.service';
import { Routes } from '../../router/routes';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProds = async () => {
    const data = await sdkService.getProducts();
    setProducts(data);
  };

  useEffect(() => {
    getProds();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <div>
        {products.slice(0, 4).map(product => (
          <div key={product.key}>
            <Link to={product.key ? `${Routes.PRODUCT_ROUTE}/${product.key}` : '/'}>
              {product.masterData.current.name['en-US']}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/login">Login</Link>
    </>
  );
}
