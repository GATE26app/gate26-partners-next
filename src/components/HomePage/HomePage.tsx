import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

import { Box, BoxProps, Text } from '@chakra-ui/react';

import { getToken } from '@utils/localStorage/token';

import MainLayout from 'layout/MainLayout';
import RootLayout from 'layout/layout';

// import { getNickName } from '@utils/localStorage/token';

// interface HomePageContentProps extends BoxProps {}

// function HomePageContent({ ...basisProps }: HomePageContentProps) {
//   return <Box {...basisProps}>Hello World</Box>;
// }

function HomePageContent() {
  const router = useRouter();
  useEffect(() => {
    if (
      getToken().access == '' &&
      getToken().access == undefined &&
      getToken().access == null
    ) {
      router.push('/login');
    } else {
      router.push('/goodslist');
    }
  }, []);

  // useEffect(() => {
  //   async function fetchToken() {
  //     const token = await getFcmToken();
  //     if (token) {
  //       console.log('FCM Token:', token);
  //       // 여기서 FCM 토큰을 서버로 전송하여 저장할 수 있습니다.
  //     }
  //   }

  //   fetchToken();

  //   onMessageListener()
  //     .then((payload) => {
  //       console.log('Message received. ', payload);
  //       // 여기서 알림을 표시하거나 상태를 업데이트할 수 있습니다.
  //     })
  //     .catch((err) => console.log('Failed to receive message: ', err));
  // }, []);

  return <Box>{/* <Text>test</Text> */}</Box>;
}

HomePageContent.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default HomePageContent;
