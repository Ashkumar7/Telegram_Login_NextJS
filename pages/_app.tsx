import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../index.scss';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { theme } from 'customTheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <SessionProvider session={pageProps.session}>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </SessionProvider>
    </MantineProvider>
  );
}

export default MyApp;
