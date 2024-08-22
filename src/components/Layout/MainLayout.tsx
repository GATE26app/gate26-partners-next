import { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Footer from '@/components/common/Footer/Footer';
import MainHeader from '@/components/common/Header/MainHeader';
import MenuBar from '@/components/common/MenuBar/MenuBar';

import { ColorMainBackBule, ColorWhite } from '@/utils/_Palette';
import { getToken } from '@/utils/localStorage/token';

import { useUserZuInfo } from '@/_store/UserZuInfo';
import { useRouter } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

  useEffect(() => {
    if (
      getToken().access == '' ||
      getToken().access == undefined ||
      getToken().access == null
    ) {
      router.replace('/login');
    }
  }, []);
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
