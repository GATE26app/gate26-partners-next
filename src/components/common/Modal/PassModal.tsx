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

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import styled from '@emotion/styled';
import {
  ColorBlack,
  ColorGray400,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import ChangePasswordModal from './ChangePasswordModal';
import { useState } from 'react';

interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  getType: string;
}
function PassModal({ onClose, getType, ...props }: AlertModalProps) {
  const [chagnePassModal, setChangePassModal] = useState(false);
  return (
    <>
      <ChangePasswordModal
        isOpen={chagnePassModal}
        onClose={() => setChangePassModal(false)}
      />
      <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
        <ModalOverlay />
        <Content maxW={536} overflowX={'auto'}>
          <Header>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text>비밀번호 변경</Text>
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
            <Flex pb={'6px'} mt={'10px'}>
              <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
                아이디
              </Text>
              <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
                *
              </Text>
            </Flex>
            <Flex
              gap={'10px'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <InputBox
                placeholder="아이디 입력"
                // value={request.loginId}
                // onChange={(e) => handleChangeInput('loginId', e.target.value)}
                // mb={'10px'}
                w={'100%'}
              />
            </Flex>
            {getType == '1' ? (
              <>
                <Flex pb={'6px'} mt={'30px'}>
                  <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
                    연락처
                  </Text>
                  <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
                    *
                  </Text>
                </Flex>
                <Flex w={'100%'} justifyContent={'space-between'} mb={'60px'}>
                  <InputBox
                    // w={'320px'}
                    w={'73%'}
                    placeholder="'-' 없이 숫자만 입력"
                    mr={'10px'}
                  />
                  <CustomButton
                    text="본인인증"
                    fontSize="15px"
                    color={ColorRed}
                    borderColor={ColorRed}
                    bgColor={ColorWhite}
                    px="29px"
                    py="14px"
                  />
                </Flex>
              </>
            ) : (
              <>
                <Flex pb={'6px'} pt={'30px'}>
                  <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
                    연락망(이메일)
                  </Text>
                  <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
                    *
                  </Text>
                </Flex>
                <Flex w={'100%'} justifyContent={'space-between'} mb={'60px'}>
                  <InputBox
                    // w={'320px'}
                    w={'71%'}
                    placeholder="이메일 입력"
                    mr={'10px'}
                  />
                  <CustomButton
                    text="메일인증"
                    fontSize="15px"
                    color={ColorRed}
                    borderColor={ColorRed}
                    bgColor={ColorWhite}
                    px="29px"
                    py="14px"
                  />
                </Flex>
              </>
            )}
          </ModalBody>
          {/* <Flex pt={'30px'} alignItems={'center'} backgroundColor={ColorWhite}> */}
          <CustomButton
            text="확인"
            px="95px"
            bgColor={ColorRed}
            borderColor={ColorRed}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={() => {
              onClose();
              setChangePassModal(true);
            }}
          />
          {/* </Flex> */}
        </Content>
      </Modal>
    </>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 30px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
        padding: 0px 0px 20px 0px;
      }
      &__body {
        padding: 0px;
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
export default PassModal;
