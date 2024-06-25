import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Footer from '@components/common/Footer/Footer';
import MainHeader from '@components/common/Header/MainHeader';
import MenuBar from '@components/common/MenuBar/MenuBar';

import { ColorMainBackBule, ColorWhite } from '@utils/_Palette';

import { getFcmToken, onMessageListener } from '../../firebase';

import { useAlarmZuInfo } from '_store/AlarmInfo';

// import firebase from 'firebase';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setAlarmInfo } = useAlarmZuInfo((state) => state);
  function requestPermission() {
    console.log('권한 요청 중...');
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한이 허용됨');

          // FCM 메세지 처리
        } else {
          console.log('알림 권한 허용 안됨');
        }
      });
    }
  }
  requestPermission();

  onMessageListener()
    .then((payload) => {
      console.log('Message received. ', payload);
      setAlarmInfo({ alarm: true });
      // 여기서 알림을 표시하거나 상태를 업데이트할 수 있습니다.
    })
    .catch((err) => console.log('Failed to receive message: ', err));
  return (
    <Flex flexDirection={'row'} width={'100vw'} minH={'100vh'}>
      <MenuBar />
      <Flex
        flexDirection={'column'}
        bgColor={ColorMainBackBule}
        width="calc(100% - 340px)"
        justifyContent={'space-between'}
      >
        <Box>
          <MainHeader />
          <Box
            backgroundColor={ColorWhite}
            // m={'60px'}
            mx={'60px'}
            mb={'60px'}
            p={'60px'}
            borderRadius={'16px'}
          >
            {children}
          </Box>
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
}
