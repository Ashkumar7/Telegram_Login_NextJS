import Image from 'next/image';
import styles from './index.module.scss';
import { Container } from '@mantine/core';

const Footer = () => {
  return (
    <div className={styles.footer_wrapper}>
      <Container size={1280}>
        <div className={styles.card_wrapper}>
          <span>Made With</span>
          <Image alt='Heart Icon by Chamestudio on Iconscout' src='/svg/heart.svg' width={25} height={25} />
          <span>From Unique And Raizel.</span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
