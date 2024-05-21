import catalogAll from '@assets/catalog-all.webp';
import { sdkService } from '@commercetool/sdk.service';
import { Filters } from '@components/Filters/Filters';
import { Header } from '@components/index';
import styles from './catalog.module.scss';

const CatalogPages = {
  all: {
    name: 'All Products',
    img: catalogAll,
    response: sdkService.getProducts,
  },
  plants: {
    name: 'Plants',
    img: catalogAll,
    response: sdkService.getProducts,
  },
};

export function Catalog() {
  return (
    <div className={styles.catalog}>
      <Header />
      <div className={styles.catalogContainer}>
        <Filters />
        <div className={styles.catalogContent}>
          <div className={styles.catalogImgContainer}>
            <img className={styles.catalogImg} src={CatalogPages.all.img} alt="catalog img" />
          </div>
          <div className={styles.catalogProducts} />
        </div>
      </div>
    </div>
  );
}
