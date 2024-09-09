import { ColorGray400, ColorRed, ColorWhite } from '@/utils/_Palette';
import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function JoinHeader() {
  const router = useRouter();
  return (
    <>
      <Flex
        py={'25px'}
        pl={'140px'}
        alignItems={'center'}
        cursor={'pointer'}
        position={'sticky'}
        bgColor={ColorWhite}
        top={'0px'}
        zIndex={999}
        borderBottomColor={ColorGray400}
        borderBottomWidth={1}
        boxShadow={'0px 3px 6px #00000008'}
      >
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          onClick={() => router.replace('/login')}
        >
          <Image
            src={'/images/header/icon_logo_big.png'}
            width={185}
            height={41}
            alt="로고"
            priority={true}
          />
          <Box
            bgColor={'rgba(255,223,219,0.38)'}
            borderRadius={'11px'}
            px={'6px'}
            py={'2px'}
            ml={'15px'}
          >
            <Text fontSize={'13px'} fontWeight={600} color={ColorRed}>
              파트너스
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default JoinHeader;
