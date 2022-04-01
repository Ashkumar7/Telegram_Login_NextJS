import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';
import { Divider, Text } from '@mantine/core';
import { Container } from '@mantine/core';
import { DoubleArrowRightIcon } from '@radix-ui/react-icons';

const AuthHeader: React.FC<{ url: string; text: string }> = ({ url, text }) => {
  return (
    <div className={styles.auth_header_wrapper}>
      <Container size={1280}>
        <div className={styles.card_wrapper}>
          {/* Left-Side-Item */}
          <Link href='/' passHref>
            <div className={styles.card_1}>
              <Image alt='Site Logo' src='/svg/site_logo.svg' width={100} height={65} />
              <div className={styles.visibility}>
                <hr />
                <Text ml='0.5rem'>UniqueHub</Text>
              </div>
            </div>
          </Link>

          {/* Right-Side-Item */}
          <div className={styles.card_2}>
            <Link href={url} passHref>
              <div className={styles.icon_text_wrapper}>
                <Text mr='.25rem' style={{ lineHeight: 0 }}>
                  {text}
                </Text>
                <DoubleArrowRightIcon />
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthHeader;
