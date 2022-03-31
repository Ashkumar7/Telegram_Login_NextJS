import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import { Container, TextInput, NumberInput, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

type InitialValuesType = {
  fullName: string;
  email: string;
  telegramId: number | null;
};

const RegisterComponent = () => {
  const router = useRouter();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);

  const form = useForm<InitialValuesType>({
    initialValues: {
      fullName: '',
      email: '',
      telegramId: null,
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const submitHandler = async (values: InitialValuesType) => {
    /** Start Button Loading */
    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    });

    const { response } = await res.json();

    if (res.status == 200) {
      // Send User To Login Page
      router.replace('/');
      // Send Success Notification
      return notifications.showNotification({
        title: (
          <Text size='md' weight={500}>
            Signup Successfully Completed.
          </Text>
        ),
        message: response,
        icon: <CheckIcon />,
        color: 'teal',
      });
    }

    /** Stop Button Loading */
    setLoading(false);

    // Send Error Notification
    return notifications.showNotification({
      title: (
        <Text size='md' weight={500}>
          Signup Unsuccessful.
        </Text>
      ),
      message: response,
      icon: <Cross2Icon />,
      color: 'red',
    });
  };

  return (
    <div className={styles.register_component_section}>
      <div className={styles.register_component_wrapper}>
        <Container size={1280}>
          <div className={styles.card_wrapper}>
            <div className={styles.card_1}>
              <Image alt='Telegram Icon by Kalash' src='/svg/telegram.svg' width={70} height={70} />
              <Text size='md' m='1.5rem 0rem'>
                Register Now Using TelegramID
              </Text>
            </div>
            <div className={styles.card_2}>
              <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
                <TextInput
                  size='md'
                  placeholder='Enter Your Name'
                  label='Name'
                  required
                  {...form.getInputProps('fullName')}
                />
                <TextInput
                  size='md'
                  placeholder='Enter Your Email'
                  label='Email'
                  required
                  {...form.getInputProps('email')}
                />
                <NumberInput
                  hideControls
                  size='md'
                  placeholder='Enter Your ID'
                  label='TelegramID'
                  required
                  {...form.getInputProps('telegramId')}
                />
                <Button type='submit' loading={loading} variant='filled' size='md'>
                  <Text weight={300}>Sign Up</Text>
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RegisterComponent;
