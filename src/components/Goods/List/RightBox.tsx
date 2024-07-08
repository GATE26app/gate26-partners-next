import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

interface Props {
  filter_3: number;
  setFilter_3: React.Dispatch<React.SetStateAction<number>>;
}
function RightBox({ filter_3, setFilter_3 }: Props) {
  return (
    <Box w={'50%'}>
      <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
        판매상태
      </Text>
      <Flex>
        <Box
          bgColor={filter_3 == 1 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_3 == 1 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          mr={'10px'}
          cursor={'pointer'}
          onClick={() => setFilter_3(1)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={filter_3 == 1 ? ColorWhite : ColorGray700}
            lineHeight={'15px'}
          >
            전체
          </Text>
        </Box>
        <Box
          bgColor={filter_3 == 2 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_3 == 2 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          mr={'10px'}
          cursor={'pointer'}
          onClick={() => setFilter_3(2)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            lineHeight={'15px'}
            color={filter_3 == 2 ? ColorWhite : ColorGray700}
          >
            판매
          </Text>
        </Box>
        <Box
          bgColor={filter_3 == 3 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_3 == 3 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          mr={'10px'}
          cursor={'pointer'}
          onClick={() => setFilter_3(3)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={filter_3 == 3 ? ColorWhite : ColorGray700}
            lineHeight={'15px'}
          >
            판매안함
          </Text>
        </Box>
        <Box
          bgColor={filter_3 == 4 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_3 == 4 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          mr={'10px'}
          cursor={'pointer'}
          onClick={() => setFilter_3(4)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            lineHeight={'15px'}
            color={filter_3 == 4 ? ColorWhite : ColorGray700}
          >
            품절
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default RightBox;
