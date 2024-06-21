import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import CustomButton from '@components/common/CustomButton';
import SearchInput from '@components/common/SearchInput';
import SelectBox from '@components/common/SelectBox';

import {
  ColorBlack,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';

interface Props {
  filter_1: number;
  filter_2: number;
  search: string;
  setFilter_1: React.Dispatch<React.SetStateAction<number>>;
  setFilter_2: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
function LeftBox({
  filter_1,
  filter_2,
  setFilter_1,
  setFilter_2,
  search,
  setSearch,
}: Props) {
  const [searchSelect, setSearchSelect] = useState('');
  const searchSelectList = ['상품코드', '상품명', '상품카테고리'];
  return (
    <Box w={'50%'} mr={'15px'}>
      <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
        상품승인
      </Text>
      <Flex mb={'30px'} gap={'10px'} flexWrap={'wrap'}>
        <CustomButton
          px={'14px'}
          py={'11px'}
          borderColor={filter_1 == 1 ? ColorRed : ColorInputBorder}
          bgColor={filter_1 == 1 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          text="전체"
          fontSize={'15px'}
          color={filter_1 == 1 ? ColorWhite : ColorGray700}
        />
        <CustomButton
          px={'14px'}
          py={'11px'}
          borderColor={filter_1 == 2 ? ColorRed : ColorInputBorder}
          bgColor={filter_1 == 2 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          text="대기"
          fontSize={'15px'}
          color={filter_1 == 2 ? ColorWhite : ColorGray700}
        />
        <CustomButton
          px={'14px'}
          py={'11px'}
          borderColor={filter_1 == 2 ? ColorRed : ColorInputBorder}
          bgColor={filter_1 == 2 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          text="승인"
          fontSize={'15px'}
          color={filter_1 == 2 ? ColorWhite : ColorGray700}
        />
        <CustomButton
          px={'14px'}
          py={'11px'}
          borderColor={filter_1 == 2 ? ColorRed : ColorInputBorder}
          bgColor={filter_1 == 2 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          text="반려"
          fontSize={'15px'}
          color={filter_1 == 2 ? ColorWhite : ColorGray700}
        />
        <CustomButton
          px={'14px'}
          py={'11px'}
          borderColor={filter_1 == 2 ? ColorRed : ColorInputBorder}
          bgColor={filter_1 == 2 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          text="임시저장"
          fontSize={'15px'}
          color={filter_1 == 2 ? ColorWhite : ColorGray700}
        />
      </Flex>
      <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
        상품노출
      </Text>
      <Flex mb={'30px'} gap={'10px'} flexWrap={'wrap'}>
        <Box
          bgColor={filter_2 == 1 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_2 == 1 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          cursor={'pointer'}
          onClick={() => setFilter_2(1)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={filter_2 == 1 ? ColorWhite : ColorGray700}
            lineHeight={'15px'}
          >
            전체
          </Text>
        </Box>
        <Box
          bgColor={filter_2 == 2 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_2 == 2 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          cursor={'pointer'}
          onClick={() => setFilter_2(2)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={filter_2 == 2 ? ColorWhite : ColorGray700}
            lineHeight={'15px'}
          >
            노출
          </Text>
        </Box>
        <Box
          bgColor={filter_2 == 3 ? ColorRed : ColorWhite}
          borderRadius={'10px'}
          borderWidth={1}
          borderColor={filter_2 == 3 ? ColorRed : ColorInputBorder}
          py={'11px'}
          px={'14px'}
          cursor={'pointer'}
          onClick={() => setFilter_2(3)}
        >
          <Text
            fontSize={'15px'}
            fontWeight={400}
            color={filter_2 == 3 ? ColorWhite : ColorGray700}
            lineHeight={'15px'}
          >
            노출안함
          </Text>
        </Box>
      </Flex>

      <Text fontSize={'16px'} fontWeight={700} color={ColorBlack} mb={'10px'}>
        통합검색
      </Text>
      <Flex gap={'10px'}>
        <Box width={'190px'}>
          <SelectBox
            placeholder="검색분류선택"
            width={'190px'}
            list={searchSelectList}
            select={searchSelect}
            setSelect={setSearchSelect}
          />
        </Box>
        <SearchInput
          text={search}
          onChange={(e) => setSearch(e)}
          placeholder="검색어를 입력해주세요."
        />
      </Flex>
    </Box>
  );
}

export default LeftBox;
