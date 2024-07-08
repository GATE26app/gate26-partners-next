import Image from 'next/image';
import { useState } from 'react';

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import { usePutOrderShoppingutation } from '@/apis/order/OrderApi.mutation';
import useAppStore from '@/features/useAppStore';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import styled from '@emotion/styled';
import {
  ColoLineGray,
  ColorBlack,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorGrayBorder,
  ColorWhite,
} from '@/utils/_Palette';

import ModalOrderInfo from './ModalOrderInfo';

interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}

const ToastComponent = (message: string) => {
  const toast = useToast();
  return toast({
    position: 'top',
    duration: 2000,
    render: () => (
      <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
        {`${message}`}
      </Box>
    ),
  });
};

function OrderModal({ onClose, ...props }: AlertModalProps) {
  const { title, message, type, okButtonName, cbOk, cbCancel, info } =
    useAppStore((store) => store.ORDER_MODAL);
  const [data, setData] = useState({
    shippingCompany:
      info?.shippingCompany == undefined ? '' : info?.shippingCompany,
    shippingInvoice:
      info?.shippingInvoice == undefined ? '' : info?.shippingInvoice,
    shippingMemo: info?.shippingMemo == undefined ? '' : info?.shippingMemo,
  });

  const handleClickOK = () => {
    if (cbOk) {
      if (type == 'delivery') {
        const obj = {
          orderId: info == undefined ? '' : info.orderId,
          body: {
            shippingCompany: data.shippingCompany,
            shippingInvoice: data.shippingInvoice,
            shippingMemo: data.shippingMemo,
          },
        };
        InputDeliveryMutate(obj);
      } else {
        cbOk();
        onClose();
      }
    }
  };

  //배송지 입력
  const { mutate: InputDeliveryMutate, isLoading: isLoading } =
    usePutOrderShoppingutation({
      options: {
        onSuccess: (res) => {
          if (res.success) {
            ToastComponent('배송지 정보를 저장하였습니다.');
            if (cbOk) {
              cbOk();
              onClose();
            }
          } else {
            ToastComponent(`${res.message}`);
          }
        },
      },
    });

  const renderContent = () => {
    if (type == 'delivery') {
      return (
        <Flex flexDirection={'column'}>
          <Flex mt={'25px'} flexDirection={'column'}>
            <Text fontSize={'16px'} color={ColorBlack} fontWeight={600}>
              택배사
            </Text>
            <Box w={'50%'}>
              <InputBox
                placeholder="택배사 입력"
                value={data.shippingCompany}
                onChange={(e) =>
                  setData({ ...data, shippingCompany: e.target.value })
                }
              />
            </Box>
          </Flex>
          <Flex
            mt={'25px'}
            flexDirection={'column'}
            pb={'25px'}
            borderBottomColor={ColoLineGray}
            borderBottomWidth={1}
          >
            <Text fontSize={'16px'} color={ColorBlack} fontWeight={600}>
              송장번호
            </Text>
            <InputBox
              placeholder="송장번호 입력"
              value={data.shippingInvoice}
              onChange={(e) =>
                setData({ ...data, shippingInvoice: e.target.value })
              }
            />
          </Flex>
          <Flex mt={'25px'} flexDirection={'column'} pb={'25px'}>
            <Text fontSize={'16px'} color={ColorBlack} fontWeight={600}>
              비고
            </Text>
            <Textarea
              value={data.shippingMemo}
              placeholder="비고 내용 입력"
              _placeholder={{ color: ColorGray700 }}
              color={ColorBlack}
              borderColor={ColorGrayBorder}
              onChange={(e) =>
                setData({ ...data, shippingMemo: e.target.value })
              }
              maxLength={500}
              height={'96px'}
              borderRadius={'10px'}
            />
          </Flex>
        </Flex>
      );
    }
    return <></>;
  };
  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ModalOverlay />
      <Content maxW={536}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
          >
            <Text>{type == 'delivery' ? '배송정보 입력' : title}</Text>
            <Image
              src={'/images/Page/ico_modal_close.png'}
              width={20}
              height={20}
              alt="모달 close"
              onClick={onClose}
            />
          </Flex>
        </Header>

        <ModalBody>
          {info !== undefined && <ModalOrderInfo info={info} />}

          {renderContent()}
        </ModalBody>
        <Flex mx={'30px'} flexDirection={'column'}>
          <CustomButton
            text="저장"
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={handleClickOK}
          />
        </Flex>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 30px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 30px;
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }
      &__body {
        /* padding: 10px 20px 20px 20px; */
        /* text-align: center; */
        /* white-space: break-spaces; */
        /* color: #757983; */

        /* font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em; */
      }
      &__footer {
        padding: 0;
        display: flex;
        background-color: '#292A2E';
        /* justify-content: space-between; */
        .button {
          cursor: pointer;

          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: '10px';
          color: #292a2e;
          border: 1px solid '#292A2E';
          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)``;
export default OrderModal;
