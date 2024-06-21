import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { ColorBlack, ColorGray50, ColorGray700 } from '@utils/_Palette';

function OrderState() {
  return (
    <Flex flexDirection={'row'} mt={'30px'} gap={'10px'}>
      <Flex
        w={'25%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        bgColor={ColorGray50}
        p={'20px'}
        borderRadius={'12px'}
      >
        <Text color={ColorGray700} fontWeight={600} fontSize={'16px'}>
          결제완료
        </Text>
        <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
          1000
        </Text>
      </Flex>
      <Flex
        w={'25%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        bgColor={ColorGray50}
        p={'20px'}
        borderRadius={'12px'}
      >
        <Text color={ColorGray700} fontWeight={600} fontSize={'16px'}>
          예약확정
        </Text>
        <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
          1000
        </Text>
      </Flex>
      <Flex
        w={'25%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        bgColor={ColorGray50}
        p={'20px'}
        borderRadius={'12px'}
      >
        <Text color={ColorGray700} fontWeight={600} fontSize={'16px'}>
          이용일
        </Text>
        <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
          1000
        </Text>
      </Flex>
      <Flex
        w={'25%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        bgColor={ColorGray50}
        p={'20px'}
        borderRadius={'12px'}
      >
        <Text color={ColorGray700} fontWeight={600} fontSize={'16px'}>
          이용완료
        </Text>
        <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
          1000
        </Text>
      </Flex>
      <Flex
        w={'25%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        bgColor={ColorGray50}
        p={'20px'}
        borderRadius={'12px'}
      >
        <Text color={ColorGray700} fontWeight={600} fontSize={'16px'}>
          취소
        </Text>
        <Text color={ColorBlack} fontWeight={600} fontSize={'16px'}>
          1000
        </Text>
      </Flex>
    </Flex>
  );
}

export default OrderState;
