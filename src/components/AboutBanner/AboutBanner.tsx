import sprite from '@assets/sprite.svg';
import { Container } from '@components/Container/Container';
import { FC } from 'react';
import styles from './AboutBanner.module.scss';

const paragraphs = [
  'Looking back over the years, Sprout has been a place where both new and experienced gardeners are able to mingle, grow, and find inspiration through working with plants and cultivating life and beauty. Now, so many years later, we are thankful to celebrate over 50 years as a locally owned, family-run business.',
  'Sprout remains unique in its pursuit of organic gardening practices, holding true to the belief that organic gardening can make a huge difference in the world. We strive to provide each customer with an organic solution to all plant-related matters, whether it is the soils and fertilizers we use or challenges we may face with insects and disease. We also believe that the art of gardening should be sustainable by nature, and our organic approach helps us achieve this goal of having a positive impact on not only our plants, but also on the Earth and environments that we live in.',
];

const rsscoolUrl = 'https://app.rs.school/';

export const AboutBanner: FC = () => {
  const logoWidth = 150;
  const logoHeight = 54;
  return (
    <div className={styles.aboutBanner}>
      <Container classname={styles.aboutBanner}>
        <div className={styles.aboutBannerBody}>
          <h1 className={styles.aboutBannerTitle}>All About Sprout</h1>
          <div className={styles.aboutBannerInfo}>
            {paragraphs.map(text => (
              <p key={Math.random().toString(36).slice(2)} className={styles.aboutBannerText}>
                {text}
              </p>
            ))}
          </div>
          <a
            href={rsscoolUrl}
            className={styles.aboutBannerLogo}
            title="Go to RS Scool"
            aria-label="Go to RS Scool"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg width={logoWidth} height={logoHeight}>
              <use xlinkHref={`${sprite}#rsschool`} />
            </svg>
          </a>
        </div>
      </Container>
    </div>
  );
};
