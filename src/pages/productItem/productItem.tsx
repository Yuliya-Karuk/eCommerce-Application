import heart from '@assets/heart.svg';
import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { ProductAttributes, ProductAttributesView } from '@components/ProductAttributes/ProductAttributesView';
import { ProductInfoSection } from '@components/ProductInfoSection/ProductInfoSection';
import { QuantityInput } from '@components/QuantityInput/QuantityInput';
import { Slider } from '@components/Slider/Slider';
import { useToast } from '@contexts/toastProvider';
import { assertValue, convertCentsToDollarsString, convertProductAttributesArrayToObject } from '@utils/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styles from './productItem.module.scss';

export function ProductItem() {
  const { category, subcategory, slug } = useParams();

  assertValue(category, "can't find the product category");
  assertValue(slug, "can't find the product key (slug)");

  const navigate = useNavigate();

  const [showHeart, setShowHeart] = useState(false);
  const [product, setProduct] = useState<ProductProjection>({} as ProductProjection);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeVariant, setActiveVariant] = useState<ProductVariant>({} as ProductVariant);
  const [quantity, setQuantity] = useState(1);
  const { customToast, errorNotify } = useToast();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const data = await sdkService.getProductProjectionByKey(slug);
        const { categories } = data;
        const [category1, category2] = categories;

        const category1Slug = await sdkService.getCategoryById(category1.id).then(cat1 => cat1[0].slug['en-US']);
        const category2Slug = category2
          ? await sdkService.getCategoryById(category2.id).then(cat2 => cat2[0].slug['en-US'])
          : null;

        const isCategoriesCorrect =
          (category === category1Slug && (!subcategory || subcategory === category2Slug)) ||
          (category === category2Slug && (!subcategory || subcategory === category1Slug));

        if (!isCategoriesCorrect) {
          navigate('/404');
        }

        setProduct(data);
        setActiveVariant(data.masterVariant);

        setLoading(false);
      } catch (err) {
        errorNotify((err as Error).message);
      }
    };

    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
        {customToast({ position: 'top-center', autoClose: 5000 })};
      </>
    );
  }

  const name = product.name['en-US'];
  const breadcrumbs: string[] = [];
  breadcrumbs.push(category);
  if (subcategory) {
    breadcrumbs.push(subcategory);
  }
  breadcrumbs.push(name);

  const { sku } = activeVariant;
  const fullPrice: string = activeVariant.prices
    ? convertCentsToDollarsString(activeVariant.prices[0].value.centAmount)
    : '';
  const priceWithDiscount = activeVariant.prices?.[0].discounted?.value.centAmount
    ? convertCentsToDollarsString(activeVariant.prices[0].discounted.value.centAmount)
    : '';
  const hasDiscount = !!activeVariant.prices?.[0].discounted?.value.centAmount;
  const { images } = product.masterVariant;
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

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const handleAddToCartClick = () => {
    // const order = {
    //   action: 'addLineItem',
    //   productId: product.id,
    //   variantId: activeVariant.id,
    //   quantity,
    // };
    // console.log(order);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <Container>
        <div className={styles.wrapper}>
          <Breadcrumbs activeCategorySlug={breadcrumbs} />
          <div className={styles.productOverview}>
            <Slider images={images} />
            <section className={styles.productSummary}>
              <h2 className={styles.productSummaryHeader}>{name}</h2>
              {sku ? <div className={styles.sku}>SKU: {sku}</div> : ''}
              <div className={styles.priceLabel}>
                Price:
                <div
                  className={classNames(styles.fullPrice, {
                    [styles.fullPriceLineThrough]: hasDiscount,
                  })}
                >
                  {fullPrice}
                </div>
                <div className={styles.priceWithDiscount}>{priceWithDiscount}</div>
              </div>

              <ProductAttributesView
                activeAttributes={convertProductAttributesArrayToObject(attributes)}
                allAttributes={allAttributes}
                setActiveVariant={setActiveVariant}
                product={product}
              />

              <div className={styles.buttonsWrapper}>
                <div className={styles.quantitySelector}>
                  <QuantityInput value={quantity} onChange={setQuantity} />
                </div>
                <div className={styles.buttonsWrapper}>
                  <button type="button" className={styles.addToCartButton} onClick={handleAddToCartClick}>
                    add to cart
                  </button>
                  <button type="button" className={styles.addToFavoriteButton} onClick={handleFavoriteClick}>
                    <img src={heart} alt="add to favorite" />
                    {showHeart && <img className={styles.heartAnimation} src={heart} alt="flying heart" />}
                  </button>
                </div>
              </div>
              <ProductInfoSection productInfoText={allAttributes[0].details} />
            </section>
          </div>
          <div className={styles.productDescription}>{product.description?.['en-US']}</div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
