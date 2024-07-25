// components/MapModal.tsx
import React, { useState } from 'react';

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import styled from '@emotion/styled';
import DaumPostcode from 'react-daum-postcode';
import { ColorBlack, ColorRed, ColorWhite } from '@/utils/_Palette';
import Image from 'next/image';
interface MapModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  onComplete: (location: { address: string }) => void;
}
function AddressModal({ onClose, onComplete, ...props }: MapModalProps) {
  const handleComplete = (data) => {
    onComplete({ address: data.address });
    onClose();
  };
  return (
    <ModalWrap>
      <ModalBox>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={'18px'} fontWeight={700} color={ColorBlack}>
            주소 찾기
          </Text>
          <Image
            src={'/images/Page/ico_modal_close.png'}
            width={20}
            height={20}
            alt="모달 close"
            onClick={onClose}
          />
        </Flex>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          mt={'20px'}
          // h={'500px'}
        >
          <DaumPostcode onComplete={handleComplete} />
          {/* <CustomButton
            text="완료"
            borderColor={ColorRed}
            color={ColorWhite}
            px="31px"
            py="13px"
            bgColor={ColorRed}
            fontSize="15px"
            onClick={() => {
              handleComplete();
            }}
          /> */}
        </Flex>
      </ModalBox>
    </ModalWrap>
  );
}

const ModalWrap = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalBox = styled('div')`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  height: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;
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
export default AddressModal;
