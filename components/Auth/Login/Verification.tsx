import React, { useState } from 'react';
import styles from '../index.module.scss';
import Image from 'next/image';
import { Button, NumberInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/router';

const Verification: React.FC<{ telegramId: number | null }> = ({ telegramId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useNotifications();

  const form = useForm<{ telegramId: number | null; uniqueId: string }>({
    initialValues: {
      telegramId,
      uniqueId: '',
    },
  });

  const submitHandler = async (values: { telegramId: number | null; uniqueId: string }) => {
    /** Start Button Loading */
    setIsLoading(true);

    /** SignIn */
    const result: SignInResponse | undefined = await signIn('credentials', {
      redirect: false,
      telegramId: values.telegramId,
      uniqueId: values.uniqueId,
    });

    if (result && result['error']) {
      /** Stop Button Loading */
      setIsLoading(false);

      /** Show Error Notification */
      return notifications.showNotification({
        title: (
          <Text size='md' weight={500}>
            Login Failed.
          </Text>
        ),
        message: result['error'],
        icon: <Cross2Icon />,
        color: 'red',
      });
    }

    /** Send User To Dashboard */
    router.replace('/dashboard');

    /** Show Success Notification */
    return notifications.showNotification({
      title: (
        <Text size='md' weight={500}>
          Login Successful.
        </Text>
      ),
      message: null,
      icon: <CheckIcon />,
      color: 'teal',
    });
  };

  return (
    <>
      <div className={styles.card_1}>
        <Image alt='Telegram Icon by Kalash' src='/svg/telegram.svg' width={70} height={70} />
        <Text weight='400' size='lg' m='1.5rem 0rem'>
          UniqueID Verification
        </Text>
      </div>
      <div className={styles.card_2}>
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
          <NumberInput
            defaultValue={telegramId!}
            disabled
            size='md'
            hideControls
            required
            {...form.getInputProps('telegramId')}
          />
          <TextInput placeholder='Enter Your UniqueID' size='md' required {...form.getInputProps('uniqueId')} />
          <Button loading={isLoading} type='submit' variant='filled' size='md'>
            <Text weight={300}>Submit Now</Text>
          </Button>
        </form>
      </div>
    </>
  );
};

export default Verification;
