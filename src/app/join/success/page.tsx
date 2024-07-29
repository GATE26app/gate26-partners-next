'use client';
import {
  ColorBlack,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../../public/joinSuccess.json';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  return (
    <Flex
      width="100vw"
      backgroundColor={ColorGray50}
      height={'calc(100vh - 323px)'}
      pt={'150px'}
      // height={'100%'}
      pb={'170px'}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w={'568px'}
        bgColor={ColorWhite}
        borderRadius={'16px'}
        px={'70px'}
        py={'70px'}
        borderColor={ColorGray400}
        borderWidth={1}
        boxShadow={'3px 6px 20px #3737370D'}
        alignItems="center"
        flexDirection={'column'}
      >
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 234, height: 234 }}
        />
        <Text fontWeight={700} fontSize={'28px'} color={ColorBlack}>
          회원가입완료
        </Text>
        <Text fontWeight={700} fontSize={'16px'} color={ColorGray700}>
          관리자에게 승인요청을 완료했습니다.
        </Text>
        <Text fontWeight={700} fontSize={'16px'} color={ColorGray700}>
          잠시만 기다려주세요.
        </Text>

        <Flex
          w={'100%'}
          bgColor={ColorRed}
          borderRadius={'10px'}
          h={'50px'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'30px'}
          cursor={'pointer'}
          onClick={() => router.replace('/login')}
        >
          <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
            확인
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default page;
