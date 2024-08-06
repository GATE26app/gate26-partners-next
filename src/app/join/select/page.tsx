'use client';
import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue100,
  ColorGray50,
  ColorRed,
  ColorRed50,
} from '@/utils/_Palette';
import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const router = useRouter();
  return (
    <Flex
      bgColor={ColorGray50}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'calc(100vh - 323px)'}
    >
      <Text
        fontWeight={700}
        fontSize={'40px'}
        color={ColorBlack}
        pb={'64px'}
        // pt={'137px'}
      >
        회원가입
      </Text>
      <Flex flexDirection={'row'} gap={'30px'}>
        <Flex
          bgColor={ColorRed50}
          flexDirection={'column'}
          alignItems={'center'}
          pt={'54px'}
          pb={'39px'}
          px={'76px'}
          borderRadius={'10px'}
          cursor={'pointer'}
          onClick={() => router.push('/join?type=1')}
        >
          <Image
            src="/images/Page/icon_in.png"
            width={110}
            height={110}
            alt="이미지"
          />
          <Text color={ColorRed} fontWeight={700} fontSize={'22px'} pt={'20px'}>
            국내 사업자
          </Text>
          <Text color={ColorRed} fontWeight={700} fontSize={'22px'} pb={'20px'}>
            회원가입
          </Text>
          <Image
            src="/images/Page/icon_arrow_red.png"
            width={35}
            height={35}
            alt="화살표"
          />
        </Flex>
        <Flex
          bgColor={COlorBlueSucces}
          flexDirection={'column'}
          alignItems={'center'}
          pt={'54px'}
          pb={'39px'}
          px={'76px'}
          borderRadius={'10px'}
          cursor={'pointer'}
          onClick={() => router.push('/join?type=2')}
        >
          <Image
            src={'/images/Page/icon_out.png'}
            width={110}
            height={110}
            alt="이미지"
          />
          <Text
            color={ColorBlue100}
            fontWeight={700}
            fontSize={'22px'}
            pt={'20px'}
          >
            해외 사업자
          </Text>
          <Text
            color={ColorBlue100}
            fontWeight={700}
            fontSize={'22px'}
            pb={'20px'}
          >
            회원가입
          </Text>
          <Image
            src={'/images/Page/icon_arrow_blue.png'}
            width={35}
            height={35}
            alt="화살표"
            // alt=""
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default page;
