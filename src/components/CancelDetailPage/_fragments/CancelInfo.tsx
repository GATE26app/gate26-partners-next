import { useRouter } from 'next/router';
import React, { useState } from 'react';

import dayjs from 'dayjs';

import { Box, Flex, Text, Textarea, useToast } from '@chakra-ui/react';

import { usePutOrderMemoMutation } from '@apis/order/OrderApi.mutation';
import { OrderDetailItemType } from '@apis/order/OrderApi.type';

import CustomButton from '@components/common/CustomButton';

import {
  COlorBlueSucces,
  ColorBlack,
  ColorBlue,
  ColorDataTableBorderTop,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@utils/_Palette';
import { formatDated, intComma } from '@utils/format';

import CancelInfoCard from './CancelInfoCard';

interface Props {
  info: OrderDetailItemType;
}
function CancelInfo({ info }: Props) {
  const [state, setState] = useState(1); //반려 : 1, 승인:2
  const [data, setData] = useState('');
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
          // setDetailData(res);
          // console.log('Mutation res.', res);
          // console.log('Mutation data.', res.data);
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

  const ItemInfo = {
    orderId: info.orderId,
    orderThumbnailImagePath: info.orderThumbnailImagePath,
    orderCategoryTitle: info.orderCategoryTitle,
    orderCnt: info.orderCnt,
    orderOptionTitle: info.orderOptionTitle,
    discountAmount: info.discountAmount,
    orderAmount: info.orderAmount,
    orderTitle: info.orderTitle,
    orderDateTimeOfUse: info.orderDateTimeOfUse,
    orderStatus: info.orderStatus,
    address: info.address,
    addressDetail: info.addressDetail,
    postcode: info.postcode,
    recieverName: info.recieverName,
    recieverHp: info.recieverHp,
  };
  return (
    <Box mt={'60px'}>
      <Text color={ColorBlack} fontWeight={600} fontSize={'18px'}>
        취소 정보
      </Text>
      <Flex
        flexDirection={'column'}
        w={'100%'}
        borderTopColor={ColorDataTableBorderTop}
        borderTopWidth={1}
        mt={'15px'}
      >
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            결제일
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {formatDated(dayjs(info.paymentDate)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(info.paymentDate))}
          </Text>
        </Flex>
        <Flex mt={'15px'} flexDirection={'column'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            취소요청상품
          </Text>
          <CancelInfoCard info={ItemInfo} />
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            취소승인
          </Text>
          <Flex gap={'10px'}>
            {/* <Flex
              bgColor={state == 1 ? ColorRed50 : COlorBlueSucces}
              px={'6px'}
              pt={'4px'}
              pb={'3px'}
              // py={'4px'}
              borderRadius={'5px'}
            >
              <Text
                color={state == 1 ? ColorRed : ColorBlue}
                fontWeight={600}
                fontSize={'12px'}
              >
                {info.cancelFaultTypeName}
              </Text>
            </Flex> */}
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {info.cancelRequestDetail}
            </Text>
          </Flex>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            취소요청일
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {formatDated(dayjs(info.cancelRequestDate)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(info.cancelRequestDate))}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            // flexShrink={0}
            color={ColorBlack}
            whiteSpace={'pre-wrap'}
          >
            취소승인(완료)일
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {formatDated(dayjs(info.cancelConfirmDate)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(info.cancelConfirmDate))}
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'flex-start'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            취소정책
          </Text>
          {info.policies.length > 0 ? (
            <Flex flexDirection={'column'}>
              {info.policies.map((item) => {
                return (
                  <Flex>
                    <Text
                      color={ColorBlack}
                      fontWeight={400}
                      fontSize={'15px'}
                      mb={'5px'}
                    >
                      {item.title}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          ) : (
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              -
            </Text>
          )}
        </Flex>
        <Flex mt={'15px'} alignItems={'center'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            환불 예정금액
          </Text>
          <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
            {intComma(info.cancelAmount)}원
          </Text>
        </Flex>
        <Flex mt={'15px'} alignItems={'flex-start'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            결제정보
          </Text>
          <Flex flexDirection={'column'}>
            <Text color={ColorBlack} fontWeight={400} fontSize={'15px'}>
              {intComma(info.paymentAmount)}원
            </Text>
            <Text color={ColorGray700} fontWeight={400} fontSize={'15px'}>
              {info.paymentMethod == 'card' ? '카드취소' : '무통장'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDirection={'column'}
        bgColor={ColorGray50}
        // p={'20px'}
        px={'20px'}
        py={'30px'}
        borderRadius={'12px'}
        mt={'40px'}
        // justifyContent={'center'}
      >
        <Flex flexDirection={'row'}>
          <Text
            w={'160px'}
            fontSize={'15px'}
            fontWeight={700}
            flexShrink={0}
            color={ColorBlack}
          >
            관리자메모
          </Text>
          <Textarea
            value={info.partnerMemo}
            placeholder="내용을 입력해주세요."
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={500}
            height={'96px'}
            borderRadius={'10px'}
            bgColor={ColorWhite}
          />
        </Flex>
        <Flex
          flexDirection={'row'}
          alignItems={'center'}
          gap={'10px'}
          mt={'40px'}
          justifyContent={'center'}
        >
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
            borderColor={ColorRed}
            color={ColorWhite}
            py="14px"
            px="67px"
            bgColor={ColorRed}
            fontSize="15px"
            onClick={() => onSubmitMemo()}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default CancelInfo;
