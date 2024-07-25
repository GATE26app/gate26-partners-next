import React from 'react';
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

import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
function FindIdSuccessComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getId = searchParams.get('id');
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
        <Text fontWeight={700} fontSize={'28px'} color={ColorBlack} pb={'30px'}>
          아이디 찾기 완료
        </Text>
        <Text fontWeight={700} fontSize={'22px'} color={ColorBlack} pb={'20px'}>
          회원님의 아이디
        </Text>
        <Flex
          bgColor={ColorGray100}
          borderRadius={'10px'}
          py={'40px'}
          w={'100%'}
          justifyContent={'center'}
        >
          <Text color={ColorRed} fontWeight={700} fontSize={'16px'}>
            {getId}
          </Text>
        </Flex>
        <Flex
          w={'100%'}
          bgColor={ColorRed}
          borderRadius={'10px'}
          h={'50px'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'40px'}
          cursor={'pointer'}
          onClick={() => router.back()}
        >
          <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
            로그인
          </Text>
        </Flex>
        <Flex
          w={'100%'}
          borderWidth={1}
          borderColor={ColorGray400}
          bgColor={ColorWhite}
          borderRadius={'10px'}
          h={'50px'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'10px'}
          cursor={'pointer'}
          onClick={() => router.back()}
        >
          <Text color={ColorBlack} fontWeight={800} fontSize={'16px'}>
            비밀번호 찾기
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default FindIdSuccessComponent;
