import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../index.module.scss';
import { NumberInput, Button, Text, Container, Popover, Group, ActionIcon, Anchor } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { CheckIcon, Cross2Icon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { Switch, Case, Default } from 'react-if';
import Verification from './Verification';

const MainComponent = () => {
  const [isVerification, setIsVerification] = useState<{ status: boolean; value: number | null }>({
    status: false,
    value: null,
  });
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const notifications = useNotifications();

  const form = useForm<{ telegramId: number | null }>({
    initialValues: {
      telegramId: null,
    },
  });

  /**
   * Send UID Based On Successful Submission
   * @param values
   * @returns notifications
   */
  const submitHandler = async (values: { telegramId: number | null }) => {
    // Set Button Loading
    setLoading(true);

    const res = await fetch('/api/sendUID', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    });

    const { success, response } = await res.json();

    // Stop Loading
    setLoading(false);

    // Send Success Notification
    if (success) {
      /** Ask For Verification */
      setIsVerification({ status: true, value: values.telegramId });

      return notifications.showNotification({
        title: (
          <Text size='md' weight={500}>
            UniqueID Generated Successfully..
          </Text>
        ),
        message: response,
        icon: <CheckIcon />,
        color: 'teal',
      });
    }

    return notifications.showNotification({
      title: (
        <Text size='md' weight={500}>
          UniqueID Not Generated.
        </Text>
      ),
      message: response,
      icon: <Cross2Icon />,
      color: 'red',
    });
  };

  return (
    <div className={styles.login_component_section}>
      <div className={styles.login_component_wrapper}>
        <Container size={1280}>
          <div className={styles.card_wrapper}>
            <Switch>
              <Case condition={isVerification.status}>
                <Verification telegramId={isVerification.value} />
              </Case>
              <Default>
                <div className={styles.card_1}>
                  <Image alt='Telegram Icon by Kalash' src='/svg/telegram.svg' width={70} height={70} />
                  <Group>
                    <Text size='lg' m='1.5rem 0rem'>
                      Login With Your TelegramID
                    </Text>
                    <Popover
                      opened={opened}
                      onClose={() => setOpened(false)}
                      target={
                        <ActionIcon variant='outline' radius={'lg'} size={'lg'} onClick={() => setOpened((o) => !o)}>
                          <OpenInNewWindowIcon />
                        </ActionIcon>
                      }
                      width={260}
                      position='bottom'
                      withArrow>
                      <div style={{ display: 'flex' }}>
                        <Text size='sm'>
                          Start The Bot To Recieve UniqueCode.{' '}
                          <Anchor href='https://t.me/FrankensteinTheExecutioner_Bot' target='_blank'>
                            Start Now!
                          </Anchor>
                        </Text>
                      </div>
                    </Popover>
                  </Group>
                </div>
                <div className={styles.card_2}>
                  <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
                    <NumberInput
                      hideControls
                      placeholder='Enter Your ID'
                      size='md'
                      required
                      {...form.getInputProps('telegramId')}
                    />
                    <Button type='submit' variant='filled' size='md' loading={loading}>
                      <Text weight={300}>Generate Now</Text>
                    </Button>
                  </form>
                </div>
              </Default>
            </Switch>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MainComponent;
