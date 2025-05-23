import React, { memo, useEffect, useState } from 'react';

import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text
} from '@chakra-ui/react';

import { GoodsBasicProps } from '@/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import {
  ColorBackBlue,
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorMainBackBule,
  ColorRedOpa,
  ColorWhite,
} from '@/utils/_Palette';

import { Option } from './OptionPlus';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import VirtualizedOptionList from '@/components/Goods/Option/OptionListRow';

dayjs.locale('ko');
interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  optionList: Option[];
  setOptionList: any;
}
function OptionList({ list, setList, optionList, setOptionList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [focus, setFocus] = useState(false);
  const [stock, setStock] = useState('');
  const [price, setprice] = useState('');
  const [stockState, setStockState] = useState(false);
  const [priceState, setPriceState] = useState(false);
  const [indexCnt, setIndexCnt] = useState(0);
  const [bulkOptionPrice, setBulkOptionPrice] = useState(0);
  const [bulkStockCnt, setBulkStockCnt] = useState(0);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const onDeleteOption = (id: number) => {
    setOptionList(
      optionList.filter((item: Option, index: number) => index !== id),
    );
  };

  const handleInputChange = (index: number, key: string, value: string) => {
    if (key == 'useDateTime') {
      optionList[index].useDateTime = value;
    } else if (key == 'firstKey') {
      optionList[index].firstKey = value;
    } else if (key == 'firstValue') {
      optionList[index].firstValue = value;
    } else if (key == 'secondKey') {
      optionList[index].secondKey = value;
    } else if (key == 'secondValue') {
      optionList[index].secondValue = value;
    } else if (key == 'thirdKey') {
      optionList[index].thirdKey = value;
    } else if (key == 'thirdValue') {
      optionList[index].thirdValue = value;
    } else if (key == 'stockCnt') {
      let updateItem = optionList.map((item) =>
        item.sort === index + 1 ? { ...item, stockCnt: Number(stock) } : item,
      );
      setOptionList(updateItem);
    } else if (key == 'price') {
      let updateItem = optionList.map((item) =>
        item.sort === index + 1 ? { ...item, price: Number(price) } : item,
      );
      setOptionList(updateItem);
    }
  };

  const handleBulkOptionPriceChange = () => {
    if (bulkOptionPrice > -1) {
      console.log(optionList);
      let updatedOptionList = optionList.map((option, index) => ({
        ...option,
        price: selectedRows.includes(index)
          ? Number(bulkOptionPrice)
          : option.price,
      }));

      setOptionList(updatedOptionList);
    }
  };

  const handleBulkStockCntChange = () => {
    if (bulkStockCnt > -1) {
      console.log(optionList);
      let updatedOptionList = optionList.map((option, index) => ({
        ...option,
        stockCnt: selectedRows.includes(index)
          ? Number(bulkStockCnt)
          : option.stockCnt,
      }));
      setOptionList(updatedOptionList);
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(optionList.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    if (stockState) {
      let updateItem = optionList.map((item) =>
        item.sort === indexCnt + 1
          ? { ...item, stockCnt: Number(stock) }
          : item,
      );
      setOptionList(updateItem);
      setStockState(false);
    }
    if (priceState) {
      let updateItem = optionList.map((item) =>
        item.sort === indexCnt + 1 ? { ...item, price: Number(price) } : item,
      );
      setOptionList(updateItem);
      setPriceState(false);
    }
  }, [stockState, priceState]);

  return (
    <Flex
      borderRadius={'12px'}
      borderColor={ColorGray400}
      borderWidth={1}
      mt={'30px'}
      overflow={'hidden'}
      flexDirection={'column'}
    >
      {optionList.length > 0 && (
        // {/* 헤더 */ }
        <Flex
          bgColor={ColorMainBackBule}
          flexDirection={'row'}
          h={'100px'}
          w="100%"
          overflowY={optionList.length > 10 ? 'scroll' : 'hidden'}
        >
          <Checkbox
            mx="2"
            onChange={handleSelectAll}
            isChecked={selectedRows.length === optionList.length}
            isIndeterminate={
              selectedRows.length > 0 && selectedRows.length < optionList.length
            }
          />
          {/* 이하 기존 코드 구조 유지 */}
          {/* 기존 Flex, Editable 및 기타 컴포넌트 추가 위치 */}
          {optionList[0].useDateTime !== '' &&
            optionList[0].useDateTime !== null && (
              <Flex
                py={'20px'}
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightColor={ColorGray400}
                borderRightWidth={1}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  날짜
                </Text>
              </Flex>
            )}
          {/* 옵션타입 optionInputType 0=> 단독형 1 =>조합형 */}
          {list.optionInputType == 1 ? (
            <>
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightWidth={1}
                borderRightColor={ColorGray400}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  {optionList[0].firstKey}
                </Text>
              </Flex>
              {optionList[0].secondKey !== null &&
                optionList[0].secondKey !== '' && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                      {optionList[0].secondKey}
                    </Text>
                  </Flex>
                )}
              {optionList[0].thirdKey !== null &&
                optionList[0].thirdKey !== '' && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                      {optionList[0].thirdKey}
                    </Text>
                  </Flex>
                )}
            </>
          ) : (
            <>
              {/* 단독형 */}
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightWidth={1}
                borderRightColor={ColorGray400}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  옵션명
                </Text>
              </Flex>
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightWidth={1}
                borderRightColor={ColorGray400}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  옵션값
                </Text>
              </Flex>
            </>
          )}
          {optionList[0].price !== null && (
            <>
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightColor={ColorGray400}
                borderRightWidth={1}
                py={'20px'}
                flexDir="column"
              >
                <Text
                  fontSize={'16px'}
                  fontWeight={700}
                  color={ColorBlack}
                  mb="5px"
                >
                  옵션가
                </Text>
                <Flex w="90%">
                  <InputBox
                    placeholder="숫자입력"
                    type="text"
                    maxLength={8}
                    value={bulkOptionPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setBulkOptionPrice(+e.target.value);
                    }}
                    textAlign="center"
                    w="60%"
                  />
                  <CustomButton
                    text="일괄적용"
                    fontSize="14px"
                    color={ColorGray700}
                    bgColor={ColorGray100}
                    borderColor={ColorInputBorder}
                    borderRadius="6px"
                    w="40%"
                    textAlign="center"
                    onClick={() => handleBulkOptionPriceChange()}
                  />
                </Flex>
              </Flex>
              <Flex
                w={'300px'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRightColor={ColorGray400}
                borderRightWidth={1}
                py={'20px'}
              >
                <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                  판매가격 (기본가 + 옵션가)
                </Text>
              </Flex>
            </>
          )}
          {optionList[0].stockCnt !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
              flexDir="column"
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                재고
              </Text>
              <Flex w="90%">
                <InputBox
                  placeholder="숫자입력"
                  type="text"
                  maxLength={4}
                  value={bulkStockCnt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBulkStockCnt(+e.target.value);
                  }}
                  textAlign="center"
                  w="60%"
                />
                <CustomButton
                  text="일괄적용"
                  fontSize="14px"
                  color={ColorGray700}
                  bgColor={ColorGray100}
                  borderColor={ColorInputBorder}
                  borderRadius="6px"
                  w="40%"
                  textAlign="center"
                  onClick={() => handleBulkStockCntChange()}
                />
              </Flex>
            </Flex>
          )}

          <Flex
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            // borderLeftColor={ColorGray400}
            // borderLeftWidth={1}
            py={'20px'}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              삭제
            </Text>
          </Flex>
        </Flex>
      )
      }

      {/* 바디 */}
      <Flex bgColor={ColorWhite} flexDirection={'column'}>
        {optionList.length > 0 &&
          <VirtualizedOptionList
            optionList={optionList}
            selectedRows={selectedRows}
            handleSelectRow={handleSelectRow}
            handleInputChange={handleInputChange}
            onDeleteOption={onDeleteOption}
            list={list}
            goodsInfo={goodsInfo}
            setIndexCnt={setIndexCnt}
            setprice={setprice}
            setPriceState={setPriceState}
            setStock={setStock}
            setStockState={setStockState}
          />
        }
      </Flex>
    </Flex >
  );
}

export default memo(OptionList);
