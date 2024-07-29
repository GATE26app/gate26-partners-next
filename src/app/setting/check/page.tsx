import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
function page() {
  return (
    <Box w={'100%'} minH={'calc(100vh - 501px)'}>
      <Flex alignItems={'center'} mb={'26px'}>
        <Image
          src={'/images/Page/ico_setting.png'}
          width={'20px'}
          height={'20px'}
          alt="주문관리"
        />
        <Text
          fontWeight={800}
          fontSize={'22px'}
          color={ColorBlack00}
          pl={'10px'}
        >
          설정
        </Text>
      </Flex>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        minH={'calc(100vh - 600px)'}
      >
        <Flex
          borderRadius={'16px'}
          borderWidth={1}
          borderColor={ColorGray400}
          p={'70px'}
          flexDirection={'column'}
        >
          <Text
            color={ColorBlack}
            fontWeight={700}
            fontSize={'24px'}
            mb={'28px'}
          >
            회원정보 확인
          </Text>
          <Flex>
            <InputBox w={'320px'} placeholder="비밀번호 입력" mr={'10px'} />
            <CustomButton
              text="확인"
              fontSize="15px"
              color={ColorRed}
              borderColor={ColorRed}
              bgColor={ColorWhite}
              px="42px"
              py="12px"
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default page;
