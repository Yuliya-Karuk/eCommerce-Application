import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Discover.module.scss';

const links = [
  {
    image: '../../../public/images/Discover/discover-1.jpg',
    title: 'Plants',
    class: styles.linksPlants,
    link: `${AppRoutes.CATALOG_ROUTE}/plants`,
  },
  {
    image: '../../../public/images/Discover/discover-2.jpg',
    title: 'Pots',
    class: styles.linksPots,
    link: `${AppRoutes.CATALOG_ROUTE}/pots`,
  },
  {
    image: '../../../public/images/Discover/discover-3.jpg',
    title: 'Collections',
    class: styles.linksCollections,
    link: `${AppRoutes.CATALOG_ROUTE}/collections`,
  },
];

export const Discover: FC = () => {
  return (
    <div className={styles.discover}>
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>Shop by Category</div>
        <div className={styles.bannerText}>Discover Sprout</div>
      </div>

      <div className={styles.links}>
        {links.map(link => (
          <Link key={link.image} className={link.class} title={link.title} to={link.link}>
            <img src={link.image} alt={link.title} loading="lazy" />
          </Link>
        ))}
      </div>
    </div>
  );
};
