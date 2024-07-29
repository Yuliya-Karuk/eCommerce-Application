import template from '@assets/template.png';
import { sdkService } from '@commercetool/sdk.service';
import {
  CartRemoveLineItemAction,
  CartUpdateAction,
  MyCartAddLineItemAction,
  MyCartRemoveLineItemAction,
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';
import { ProductAttributes, ProductAttributesView } from '@components/ProductAttributes/ProductAttributesView';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { CategoryList } from '@models/index';
import { AppRoutes } from '@router/routes';
import { ProductAddToCart, ProductRemoveFromCart } from '@utils/constants';
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

interface UpdateCart {
  action: MyCartAddLineItemAction | MyCartRemoveLineItemAction;
  message: string;
}

export const ProductCard = ({ categories, product }: ProductCardProps) => {
  let priceDiscounted;
  const { successNotify, errorNotify, promiseNotify } = useToast();

  const slugs = prepareProductSlugs(categories, product.categories).join('/');
  const productName = product.name['en-US'];
  const productDesc = isNotNullable(product.description)['en-US'];
  const productImg = isNotNullable(product.masterVariant.images)[0].url;

  const { cart, setCart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

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

  const pricesArr = isNotNullable(activeVariant.prices);
  const price = convertCentsToDollarsString(pricesArr[0].value.centAmount);
  const isDiscounted = Boolean(pricesArr[0].discounted);
  if (isDiscounted) {
    priceDiscounted = convertCentsToDollarsString(isNotNullable(pricesArr[0].discounted).value.centAmount);
  }

  useEffect(() => {
    const checkIfInCart = () => {
      const cartItem = cart.lineItems.find(
        item => item.productId === product.id && item.variant.id === activeVariant.id
      );
      if (cartItem) {
        setIsInCart(true);
        setCartItemId(cartItem.id);
      } else {
        setIsInCart(false);
        setCartItemId(null);
      }
    };

    if (cart && Object.keys(cart).length > 0 && activeVariant.sku) {
      checkIfInCart();
    }
  }, [cart, activeVariant, product.id]);

  const updateCart = async (updateData: UpdateCart) => {
    try {
      const data = await sdkService.updateCart(cart.id, cart.version, [updateData.action]).then(cartData => {
        successNotify(updateData.message);
        return cartData;
      });

      setCart(data);
    } catch (error) {
      errorNotify((error as Error).message);
    }
  };

  const notify = (userData: UpdateCart, PromiseMessage: string) => promiseNotify(userData, PromiseMessage, updateCart);

  const handleAddOrRemoveButtonClick = async () => {
    if (isInCart && cartItemId) {
      const action: CartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: cartItemId,
      };

      notify(
        {
          action,
          message: ProductRemoveFromCart,
        },
        'Removing'
      );
    } else {
      const action: CartUpdateAction = {
        action: 'addLineItem',
        productId: product.id,
        variantId: activeVariant.id,
        quantity: 1,
      };

      notify(
        {
          action,
          message: ProductAddToCart,
        },
        'Adding'
      );
    }
  };

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
