import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import { ColorBlack, ColorGray900, ColorWhite } from '@/utils/_Palette';
import styled from '@emotion/styled';
import InputBox from '../Input';
interface Props extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  onSubmit: (text: string) => void;
}
function CancelDeniedModal({
  onClose,
  onSubmit,

  ...props
}: Props) {
  const [data, setData] = useState('');
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
            <Text>파트너사 취소 반려</Text>
            <Image
              src={'/images/Page/ico_modal_close.png'}
              width={'20px'}
              height={'20px'}
              alt="모달 close"
              onClick={onClose}
            />
          </Flex>
        </Header>

        <ModalBody>
          <Flex flexDirection={'column'}>
            <Text
              fontWeight={500}
              fontSize={'15px'}
              color={ColorBlack}
              mb={'10px'}
              // onMouseOver={'10px'}
            >
              반려사유
            </Text>
            <InputBox
              placeholder="반려사유 입력"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </Flex>
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
            onClick={() => onSubmit(data)}
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

export default CancelDeniedModal;
