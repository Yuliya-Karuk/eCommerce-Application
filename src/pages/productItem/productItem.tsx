import { useParams } from 'react-router-dom';

function ProductItem() {
  const { slug } = useParams();
  // тут будет запрос на продукт чтобы получить все данные
  return (
    <div>
      <h1>ProductItem Page {slug}</h1>
    </div>
  );
}

export default ProductItem;
