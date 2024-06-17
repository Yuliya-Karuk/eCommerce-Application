import rsschoolLogo from '@assets/About/rsschool-logo.svg';
import { Container } from '@components/Container/Container';
import { FC } from 'react';
import styles from './AboutDescription.module.scss';

const rsscoolInfo =
  'Welcome to our eCommerce application, project completed as part of the final task at RS School! Our team of three collaboratively developed the frontend of this platform, focusing on delivering an exceptional user experience. We designed and implemented responsive layouts, built reusable components with React.js, and essential React libraries. We followed Scrum methodology for efficient project management, with regular sprints and reviews. Our mentor provided continuous feedback and quality assurance, ensuring the application met industry standards. This project showcases our effective teamwork, technical skills, and commitment to creating a high-quality product.';
const rsscoolUrl = 'https://rs.school/';

export const AboutDescription: FC = () => {
  const logoWidth = 350;
  const logoHeight = 427;
  return (
    <div className={styles.aboutDescription}>
      <Container classname={styles.aboutDescription}>
        <div className={styles.aboutDescriptionBody}>
          <div className={styles.aboutDescriptionLogo}>
            <a
              href={rsscoolUrl}
              className={styles.aboutDescriptionLink}
              title="Go to RS Scool"
              aria-label="Go to RS Scool"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={rsschoolLogo} alt="RS Scool Logo" width={logoWidth} height={logoHeight} />
            </a>
          </div>
          <div className={styles.aboutDescriptionInfo}>
            <div className={styles.aboutDescriptionText}>{rsscoolInfo}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
