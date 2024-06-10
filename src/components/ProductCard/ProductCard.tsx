import template from '@assets/template.png';
import { sdkService } from '@commercetool/sdk.service';
import {
  CartRemoveLineItemAction,
  CartUpdateAction,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';
import { ProductAttributes, ProductAttributesView } from '@components/ProductAttributes/ProductAttributesView';
import { useCart } from '@contexts/cartProvider';
import { CategoryList } from '@models/index';
import { AppRoutes } from '@router/routes';
import {
  convertCentsToDollarsString,
  convertProductAttributesArrayToObject,
  isNotNullable,
  prepareProductSlugs,
} from '@utils/utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductProjection;
  categories: CategoryList;
}

export const ProductCard = ({ categories, product }: ProductCardProps) => {
  console.log(product);
  let priceDiscounted;
  const slugs = prepareProductSlugs(categories, product.categories).join('/');
  const productName = product.name['en-US'];
  const productDesc = isNotNullable(product.description)['en-US'];
  const productImg = isNotNullable(product.masterVariant.images)[0].url;
  const pricesArr = isNotNullable(product.masterVariant.prices);
  const price = convertCentsToDollarsString(pricesArr[0].value.centAmount);
  const isDiscounted = Boolean(pricesArr[0].discounted);
  if (isDiscounted) {
    priceDiscounted = convertCentsToDollarsString(isNotNullable(pricesArr[0].discounted).value.centAmount);
  }
  const { cart, setCart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  useEffect(() => {
    const checkIfInCart = () => {
      const cartItem = cart.lineItems.find(
        item => item.productId === product.id && item.variant.id === product.masterVariant.id
      );
      if (cartItem) {
        setIsInCart(true);
        setCartItemId(cartItem.id);
      } else {
        setIsInCart(false);
        setCartItemId(null);
      }
    };

    if (cart && product.masterVariant.sku) {
      checkIfInCart();
    }
  }, [cart, product.masterVariant, product.id]);

  const handleAddOrRemoveButtonClick = async () => {
    if (isInCart && cartItemId) {
      const action: CartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: cartItemId,
      };

      const data = await sdkService.updateCart(cart.id, cart.version, [action]);
      setCart(data);
    } else {
      const order: CartUpdateAction = {
        action: 'addLineItem',
        productId: product.id,
        variantId: product.masterVariant.id,
        quantity: 1,
      };

      const data = await sdkService.updateCart(cart.id, cart.version, [order]).then(cartData => {
        // successNotify('Product added successfully');
        return cartData;
      });

      setCart(data);
    }
  };

  const [activeVariant, setActiveVariant] = useState<ProductVariant>(product.masterVariant as ProductVariant);
  const { variants } = product;
  const { attributes } = activeVariant;
  const allAttributes: ProductAttributes[] = [];

  if (attributes) {
    allAttributes.push(convertProductAttributesArrayToObject(product.masterVariant.attributes));
  }
  variants.forEach(variant => {
    if (variant.attributes) {
      allAttributes.push(convertProductAttributesArrayToObject(variant.attributes));
    }
  });

  return (
    <div className={styles.productCard}>
      <Link to={`${AppRoutes.PRODUCTS_ROUTE}/${slugs}/${product.key}`} className={styles.productCardImgContainer}>
        <img className={styles.productCardImg} src={productImg || template} alt="catalog img" />
        <p className={styles.productCardDescription}>{productDesc}</p>
      </Link>
      <Link to={`${AppRoutes.PRODUCTS_ROUTE}/${slugs}/${product.key}`} className={styles.productCardTitle}>
        {productName}
      </Link>
      <div className={styles.productCardPrices}>
        <span>Price: </span>
        <div className={classnames(styles.productCardPrice, { [styles.crossed]: pricesArr[0].discounted })}>
          {price}
        </div>
        {isDiscounted && <div className={styles.productCardPriceDiscount}>{priceDiscounted}</div>}
      </div>
      <ProductAttributesView
        activeAttributes={convertProductAttributesArrayToObject(attributes)}
        allAttributes={allAttributes}
        setActiveVariant={setActiveVariant}
        product={product}
        isCatalog
      />
      <button type="button" className={styles.productCardButton} onClick={handleAddOrRemoveButtonClick}>
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};
