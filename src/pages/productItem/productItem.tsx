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
import { useToast } from '@contexts/toastProvider';
import { convertCentsToDollarsString, convertProductAttributesArrayToObject, ensureValue } from '@utils/utils';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import styles from './productItem.module.scss';

// eslint-disable-next-line max-lines-per-function
export function ProductItem() {
  const { category, subcategory, slug } = useParams();

  ensureValue(category, "can't find the product category");
  ensureValue(slug, "can't find the product key (slug)");

  const galleryRef = useRef<ReactImageGallery>(null);

  const [showHeart, setShowHeart] = useState(false);
  const [product, setProduct] = useState<ProductProjection>({} as ProductProjection);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeVariant, setActiveVariant] = useState<ProductVariant>({} as ProductVariant);
  const [quantity, setQuantity] = useState(1);
  const { customToast, errorNotify } = useToast();

  const getProduct = async () => {
    try {
      const data = await sdkService.getProductProjectionByKey(slug);
      setProduct(data);
      setActiveVariant(data.masterVariant);
    } catch (err) {
      errorNotify((err as Error).message);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.masterVariant) {
      setLoading(false);
    }
  }, [product]);

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

  const slides: ReactImageGalleryItem[] = [];
  images?.forEach(image => {
    const slideItem: ReactImageGalleryItem = {
      original: image.url,
      thumbnail: image.url,
      originalClass: isFullscreen ? '' : styles.sliderImg,
    };
    slides.push(slideItem);
  });

  const handleImageClick = () => {
    if (galleryRef.current) {
      if (isFullscreen) {
        galleryRef.current.exitFullScreen();
      } else {
        galleryRef.current.fullScreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullscreen(isFullScreen);
  };

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
            <div className={styles.sliderWrapper}>
              <ReactImageGallery
                ref={galleryRef}
                showNav={isFullscreen}
                showBullets={!isFullscreen}
                lazyLoad
                autoPlay
                showThumbnails={isFullscreen}
                useBrowserFullscreen={false}
                items={slides}
                onScreenChange={handleScreenChange}
                showFullscreenButton={false}
                onClick={handleImageClick}
              />
            </div>
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
