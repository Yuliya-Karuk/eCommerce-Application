import heart from '@assets/heart.svg';
import { sdkService } from '@commercetool/sdk.service';
import { Product, ProductVariant } from '@commercetools/platform-sdk';
import ProductAttributesView, { ProductAttributes } from '@components/ProductAttributes/ProductAttributesView';
import { ProductInfoSection } from '@components/ProductInfoSection/ProductInfoSection';
import QuantityInput from '@components/QuantityInput/QuantityInput';
import { convertCentsToDollarsString, convertProductAttributesArrayToObject } from '@utils/utils';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import styles from './productItem.module.scss';

// eslint-disable-next-line max-lines-per-function
export function ProductItem() {
  const { slug } = useParams();
  if (!slug) {
    throw new Error("can't find the product key (slug)");
  }

  const galleryRef = useRef<ReactImageGallery>(null);

  const [showHeart, setShowHeart] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeVariant, setActiveVariant] = useState<ProductVariant>({} as ProductVariant);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    const data = await sdkService.getProductByKey(slug);
    setProduct(data);
    setActiveVariant(data.masterData.current.masterVariant);
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.masterData?.current) {
      setLoading(false);
    }
  }, [product]);

  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullscreen(isFullScreen);
  };

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  if (loading) {
    return <div className={styles.loader}>it was here somewhere... Wait, please, i will find it....</div>;
  }

  const name = product.masterData.current.name['en-US'];
  const { sku } = activeVariant;
  const fullPrice: string = activeVariant.prices
    ? convertCentsToDollarsString(activeVariant.prices[0].value.centAmount)
    : '';
  const hasDiscount = !!activeVariant.prices?.[0].discounted?.value.centAmount;
  const priceWithDiscount = activeVariant.prices?.[0].discounted?.value.centAmount
    ? convertCentsToDollarsString(activeVariant.prices[0].discounted.value.centAmount)
    : '';
  const { images } = product.masterData.current.masterVariant;
  const { variants } = product.masterData.current;
  const { attributes } = activeVariant;
  const allAttributes: ProductAttributes[] = [];
  if (attributes) {
    allAttributes.push(convertProductAttributesArrayToObject(product.masterData.current.masterVariant.attributes));
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.path}>catalog / {name}</div>
      <div className={styles.productOverview}>
        <div className={styles.sliderWrapper}>
          <ReactImageGallery
            ref={galleryRef}
            showNav={!!isFullscreen}
            showBullets
            lazyLoad
            autoPlay
            showThumbnails={!!isFullscreen}
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
            <button type="button" className={styles.addToCartButton}>
              add to cart
            </button>
            <button type="button" className={styles.addToFavoriteButton} onClick={handleFavoriteClick}>
              <img src={heart} alt="add to favorite" />
              {showHeart && <img className={styles.heartAnimation} src={heart} alt="flying heart" />}
            </button>
          </div>
          <ProductInfoSection productInfoText={allAttributes[0].details} />
        </section>
      </div>
      <div className={styles.productDescription}>{product.masterData.current.description?.['en-US']}</div>
    </div>
  );
}
