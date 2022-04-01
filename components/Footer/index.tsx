import Image from 'next/image';
import styles from './index.module.scss';
import { Container } from '@mantine/core';
import { HeartIcon } from '@radix-ui/react-icons';

const Footer = () => {
  return (
    <div className={styles.footer_wrapper}>
      <Container size={1280}>
        <div className={styles.card_wrapper}>
          <span>Made With</span>
          <HeartIcon />
          <span>From Unique And Raizel.</span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
