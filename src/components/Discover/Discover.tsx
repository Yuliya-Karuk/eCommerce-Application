import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import discoverImg1 from '../../assets/Discover/discover-1.jpg';
import discoverImg2 from '../../assets/Discover/discover-2.jpg';
import discoverImg3 from '../../assets/Discover/discover-3.jpg';
import styles from './Discover.module.scss';

const links = [
  {
    image: discoverImg1,
    title: 'Plants',
    class: styles.linksPlants,
    link: `${AppRoutes.CATALOG_ROUTE}/plants`,
  },
  {
    image: discoverImg2,
    title: 'Pots',
    class: styles.linksPots,
    link: `${AppRoutes.CATALOG_ROUTE}/pots`,
  },
  {
    image: discoverImg3,
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
