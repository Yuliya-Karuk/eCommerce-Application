import { FC } from 'react';
import styles from './Discover.module.scss';

const images = [
  {
    path: '../../../public/Discover/discover-1.jpg',
    title: 'Plants',
    class: styles.imagesPlants,
  },
  {
    path: '../../../public/Discover/discover-2.jpg',
    title: 'Pots',
    class: styles.imagesPots,
  },
  {
    path: '../../../public/Discover/discover-3.jpg',
    title: 'Subscription',
    class: styles.imagesSubscription,
  },
];

export const Discover: FC = () => {
  return (
    <div className={styles.discover}>
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>Shop by Category</div>
        <div className={styles.bannerText}>Discover Sprout</div>
      </div>

      <div className={styles.images}>
        {images.map(image => (
          <div key={image.path} className={image.class} data-title={image.title}>
            <img src={image.path} alt={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
