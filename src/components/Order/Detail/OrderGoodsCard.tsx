import Image from 'next/image';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';
import { useQueryClient } from 'react-query';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';

import {
  usePostOrderContfrimMutation,
  usePutOrderCancelMutation,
  usePutOrderCancelRequestMutation,
  useRequestCancelConfirmMutation,
  useRequestCancelDeniedMutation,
} from '@/apis/order/OrderApi.mutation';
import { OrderDetailItemType } from '@/apis/order/OrderApi.type';
import { customModalSliceAction } from '@/features/customModal/customModalSlice';
import { orderModalSliceAction } from '@/features/orderModal/orderModalSlice';

import {
  ColoLineGray,
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
} from '@/utils/_Palette';

import { formatDated, getImagePath, imgPath, intComma } from '@/utils/format';

import OrderStateSelectBox from './OrderStateSelectBox';

import CancelModal from '../../common/Modal/CancelModal';
import DeliveryModal from '@/components/common/Modal/DeliveryModal';
import ButtonModal from '@/components/common/ModalContainer/_fragments/ButtonModal';
import RadioComponent from '@/components/common/CustomRadioButton/RadioComponent';
import CancelDeniedModal from '@/components/common/Modal/CancelDeniedModal';
interface headerProps {
  id: string;
  name: string;
  width: string;
}
interface Props {
  header: Array<headerProps>;
  item: OrderDetailItemType;
}
function OrderGoodsCard({ header, item }: Props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [StateList, setStateList] = useState<string[]>([]);
  const [selectState, setSelectState] = useState(item.orderStatusName);

  const [cancelModal, setCancelModal] = useState(false);
  const [deliveryModal, setDelieveryModal] = useState(false);
  const [cancelDeniedModal, setCancelDeniedModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    type: '',
    title: '',
  });
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    type: '',
    title: '',
    okButtonName: '',
    message: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  const queryClient = useQueryClient();
  const [CancelConfirmClick, setCancelConfirmClick] = useState(false);
  const [CancelDeniedClick, setCancelDeniedClick] = useState(false);
  const [cancelStateTxt, setCancelStateTxt] = useState('');
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };

  useEffect(() => {
    if (item.cancelStatusName == '' || item.cancelStatusName == null) {
      if (
        (item.orderStatusName == '결제완료' && item.orderType == 1) ||
        (item.orderStatusName == '결제완료' && item.orderType == 2)
      ) {
        setStateList(['결제완료', '취소요청']);
        // StateList = dataList;
      } else if (item.orderStatusName == '결제완료' && item.orderType == 3) {
        setStateList(['결제완료', '예약확정', '취소']);
      } else if (item.orderStatusName == '이용일') {
        setStateList([item.orderStatusName, '취소요청']);
      } else if (item.orderStatusName == '예약확정') {
        setStateList([item.orderStatusName, '취소요청']);
      } else {
        setStateList([item.orderStatusName]);
      }
    } else {
      setSelectState(item.cancelStatusName);
      setStateList([item.cancelStatusName]);
    }
  }, [item.orderStatusName, item.cancelStatusName]);

  useEffect(() => {
    if (item.partnerCancelConfirm == 2) {
      setCancelStateTxt('반려');
    } else if (item.partnerCancelConfirm == 3) {
      setCancelStateTxt('승인');
    } else {
      setCancelStateTxt('');
    }
  }, [item.partnerCancelConfirm]);
  const [itemData, setItemData] = useState({
    orderId: item.orderId,
    orderThumbnailImagePath: item.orderThumbnailImagePath,
    orderCategoryTitle: item.orderCategoryTitle,
    orderCnt: item.orderCnt,
    orderOptionTitle: item.orderOptionTitle,
    discountAmount: item.discountAmount,
    orderAmount: item.orderAmount,
    orderTitle: item.orderTitle,
    shippingCompany: item.shippingCompany,
    shippingInvoice: item.shippingInvoice,
    shippingMemo: item.shippingMemo,
    orderCancelRequestDetail: '',
  });

  useEffect(() => {
    setItemData({
      orderId: item.orderId,
      orderThumbnailImagePath: item.orderThumbnailImagePath,
      orderCategoryTitle: item.orderCategoryTitle,
      orderCnt: item.orderCnt,
      orderOptionTitle: item.orderOptionTitle,
      discountAmount: item.discountAmount,
      orderAmount: item.orderAmount,
      orderTitle: item.orderTitle,
      shippingCompany: item.shippingCompany,
      shippingInvoice: item.shippingInvoice,
      shippingMemo: item.shippingMemo,
      orderCancelRequestDetail: '',
    });
  }, [item]);

  const onClickSelect = (type: string) => {
    if (type !== selectState) {
      if (
        type == '접수거절' ||
        (type == '취소요청' && item.cancelStatusName == '')
      ) {
        setModalInfo({
          type: type,
          title: type == '접수거절' ? '취소사유 입력' : '취소요청사유 입력',
        });
        setCancelModal(true);
      } else if (type == '취소' && item.cancelStatusName == '') {
        setModalInfo({
          type: type,
          title: '취소사유 입력',
        });
        setCancelModal(true);
      } else if (type == '취소요청' && item.cancelStatusName !== '') {
        setOpenAlertModal(true);
        setModalState({
          ...ModalState,
          title: '상태값 변경',
          message: `이미 취소요청이 되어 있습니다.`,
          type: 'confirm',
          okButtonName: '확인',
          cbOk: () => {},
        });
      } else if (type == '예약확정') {
        setOpenAlertModal(true);
        setModalState({
          ...ModalState,
          title: '상태값 변경',
          message: `${type}으로 변경하시겠습니까?`,
          type: 'confirm',
          okButtonName: '변경',
          cbOk: () => {
            setSelectState(type);
            let obj = {
              orderId: item.orderId,
            };
            ConfrimMutate(obj);
          },
        });
      }
      //  else if(type == '취소') {
      //   setOpenAlertModal(true);
      //   const obj = {
      //     orderId: item.orderId,
      //     type: '취소',
      //     body: {
      //       orderCancelRequestDetail: '취소',
      //     },
      //   };
      //   setModalState({
      //     ...ModalState,
      //     title: '상태값 변경',
      //     message: `${type}으로 변경하시겠습니까?`,
      //     type: 'confirm',
      //     okButtonName: '변경',
      //     cbOk: () => {
      //       setSelectState(type);
      //       CancelMutate(obj);
      //     },
      //   });
      // }
      else {
        setOpenAlertModal(true);
        setModalState({
          ...ModalState,
          title: '상태값 변경',
          message: `${type}으로 변경하시겠습니까?`,
          type: 'confirm',
          okButtonName: '변경',
          cbOk: () => {
            setSelectState(type);
          },
        });
      }
    }
  };

  const onSubmitCancel = (text: string) => {
    if (modalInfo.type == '취소요청') {
      const obj = {
        orderId: item.orderId,
        type: '취소요청',
        body: {
          orderCancelRequestDetail: text,
        },
      };
      CancelRequestMutate(obj);
    } else if (modalInfo.type == '접수거절') {
      const obj = {
        orderId: item.orderId,
        type: '접수거절',
        body: {
          orderCancelRequestDetail: text,
        },
      };
      CancelMutate(obj);
    } else if (modalInfo.type == '취소') {
      const obj = {
        orderId: item.orderId,
        type: '취소',
        body: {
          orderCancelRequestDetail: text,
        },
      };
      CancelMutate(obj);
    }
  };
  const onSubmitCancelDenied = (text: string) => {
    console.log('text', text);
    setOpenAlertModal(true);
    setModalState({
      ...ModalState,
      title: '파트너사 취소 반려',
      message: `파트너사 취소 반려하시겠습니까?`,
      type: 'confirm',
      okButtonName: '확인',
      cbOk: () => {
        setCancelDeniedModal(false);
        setCancelStateTxt('반려');
        CancelDeniedMutate({
          orderId: item.orderId,
          obj: {
            cancelDeniedDetail: text,
          },
        });
      },
    });
  };
  const onClickDelivery = () => {
    setDelieveryModal(true);
    // dispatch(
    //   orderModalSliceAction.setMessage({
    //     title: '배송정보 입력',
    //     message: `변경하시겠습니까?`,
    //     type: 'delivery',
    //     okButtonName: '변경',
    //     info: itemData,
    //     cbOk: () => {
    //       // setSelectState(type);
    //       // removeAdminInfo(row.userId as string);
    //     },
    //   }),
    // );
    // openOrderModal();
  };
  //예약 확정
  const { mutate: ConfrimMutate, isLoading: isConfrimLoading } =
    usePostOrderContfrimMutation({
      options: {
        onSuccess: (res, req) => {
          if (res.success) {
            // setIsLoading(false);
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
                  {'예약 확정 요청되었습니다.'}
                </Box>
              ),
            });
          } else {
            // setIsLoading(false);
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //주문 취소 요청
  const { mutate: CancelRequestMutate, isLoading: isCancelRequestLoading } =
    usePutOrderCancelRequestMutation({
      options: {
        onSuccess: (res, req) => {
          if (res.success) {
            setCancelModal(false);
            setSelectState(req.type);
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
                  {'주문 취소 요청이 되었습니다.'}
                </Box>
              ),
            });
          } else {
            setCancelModal(false);
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });
  //주문 취소
  const { mutate: CancelMutate, isLoading: isCancelLoading } =
    usePutOrderCancelMutation({
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
                  {'주문 취소가 되었습니다.'}
                </Box>
              ),
            });
            // setSelectState(type);
            //  if (cbOk) {
            //    cbOk();
            //    onClose();
            //  }
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
                  {`${res.message}`}
                </Box>
              ),
            });
          }
        },
      },
    });

  //주문쉬초요청건 파트너승인처리
  const { mutate: CancelConfirmMutate, isLoading: isCancelConfirmLoading } =
    useRequestCancelConfirmMutation({
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
                  {'파트너 취소 승인이 되었습니다.'}
                </Box>
              ),
            });
            setCancelStateTxt('승인');
            queryClient.refetchQueries(['orderItem', String(item.orderId)]);
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
                  {`${res.message}`}
                </Box>
              ),
            });
            setCancelStateTxt('');
          }
        },
      },
    });
  //주문쉬초요청건 파트너반려처리
  const { mutate: CancelDeniedMutate, isLoading: isCancelDeniedLoading } =
    useRequestCancelDeniedMutation({
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
                  {'파트너 취소 반려 되었습니다.'}
                </Box>
              ),
            });
            queryClient.refetchQueries(['orderItem', String(item.orderId)]);
            setCancelStateTxt('반려');
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
                  {`${res.message}`}
                </Box>
              ),
            });
            setCancelStateTxt('');
          }
        },
      },
    });
  return (
    <>
      {cancelModal && (
        <CancelModal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          onSubmit={onSubmitCancel}
          info={itemData}
          title={modalInfo.title}
          type={modalInfo.type}
        />
      )}
      {deliveryModal && (
        <DeliveryModal
          isOpen={deliveryModal}
          onClose={() => setDelieveryModal(false)}
          // onSubmit={onSubmitCancel}
          info={itemData}
          title={modalInfo.title}
        />
      )}
      {isOpenAlertModal && (
        <ButtonModal
          isOpen={isOpenAlertModal}
          ModalState={ModalState}
          onClose={() => setOpenAlertModal(false)}
        />
      )}
      <CancelDeniedModal
        isOpen={cancelDeniedModal}
        onSubmit={onSubmitCancelDenied}
        onClose={() => setCancelDeniedModal(false)}
      />
      <Flex
        minW={'1550px'}
        flexDirection={'row'}
        justifyContent={'center'}
        py={'20px'}
        borderBottomColor={ColorGrayBorder}
        borderBottomWidth={1}
      >
        <Flex
          w={header[0]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={'5px'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.orderId}
          </Text>
        </Flex>
        <Flex w={header[1]?.width} gap={'10px'}>
          <Box
            w={'80px'}
            minWidth={'80px'}
            h={'80px'}
            borderRadius={'10px'}
            position={'relative'}
            overflow={'hidden'}
            ml={'10px'}
          >
            <img
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
              }}
              src={
                item.orderThumbnailImagePath !== null
                  ? getImagePath(item.orderThumbnailImagePath)
                  : '/images/no_img.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
            {/* <Image
              height={80}
              width={80}
              src={
                item.orderThumbnailImagePath !== null
                  ? `${imgPath()}${item.orderThumbnailImagePath}`
                  : '/images/no_img.png'
              }
              // src={'/images/Page/ex_image_1.jpg'}
              alt="상품이미지"
              objectFit={'cover'}
              // fill
            /> */}
          </Box>
          {/* 상품정보 */}
          <Flex flexDirection={'column'}>
            <Flex mb={'5px'} gap={'10px'} flexDirection={'row'} flexShrink={0}>
              <Text
                color={ColorBlack}
                fontSize={'14px'}
                fontWeight={600}
                flexShrink={0}
              >
                {item.orderCategoryTitle}
              </Text>
              <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
                {item.orderTitle}
              </Text>
            </Flex>
            <Flex gap={'10px'} flexShrink={0}>
              <Text
                flexShrink={0}
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'50px'}
              >
                선택옵션
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {item.orderOptionTitle} * {item.orderCnt}
              </Text>
            </Flex>
            <Flex gap={'10px'}>
              <Text
                color={ColorGray700}
                fontWeight={600}
                fontSize={'14px'}
                w={'49px'}
              >
                주문금액
              </Text>
              <Text color={ColorGray700} fontWeight={400} fontSize={'14px'}>
                {intComma(item.orderAmount)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* 결제정보 */}
        <Flex
          w={header[2]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text color={ColorBlack} fontSize={'14px'} fontWeight={400}>
            {intComma(item.orderAmount)}원
          </Text>
        </Flex>
        {/* 예약자정보 */}
        <Flex
          w={header[3]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {formatDated(dayjs(item.orderDateTimeOfUse)) == 'Invalid Date'
              ? '-'
              : formatDated(dayjs(item.orderDateTimeOfUse))}
          </Text>
        </Flex>
        <Flex
          w={header[4]?.width}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={'10px'}
        >
          <OrderStateSelectBox
            placeholder="결제완료"
            width={'120px'}
            list={StateList}
            select={selectState}
            setSelect={setSelectState}
            onClick={onClickSelect}
          />
        </Flex>
        {item.cancelStatus == 1 && (
          <>
            {item.partnerCancelConfirm == 1 && cancelStateTxt == '' ? (
              <Flex
                w={header[5]?.width}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
              >
                <Flex gap={'20px'}>
                  <RadioComponent
                    text="승인"
                    checked={CancelConfirmClick}
                    onClick={() => {
                      CancelConfirmMutate(item.orderId);
                      setCancelConfirmClick(true);
                      setCancelDeniedClick(false);
                    }}
                  />
                  <RadioComponent
                    text="반려"
                    checked={CancelDeniedClick}
                    onClick={() => {
                      setCancelDeniedModal(true);
                      setCancelConfirmClick(false);
                      setCancelDeniedClick(true);
                      // console.log('vvvv');
                    }}
                  />
                </Flex>
              </Flex>
            ) : (
              <Flex
                w={header[5]?.width}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
              >
                <Text>
                  {item.partnerCancelConfirm == 2 || cancelStateTxt == '반려'
                    ? '반려'
                    : '승인'}
                </Text>
              </Flex>
            )}
          </>
        )}
        {/* {item.partnerCancelConfirm == 1 && item.cancelStatus == 1 ? (
          <Flex
            w={header[5]?.width}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            <Flex gap={'20px'}>
              <RadioComponent
                text="승인"
                checked={item.partnerCancelConfirm == 3 ? true : false}
                disabled={item.partnerCancelConfirm !== 1}
                onClick={() => {
                  CancelConfirmMutate(item.orderId);
                  console.log('vvvv');
                }}
              />
              <RadioComponent
                text="반려"
                disabled={item.requiredPartnerCancelConfirm !== 1}
                checked={item.partnerCancelConfirm == 2 ? true : false}
                onClick={() => {
                  setCancelDeniedModal(true);
                  // console.log('vvvv');
                }}
              />
            </Flex>
          </Flex>
        ) : (
          <Text>{item.partnerCancelConfirm == 2 ? '승인' : '반려'}</Text>
        )} */}
        {/* 주문 상품 유형, 1=>일반형, 2=>바우처형, 3=>예약형, 4=>이륙살롱 */}
        {item.orderType === 1 && (
          <Flex
            w={header[6]?.width}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            {item.shippingCompany && (
              <Text
                color={ColorBlack}
                fontSize={'14px'}
                fontWeight={400}
                mb={'5px'}
              >
                {item.shippingCompany}
              </Text>
            )}
            {item.shippingInvoice && (
              <Text
                color={ColorBlack}
                fontSize={'14px'}
                fontWeight={400}
                mb={'5px'}
              >
                {item.shippingInvoice}
              </Text>
            )}

            <Flex
              px={'11px'}
              py={'7px'}
              borderWidth={1}
              borderColor={ColoLineGray}
              borderRadius={'6px'}
              onClick={onClickDelivery}
              cursor={'pointer'}
            >
              <Text color={ColorGray700} fontWeight={500} fontSize={'12px'}>
                배송정보입력
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default OrderGoodsCard;
