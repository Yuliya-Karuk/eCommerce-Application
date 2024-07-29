import sprite from '@assets/sprite.svg';
import { Container } from '@components/Container/Container';
import { Logo } from '@components/Logo/Logo';
import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const contacts = [
  {
    name: 'Address',
    value: 'Minsk, K. Marks Street, 38',
    link: 'https://yandex.by/maps/157/minsk/house/Zk4YcwFkSkwGQFtpfXVxcXhiZQ==/?ll=27.564392%2C53.900411&z=16.65',
    hint: 'Watch on the map',
  },
  {
    name: 'Phone',
    value: '+375-17-222-37-78',
    link: 'tel:+375-17-222-37-78',
    hint: 'Call',
  },
  {
    name: 'Email',
    value: 'udp@udp.gov.by',
    link: 'mailto:udp@udp.gov.by',
    hint: 'To send a letter',
  },
];

const shop = [
  {
    name: 'Shop All',
    link: AppRoutes.CATALOG_ROUTE,
  },
  {
    name: 'Plants',
    link: `${AppRoutes.CATALOG_ROUTE}/plants`,
  },
  {
    name: 'Pots',
    link: `${AppRoutes.CATALOG_ROUTE}/pots`,
  },
  {
    name: 'Collection',
    link: `${AppRoutes.CATALOG_ROUTE}/collections`,
  },
];

const openingHours = [
  {
    name: 'Mon - Fri',
    value: '9am - 6pm',
  },
  {
    name: 'Saturday',
    value: 'Day off',
  },
  {
    name: 'Sunday',
    value: 'Day off',
  },
];

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Container classname={styles.footer}>
        <div className={styles.footerBody}>
          <div className={styles.footerLogo}>
            <Logo spritePaths={sprite} width="88" height="82" />
          </div>

          <hr className={styles.footerSeparator} />

          <div className={styles.footerInfo}>
            <section className={styles.footerContacts}>
              <h4 className={styles.footerTitle}>Contacts</h4>
              <ul className={styles.footerList}>
                {contacts.map(item => (
                  <li key={Math.random().toString(36).slice(2)} className={styles.footerListItem}>
                    <Link to={item.link} className={styles.footerLink} title={item.hint}>
                      {`${item.name}: ${item.value}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.footerShop}>
              <h4 className={styles.footerTitle}>Shop</h4>
              <ul className={styles.footerList}>
                {shop.map(item => (
                  <li key={Math.random().toString(36).slice(2)} className={styles.footerListItem}>
                    <Link to={item.link} className={styles.footerLink} title={`Go to ${item.name}`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.footerOpeningHours}>
              <h4 className={styles.footerTitle}>Opening Hours</h4>
              <ul className={styles.footerList}>
                {openingHours.map(item => (
                  <li key={Math.random().toString(36).slice(2)} className={styles.footerListItem}>
                    {`${item.name}: ${item.value}`}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <hr className={styles.footerSeparator} />

          <div className={styles.footerCopyright}>
            © 2024 by Sprout. Created as part of a RS School school training program.
          </div>
        </div>
      </Container>
    </footer>
  );
};
