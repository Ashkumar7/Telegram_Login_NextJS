import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../index.scss';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { theme } from 'theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
