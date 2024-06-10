import { Container } from '@components/Container/Container';
import { FC } from 'react';
import image1 from '../../assets/Gramm/Gramm-01.jpg';
import image2 from '../../assets/Gramm/Gramm-02.jpg';
import image3 from '../../assets/Gramm/Gramm-03.jpg';
import image4 from '../../assets/Gramm/Gramm-04.jpg';
import image5 from '../../assets/Gramm/Gramm-05.jpg';
import image6 from '../../assets/Gramm/Gramm-06.jpg';
import image7 from '../../assets/Gramm/Gramm-07.jpg';
import image8 from '../../assets/Gramm/Gramm-08.jpg';
import image9 from '../../assets/Gramm/Gramm-09.jpg';
import image10 from '../../assets/Gramm/Gramm-10.jpg';
import styles from './Gramm.module.scss';

const gallery = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

export const Gramm: FC = () => {
  const imageSize = 276;

  return (
    <div className={styles.gramm}>
      <Container classname={styles.gramm}>
        <section className={styles.grammBody}>
          <h1 className={styles.grammTitle}>Sprout on the #Gram</h1>
          <div className={styles.grammGallery}>
            {gallery.map(img => {
              return (
                <a
                  key={Math.random().toString(36).slice(2)}
                  className={styles.grammGalleryItem}
                  href="https://www.instagram.com/sabatonofficial/"
                  title="#sprout, #plants, #beauty, #fresh, #pots, #flowers, #weeds, #leaves"
                >
                  <img
                    className={styles.grammGalleryImage}
                    src={img}
                    width={imageSize}
                    height={imageSize}
                    alt="There could be your advertisement here"
                    loading="lazy"
                  />
                </a>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
};
