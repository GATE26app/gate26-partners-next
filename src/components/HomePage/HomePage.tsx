import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

import { Box, BoxProps, Text } from '@chakra-ui/react';

import { getToken } from '@utils/localStorage/token';

import { useUserZuInfo } from '_store/UserZuInfo';
import MainLayout from 'layout/MainLayout';
import RootLayout from 'layout/layout';

function HomePageContent() {
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

  useEffect(() => {
    if (
      userZuInfo.accessToken == '' ||
      userZuInfo.accessToken == undefined ||
      userZuInfo.accessToken == null
    ) {
      router.replace('/login');
    } else {
      router.push('/orderlist');
    }
  }, []);

  return <Box>{/* <Text>test</Text> */}</Box>;
}

// HomePageContent.getLayout = function getLayout(page: ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };
export default HomePageContent;
