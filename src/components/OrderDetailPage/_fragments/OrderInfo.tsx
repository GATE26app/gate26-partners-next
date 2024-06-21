import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, Text, Textarea, useToast } from '@chakra-ui/react';

import { usePutOrderMemoMutation } from '@apis/order/OrderApi.mutation';
import { OrderDetailItemType } from '@apis/order/OrderApi.type';

import Button from '@components/common/Button';
import CustomButton from '@components/common/CustomButton';
import ImageButton from '@components/common/ImageButton';
import LoadingModal from '@components/common/ModalContainer/_fragments/LoadingModal';
import SearchInput from '@components/common/SearchInput';
import SelectBox from '@components/common/SelectBox';
import ToastComponent from '@components/common/Toast/ToastComponent';

import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray600,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';

interface Props {
  info: OrderDetailItemType;
}
function OrderInfo({ info }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [memo, setMemo] = useState<string>(
    info.partnerMemo == null ? '' : info.partnerMemo,
  );

  const { mutate: InputMemoMutate, isLoading: isLoading } =
    usePutOrderMemoMutation({
      options: {
        onSuccess: (res) => {
          if (res.success) {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {'메모를 저장하였습니다.'}
                </Box>
              ),
            });
          } else {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {res.message}
                </Box>
              ),
            });
          }
        },
      },
    });

  const onSubmitMemo = () => {
    if (memo == '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'메모를 입력해주세요.'}
          </Box>
        ),
      });
      // ToastComponent('메모를 입력해주세요.');
    } else {
      const obj = {
        orderId: String(router.query.orderId),
        body: {
          memo: memo,
        },
      };
      InputMemoMutate(obj);
    }
  };
  return (
    <>
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      <Flex
        bgColor={ColorGray50}
        borderRadius={'12px'}
        p={'40px'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'column'}>
          <Text
            textStyle="textSm"
            fontWeight={600}
            fontSize={'18px'}
            color={ColorBlack}
            pb={'10px'}
          >
            주문정보
          </Text>
          <Box w={'100%'} bgColor={ColorGrayBorder} h={'1px'} mb={'16px'}></Box>
          <Flex flexWrap={'wrap'} mb={'20px'}>
            <Text
              // textStyle="textSm"
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              // pb={'10px'}
              w={'160px'}
            >
              주문번호
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {info.orderId}
            </Text>
          </Flex>
          <Flex flexWrap={'wrap'} mb={'20px'}>
            <Text
              // textStyle="textSm"
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              // pb={'10px'}
              w={'160px'}
            >
              주문일자
            </Text>
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {info.paymentDate}
            </Text>
          </Flex>
          <Flex flexDirection={'row'}>
            <Text
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'160px'}
              flexShrink={0}
            >
              관리자메모
            </Text>
            <Textarea
              value={memo}
              placeholder="내용을 입력해주세요."
              _placeholder={{ color: ColorGray700 }}
              color={ColorBlack}
              bgColor={ColorWhite}
              borderColor={ColorGray400}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={500}
              height={100}
              w={'100%'}
              borderRadius={'10px'}
            />
          </Flex>
        </Flex>
        <Flex justifyContent={'center'} mt={'40px'} gap={'10px'}>
          <CustomButton
            text="목록"
            fontSize="15px"
            color={ColorBlack}
            bgColor={ColorWhite}
            borderColor={ColorGrayBorder}
            py="14px"
            px="67px"
            onClick={() => router.back()}
          />
          <CustomButton
            text="저장"
            fontSize="15px"
            color={ColorWhite}
            bgColor={ColorRed}
            borderColor={ColorRed}
            py="14px"
            px="67px"
            onClick={() => onSubmitMemo()}
          />
          {/* <Button size="sm" text="검색" width={'160px'} /> */}
        </Flex>
      </Flex>
    </>
  );
}

export default OrderInfo;
