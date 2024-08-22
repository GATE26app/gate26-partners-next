import { ProfileBodyType } from '@/apis/setting/SettingApi.type';
import {
  ColoLineGray,
  ColorBlack,
  ColorGray200,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@/utils/_Palette';
import { filePath, imgPath, intComma } from '@/utils/format';
import { getToken } from '@/utils/localStorage/token';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputBox from '../common/Input';
import CustomButton from '../common/CustomButton';
import { useProfileShippingMutation } from '@/apis/setting/SettingApi.mutation';
interface Props {
  info: ProfileBodyType | undefined;
}
function DeliveryInfo({ info }: Props) {
  const toast = useToast();
  const [shipping, setShipping] = useState({
    shippingType: 0,
    shippingFee: 0,
    shippingMinAmount: 0,
  });

  useEffect(() => {
    if (info) {
      setShipping({
        shippingType: info.shippingType,
        shippingFee: info.shippingFee,
        shippingMinAmount: info.shippingMinAmount,
      });
    }
  }, [info]);
  const handleSubmitShipping = () => {
    if (shipping.shippingType == 2) {
      // 유료
      if (shipping.shippingFee == 0) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'배송비를 0원 이상 입력해주세요.'}
            </Box>
          ),
        });
      } else {
        let obj = {
          shippingType: 2,
          shippingFee: shipping.shippingFee,
          shippingMinAmount: 0,
        };
        ShippingChangeMutate(obj);
      }
    } else if (shipping.shippingType == 3) {
      // 부분유료
      if (shipping.shippingFee == 0) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'배송비를 0원 이상 입력해주세요.'}
            </Box>
          ),
        });
      } else if (shipping.shippingMinAmount == 0) {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'최소주문금액을 0원 이상 입력해주세요.'}
            </Box>
          ),
        });
      } else {
        let obj = {
          shippingType: 3,
          shippingFee: shipping.shippingFee,
          shippingMinAmount: shipping.shippingMinAmount,
        };
        ShippingChangeMutate(obj);
      }
    } else if (shipping.shippingType == 1) {
      let obj = {
        shippingType: 1,
        shippingFee: 0,
        shippingMinAmount: 0,
      };
      ShippingChangeMutate(obj);
    } else {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'배송비 정책을 입력해주세요.'}
          </Box>
        ),
      });
    }
  };
  //배송 정책 수정
  const { mutate: ShippingChangeMutate } = useProfileShippingMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'수정되었습니다.'}
              </Box>
            ),
          });
          window.location.reload();
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          console.log('error 코드 생성 에러', res.code);
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'에러가 발생했습니다.'}
            </Box>
          ),
        });
      },
    },
  });
  return (
    <Box
      borderRadius={'12px'}
      borderColor={ColoLineGray}
      borderWidth={1}
      w={'100%'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex flexDirection={'row'} pb={'30px'} alignItems={'flex-start'}>
        <Text
          fontWeight={600}
          fontSize={'15px'}
          color={ColorBlack}
          w={'110px'}
          mt={'15px'}
        >
          배송비 정책
        </Text>
        <Flex flexDirection={'column'}>
          <Flex flexDirection={'row'} gap={'10px'}>
            <CustomButton
              bgColor={shipping.shippingType == 1 ? ColorGray900 : ColorWhite}
              color={shipping.shippingType == 1 ? ColorWhite : ColorGray700}
              text="무료"
              fontSize="15px"
              borderColor={
                shipping.shippingType == 1 ? ColorGray900 : ColorGray400
              }
              px="38px"
              py="13px"
              onClick={() => setShipping({ ...shipping, shippingType: 1 })}
            />
            <CustomButton
              bgColor={shipping.shippingType == 3 ? ColorGray900 : ColorWhite}
              color={shipping.shippingType == 3 ? ColorWhite : ColorGray700}
              text="부분무료"
              fontSize="15px"
              borderColor={
                shipping.shippingType == 3 ? ColorGray900 : ColorGray400
              }
              px="38px"
              py="13px"
              onClick={() => setShipping({ ...shipping, shippingType: 3 })}
            />
            <CustomButton
              bgColor={shipping.shippingType == 2 ? ColorGray900 : ColorWhite}
              color={shipping.shippingType == 2 ? ColorWhite : ColorGray700}
              text="유료"
              fontSize="15px"
              borderColor={
                shipping.shippingType == 2 ? ColorGray900 : ColorGray400
              }
              px="38px"
              py="13px"
              onClick={() => setShipping({ ...shipping, shippingType: 2 })}
            />
          </Flex>
        </Flex>
      </Flex>
      {shipping.shippingType == 2 && (
        <Flex>
          <Flex alignItems={'center'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'110px'}
            >
              배송비
            </Text>
            <Box w={'288px'}>
              <InputBox
                placeholder="배송비"
                type="text"
                maxLength={8}
                value={
                  shipping.shippingFee == 0
                    ? ''
                    : intComma(shipping.shippingFee)
                }
                onChange={(e: any) =>
                  setShipping({
                    ...shipping,
                    shippingFee: Number(e.target.value.replace(/[^0-9]/g, '')),
                  })
                }
              />
            </Box>
          </Flex>
        </Flex>
      )}
      {shipping.shippingType == 3 && (
        <Flex flexDirection={'column'}>
          <Flex alignItems={'center'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'110px'}
            >
              배송비
            </Text>
            <Box w={'288px'}>
              <InputBox
                placeholder="배송비"
                type="text"
                maxLength={8}
                value={
                  shipping.shippingFee == 0
                    ? ''
                    : intComma(shipping.shippingFee)
                }
                onChange={(e: any) =>
                  setShipping({
                    ...shipping,
                    shippingFee: Number(e.target.value.replace(/[^0-9]/g, '')),
                  })
                }
              />
            </Box>
          </Flex>
          <Flex flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'110px'}
            >
              최소주문금액
            </Text>
            <Box w={'288px'}>
              <InputBox
                placeholder="최소주문금액"
                type="text"
                maxLength={15}
                value={
                  shipping.shippingMinAmount == 0
                    ? ''
                    : intComma(shipping.shippingMinAmount)
                }
                onChange={(e: any) =>
                  setShipping({
                    ...shipping,
                    shippingMinAmount: Number(
                      e.target.value.replace(/[^0-9]/g, ''),
                    ),
                  })
                }
              />
            </Box>
          </Flex>
        </Flex>
      )}
      <Flex
        gap={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={'40px'}
      >
        <CustomButton
          text="취소"
          borderColor={ColorGray400}
          fontWeight={400}
          borderRadius="10px"
          bgColor={ColorWhite}
          px="67px"
          py="13px"
          color={ColorBlack}
          fontSize="15px"
        />
        <CustomButton
          text="저장"
          borderColor={ColorRed}
          fontWeight={400}
          borderRadius="10px"
          bgColor={ColorRed}
          px="67px"
          py="13px"
          color={ColorWhite}
          fontSize="15px"
          onClick={() => handleSubmitShipping()}
        />
      </Flex>
    </Box>
  );
}

export default DeliveryInfo;
