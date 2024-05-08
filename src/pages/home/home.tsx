import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../../commercetool/Client';
import { Routes } from '../../router/routes';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProject = async () => {
    try {
      const prods = await apiRoot.products().get().execute();
      const preparedProducts = prods.body.results;

      setProducts(preparedProducts);
    } catch (error) {
      throw Error('test - error message');
    }
  };

  useEffect(() => {
    getProject();
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

export default Home;
