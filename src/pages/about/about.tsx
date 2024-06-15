import binarionPhoto from '@assets/About/Binarion.jpg';
import dimaPhoto from '@assets/About/Dima.jpg';
import juliaPhoto from '@assets/About/Julia.jpg';
import vitalPhoto from '@assets/About/Vital.jpg';
import { AboutBanner } from '@components/AboutBanner/AboutBanner';
import { AboutDescription } from '@components/AboutDescription/AboutDescription';
import { Developer } from '@components/Developer/Developer';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { SuccessLoginMessage } from '@utils/constants';
import { useEffect } from 'react';
import styles from './about.module.scss';

const developers = [
  {
    name: 'Dzmitry Yarmoshkin',
    text: "25 years old, Minsk, Belarus. Web developer from EPAM. Teacher and mentor at RS School. He is interested in programming, creating and improving interfaces. Follows the latest trends and innovations in the world of technology. Actively assisted and provided valuable advice on the use of various technologies, thoroughly reviewed pull requests, and offered insightful comments on how to improve the code. Was a constant source of support and guidance at every stage of the application's development. Team mentor.",
    photo: dimaPhoto,
    link: 'https://github.com/SpaNb4',
  },
  {
    name: 'Julia',
    text: '30 years old, Minsk, Belarus. Scrum Master. I am ready to make every effort to become a Frontend developer. He is interested in programming, including JavaScript and TypeScript. Prefers to work with React. Developed the catalog page, including all filters and the search bar. She actively participated in the development of the profile page, designed and implemented the cart page, and worked extensively with the CommerceTools SDK, ensuring all server requests were efficiently handled. Julia also created the basic project setup to kickstart the development process. Team leader.',
    photo: juliaPhoto,
    link: 'https://github.com/yuliya-karuk',
  },
  {
    name: 'Vital',
    text: '37 years old, Minsk, Belarus. Passionate about JavaScript and TypeScript. Actively uses React to create interactive web applications, creates and improves interfaces, strives for constant growth and improvement of his skills. Follows the latest trends and innovations in the world of technology. Developed the registration and login forms, created the product page, and actively contributed to the profile page development. Was also instrumental in designing and implementing the cart page. Additionally, he consistently provided valuable suggestions for improving the overall user experience and interface enhancements.',
    photo: vitalPhoto,
    link: 'https://github.com/Vitali86',
  },
  {
    name: 'B!n@r!0n',
    text: "39 years old, Minsk, Belarus. Former system administrator. He is interested in programming, including JavaScript and TypeScript. Engaged in the creation and improvement of interfaces, strives for constant growth and improvement of his skills. Follows the latest trends and innovations in the world of technology. Implemented a stunning Home page, significantly improved the build optimization process, and crafted an engaging About Us page, as well as the site navigation menu. Additionally, they consistently proposed innovative ideas to enhance the application's user interface, ensuring an exceptional user experience.",
    photo: binarionPhoto,
    link: 'https://github.com/GreyAdmiral',
  },
];

export function About() {
  const { isLoginSuccess, setIsLoginSuccess } = useAuth();
  const { customToast, successNotify } = useToast();

  const notify = () => {
    successNotify(SuccessLoginMessage);
    setIsLoginSuccess(false);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={styles.main}>
        <div className={styles.hero}>
          <Header />
          <AboutBanner />
        </div>
        <AboutDescription />
        <div className={styles.aboutDevelopers}>
          {developers.map(dev => (
            <Developer key={dev.name} name={dev.name} text={dev.text} photo={dev.photo} link={dev.link} />
          ))}
        </div>
      </div>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </>
  );
}
