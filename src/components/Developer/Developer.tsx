import { Container } from '@components/Container/Container';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Developer.module.scss';

interface DeveloperI {
  name: string;
  text: string;
  photo: string;
  link: string;
}

export const Developer: FC<DeveloperI> = ({ name, text, photo, link }) => {
  const photoSize = 761;

  return (
    <div className={styles.developer}>
      <Container classname={styles.developer}>
        <div className={styles.developerBody}>
          <div className={styles.developerPhoto}>
            <img src={photo} alt={name} width={photoSize} height={photoSize} loading="lazy" />
          </div>
          <div className={styles.developerInfo}>
            <h3 className={styles.developerName}>
              <Link to={link} title="Link to the developer's repository">
                {name}
              </Link>
            </h3>
            <div className={styles.developerText}>{text}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
