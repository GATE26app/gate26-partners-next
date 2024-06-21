import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import Footer from '@components/common/Footer/Footer';
import MainHeader from '@components/common/Header/MainHeader';
import MenuBar from '@components/common/MenuBar/MenuBar';

import { ColorMainBackBule, ColorWhite } from '@utils/_Palette';

export default function GoodsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roter = useRouter();

  return (
    <Flex flexDirection={'row'} width={'100vw'} h={'100%'}>
      <MenuBar />
      <Flex
        flexDirection={'column'}
        bgColor={ColorMainBackBule}
        width="calc(100% - 340px)"
      >
        <MainHeader />
        <Box mx={'60px'} mb={'60px'}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
}
