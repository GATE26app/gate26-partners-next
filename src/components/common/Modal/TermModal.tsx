import { useEffect, useState } from 'react';

import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';

import styled from '@emotion/styled';
import {
  ColorBlack,
  ColorGray100,
  ColorGray900,
  ColorWhite,
} from '@/utils/_Palette';
import Image from 'next/image';
import TermsAndConditionsContent from '@/components/common/TermsAndConditionsContent';

interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  title?: string
  contentSrc?: string;
  // reviewId: string;
}
function TermModal({
  onClose,
  // reviewId,
  // onSubmit,
  title,
  contentSrc,
  ...props
}: AlertModalProps) {
  return (
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ModalOverlay />
      <Content maxW={536} h={'727px'} overflowX={'auto'}>
        <Header>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={'17px'}
            mt={'30px'}
          >
            <Text fontSize={'16px'} fontWeight={700} color={ColorBlack}>
              {title}
            </Text>
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
          <TermsAndConditionsContent contentSrc={contentSrc}/>
        </ModalBody>
        <Flex
          pb={'30px'}
          pt={'20px'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'sticky'}
          bottom={0}
          backgroundColor={ColorWhite}
        >
          <CustomButton
            text="닫기"
            px="213px"
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={onClose}
          />
        </Flex>
      </Content>
    </Modal>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 0px 30px 0px;
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
const Header = styled(ModalHeader)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 99;
  /* padding-top: 30px; */
  /* height: 95px; */
`;
export default TermModal;
