'use client';
import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

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
        <Text fontWeight={700} fontSize={'28px'} color={ColorBlack}>
          회원가입 반려
        </Text>
        <Flex
          bgColor={ColorGray100}
          borderRadius={'10px'}
          px={'50px'}
          py={'30px'}
          mt={'35px'}
        >
          <Text
            fontWeight={700}
            fontSize={'16px'}
            color={ColorRed}
            textAlign={'center'}
          >
            반려사유가 노출됩니다. 반려사유가 노출됩니다. 반려사유가 노출됩니다.
          </Text>
        </Flex>

        <Flex flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
          <Flex
            w={'67%'}
            bgColor={ColorRed}
            borderRadius={'10px'}
            h={'50px'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={'30px'}
            cursor={'pointer'}
            onClick={() => router.back()}
          >
            <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
              다시 회원가입하기
            </Text>
          </Flex>
          <Flex
            w={'30%'}
            bgColor={ColorWhite}
            borderWidth={1}
            borderColor={ColorGray400}
            borderRadius={'10px'}
            h={'50px'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={'30px'}
            cursor={'pointer'}
            onClick={() => router.replace('/login')}
          >
            <Text color={ColorBlack} fontWeight={800} fontSize={'16px'}>
              확인
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default page;
