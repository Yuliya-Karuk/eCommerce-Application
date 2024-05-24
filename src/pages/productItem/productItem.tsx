import heart from '@assets/heart.svg';
import { sdkService } from '@commercetool/sdk.service';
import { Product } from '@commercetools/platform-sdk';
import { convertCentsToDollarsString } from '@utils/utils';
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

  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getProduct = async () => {
    const data = await sdkService.getProductByKey(slug);
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.masterData?.current) {
      console.log(product.masterData.current);
      setLoading(false);
    }
  }, [product]);

  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullscreen(isFullScreen);
  };

  if (loading) {
    return <div>it was here somewhere... Wait, please, i will find it....</div>;
  }

  const name = product.masterData.current.name['en-US'];
  const { sku } = product.masterData.current.masterVariant;

  const fullPrice: string = product.masterData.current.masterVariant.prices
    ? convertCentsToDollarsString(product.masterData.current.masterVariant.prices[0].value.centAmount)
    : '';

  const hasDiscount = !!product.masterData.current.masterVariant.prices?.[0].discounted?.value.centAmount;

  const priceWithDiscount = product.masterData.current.masterVariant.prices?.[0].discounted?.value.centAmount
    ? convertCentsToDollarsString(product.masterData.current.masterVariant.prices[0].discounted.value.centAmount)
    : '';

  const { images } = product.masterData.current.masterVariant;
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
            showThumbnails={false}
            useBrowserFullscreen={false}
            items={slides}
            onScreenChange={handleScreenChange}
            showFullscreenButton={false}
            onClick={handleImageClick}
            // additionalClass={isFullscreen ? '' : styles.sliderImg}
            // additionalClass={styles.sliderImg}
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

          <div className={styles.attributes}>
            {product.masterData.current.masterVariant.attributes?.map(item => (
              <div key={item.name} className={styles.attributesItem}>
                <div className={styles.name}>{item.name}:</div>
                <div className={styles.value}>{item.value[0].toString()}</div>
              </div>
            ))}
          </div>
          <div className={styles.buttonsWrapper}>
            <button type="button" className={styles.addToCartButton}>
              add to cart
            </button>
            <button type="button" className={styles.addToFavoriteButton}>
              <img src={heart} alt="add to favorite" />
            </button>
          </div>
        </section>
      </div>
      <div className={styles.productDescription}>
        <h3 className={styles.descriptionHeader}>Description</h3>
        <p>{product.masterData.current.description?.['en-US']}</p>
      </div>
    </div>
  );
}
