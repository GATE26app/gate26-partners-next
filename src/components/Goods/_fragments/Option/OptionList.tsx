import React, { memo, useState } from 'react';

import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';

import { GoodsBasicProps } from '@apis/goods/GoodsApi.type';

import CustomButton from '@components/common/CustomButton';
import InputBox from '@components/common/Input';

import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorMainBackBule,
  ColorWhite,
} from '@utils/_Palette';

import { Option } from './OptionPlus';

import { useGoodsStateZuInfo } from '_store/StateZuInfo';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  optionList: Option[];
  setOptionList: any;
}
function OptionList({ list, setList, optionList, setOptionList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [focus, setFocus] = useState(false);
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
      // setOptionList()
      optionList[index].stockCnt = Number(value);
    } else if (key == 'price') {
      optionList[index].price = Number(value);
    }
  };
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
        // {/* 헤더 */}
        <Flex
          bgColor={ColorMainBackBule}
          flexDirection={'row'}
          h={'60px'}
          w="100%"
        >
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
          {/* <Flex
            py={'20px'}
            w={'300px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRightColor={ColorGray400}
            borderRightWidth={1}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              {list.optionInputType == 0 ? '옵션명' : optionList[0].firstKey}
            </Text>
          </Flex>
          {list.optionInputType == 1 &&
          optionList[0].secondKey !== null &&
          optionList[0].secondKey !== '' ? (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
            >
              <Text
                fontSize={'16px'}
                fontWeight={700}
                color={ColorBlack}
                py={'20px'}
              >
                {optionList[0].secondKey}
              </Text>
            </Flex>
          ) : (
            <></>
          )}
          {list.optionInputType == 0 && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
            >
              <Text
                fontSize={'16px'}
                fontWeight={700}
                color={ColorBlack}
                py={'20px'}
              >
                {'옵션값'}
              </Text>
            </Flex>
          )}

          {optionList[0].thirdKey !== null && optionList[0].thirdKey !== '' && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                {optionList[0].thirdKey}
              </Text>
            </Flex>
          )} */}
          {optionList[0].price !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                가격
              </Text>
            </Flex>
          )}
          {optionList[0].stockCnt !== null && (
            <Flex
              w={'300px'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRightColor={ColorGray400}
              borderRightWidth={1}
              py={'20px'}
            >
              <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
                재고
              </Text>
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
      )}

      {/* 바디 */}
      <Flex bgColor={ColorWhite} flexDirection={'column'}>
        {optionList.length > 0 &&
          optionList.map((item: Option, index: number) => {
            return (
              <Flex
                flexDirection={'row'}
                borderTopColor={ColorGray400}
                borderTopWidth={1}
                key={index}
              >
                {optionList[0].useDateTime !== '' &&
                  optionList[0].useDateTime !== null && (
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRightWidth={1}
                      borderRightColor={ColorGray400}
                    >
                      <Editable
                        w={'100%'}
                        key={item.useDateTime.split(' ')[0]}
                        value={item.useDateTime.split(' ')[0]}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'useDateTime', e)
                        }
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput py={'17px'} color={ColorBlack} />
                      </Editable>
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
                      <Editable
                        w={'100%'}
                        key={item.firstValue}
                        value={item.firstValue}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'firstValue', e)
                        }
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput
                          py={'17px'}
                          color={ColorBlack}
                          disabled={goodsInfo.LogItemDisable}
                        />
                      </Editable>
                    </Flex>
                    {item.secondValue !== null && item.secondValue !== '' && (
                      <Flex
                        w={'300px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRightWidth={1}
                        borderRightColor={ColorGray400}
                      >
                        <Editable
                          w={'100%'}
                          key={item.secondValue}
                          value={item.secondValue}
                          textAlign={'center'}
                          fontSize={'15px'}
                          fontWeight={500}
                          isPreviewFocusable={false}
                          selectAllOnFocus={false}
                          isDisabled={goodsInfo.LogItemDisable}
                          onChange={(e) =>
                            handleInputChange(index, 'secondValue', e)
                          }
                        >
                          <EditablePreview py={'17px'} color={ColorGray700} />
                          <EditableInput
                            py={'17px'}
                            color={ColorBlack}
                            disabled={goodsInfo.LogItemDisable}
                          />
                        </Editable>
                      </Flex>
                    )}
                    {item.thirdValue !== null && item.thirdValue !== '' && (
                      <Flex
                        w={'300px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRightWidth={1}
                        borderRightColor={ColorGray400}
                      >
                        <Editable
                          w={'100%'}
                          key={item.thirdValue}
                          value={item.thirdValue}
                          textAlign={'center'}
                          fontSize={'15px'}
                          fontWeight={500}
                          isPreviewFocusable={false}
                          selectAllOnFocus={false}
                          isDisabled={goodsInfo.LogItemDisable}
                          onChange={(e) =>
                            handleInputChange(index, 'thirdValue', e)
                          }
                        >
                          <EditablePreview py={'17px'} color={ColorGray700} />
                          <EditableInput
                            py={'17px'}
                            color={ColorBlack}
                            disabled={goodsInfo.LogItemDisable}
                          />
                        </Editable>
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
                      <Editable
                        w={'100%'}
                        key={item.firstKey}
                        value={item.firstKey}
                        // value={item.firstKey}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) => {
                          handleInputChange(index, 'firstKey', e);
                        }}
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput py={'17px'} color={ColorBlack} />
                      </Editable>
                    </Flex>
                    <Flex
                      w={'300px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRightWidth={1}
                      borderRightColor={ColorGray400}
                    >
                      <Editable
                        w={'100%'}
                        key={item.firstValue}
                        value={item.firstValue}
                        textAlign={'center'}
                        fontSize={'15px'}
                        fontWeight={500}
                        isPreviewFocusable={false}
                        selectAllOnFocus={false}
                        isDisabled={goodsInfo.LogItemDisable}
                        onChange={(e) =>
                          handleInputChange(index, 'firstValue', e)
                        }
                      >
                        <EditablePreview py={'17px'} color={ColorGray700} />
                        <EditableInput
                          py={'17px'}
                          color={ColorBlack}
                          // disabled={goodsInfo.LogItemDisable}
                        />
                      </Editable>
                    </Flex>
                  </>
                )}

                {item.price !== null && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      key={item.price}
                      defaultValue={String(item.price)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      isDisabled={goodsInfo.LogItemDisable}
                      onChange={(e) => handleInputChange(index, 'price', e)}
                    >
                      <EditablePreview
                        py={'17px'}
                        color={ColorGray700}
                        width="full"
                      />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                        disabled={goodsInfo.LogItemDisable}
                      />
                    </Editable>
                  </Flex>
                )}
                {item.stockCnt !== null && (
                  <Flex
                    w={'300px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRightWidth={1}
                    borderRightColor={ColorGray400}
                  >
                    <Editable
                      w={'100%'}
                      defaultValue={String(item.stockCnt)}
                      textAlign={'center'}
                      fontSize={'15px'}
                      fontWeight={500}
                      key={item.stockCnt}
                      isPreviewFocusable={true}
                      selectAllOnFocus={false}
                      // isDisabled={goodsInfo.LogItemDisable}
                      onChange={(e) => handleInputChange(index, 'stockCnt', e)}
                    >
                      <EditablePreview
                        py={'17px'}
                        color={ColorGray700}
                        width="full"
                      />
                      <EditableInput
                        py={'17px'}
                        type="number"
                        color={ColorBlack}
                      />
                    </Editable>

                    {/* <InputBox
                      placeholder="예) 색상"
                      defaultValue={optionList[index].stockCnt}
                      disabled={goodsInfo.LogItemDisable}
                      onChange={(e) =>
                        handleInputChange(index, 'stockCnt', e.target.value)
                      }
                      // value={item.optionName}
                      // onChange={(e) => handleOptionValueChange(index, e.target.value)}
                    /> */}
                  </Flex>
                )}

                <Flex
                  w={'300px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <CustomButton
                    text="삭제하기"
                    fontSize="12px"
                    color={ColorGray700}
                    bgColor={ColorGray100}
                    borderColor={ColorInputBorder}
                    px="15px"
                    py="7.5px"
                    borderRadius="6px"
                    disabled={goodsInfo.LogItemDisable}
                    onClick={() => onDeleteOption(index)}
                  />
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default memo(OptionList);