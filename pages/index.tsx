import type { NextPage } from 'next';
import Head from 'next/head';
import AuthHeader from '@components/Auth/Header';
import LoginComponent from '@components/Auth/Login';
import Footer from '@components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import PageSpinner from '@components/Utility/PageSpinner';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  /** Authentication Check */
  useEffect(() => {
    if (status !== 'loading' && session) {
      router.push('/dashboard');
    }
    if (status !== 'loading' && status == 'unauthenticated') {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  /** Spinner While Authentication Check */
  if (loading) return <PageSpinner />;

  return (
    <div className='main_wrapper'>
      <Head>
        <title>Login</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/web_icon.svg' />
      </Head>

      <div className='container_wrapper'>
        <AuthHeader url='/register' text='Register Now' />
        <LoginComponent />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
