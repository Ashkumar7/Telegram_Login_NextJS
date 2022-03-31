import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import AuthHeader from '../components/Auth/Header';
import RegisterComponent from '@components/Auth/Register';
import Footer from '@components/Footer';

const Home: NextPage = () => {
  return (
    <div className='main_wrapper'>
      <Head>
        <title>UniqueHub | Register</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/svg/thryssa_logo.jpg' />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AuthHeader url='/' text='Login Now' />
        <RegisterComponent />
        <Footer />
      </div>
    </div>
  );
};

export default Home;