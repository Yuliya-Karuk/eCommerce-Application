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
    text: '25 years old, Minsk, Belarus. Web developer from EPAM. Teacher and mentor at RS School. He is interested in programming, creating and improving interfaces. Follows the latest trends and innovations in the world of technology. Team mentor.',
    photo: dimaPhoto,
    link: 'https://github.com/SpaNb4',
  },
  {
    name: 'Julia',
    text: '30 years old, Minsk, Belarus. Scrum Master. I am ready to make every effort to become a Frontend developer. He is interested in programming, including JavaScript and TypeScript. Prefers to work with React. Engaged in the creation and improvement of interfaces, strives for personal and professional growth. Team leader.',
    photo: juliaPhoto,
    link: 'https://github.com/yuliya-karuk',
  },
  {
    name: 'Vital',
    text: '37 years old, Minsk, Belarus. Passionate about JavaScript and TypeScript. Actively uses React to create interactive web applications, creates and improves interfaces, strives for constant growth and improvement of his skills. Follows the latest trends and innovations in the world of technology. In his free time, he enjoys learning new programming languages and optimizing existing projects.',
    photo: vitalPhoto,
    link: 'https://github.com/Vitali86',
  },
  {
    name: 'B!n@r!0n',
    text: '39 years old, Minsk, Belarus. Former system administrator. He is interested in programming, including JavaScript and TypeScript. Engaged in the creation and improvement of interfaces, strives for constant growth and improvement of his skills. Follows the latest trends and innovations in the world of technology. In his free time, he enjoys learning new programming languages and optimizing existing projects.',
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
