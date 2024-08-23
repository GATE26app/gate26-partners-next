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

interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  // reviewId: string;
}
function TermModal({
  onClose,
  // reviewId,
  // onSubmit,
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
              서비스 약관동의
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
          <Flex
            flexDirection={'column'}
            py={'15px'}
            px={'15px'}
            height={'530px'}
            overflowY={'auto'}
            // overflow={'hidden'}
            bgColor={ColorGray100}
          >
            <Text>제1조 (목적)</Text>
            <Text>
              밥을 동산에는 것은 천하를 사막이다. 보내는 뜨거운지라, 그들의
              쓸쓸한 우리 그들은 풍부하게 보이는 사라지지 칼이다. 노년에게서
              따뜻한 가장 우는 같은 곳으로 거친 따뜻한 있는가? 미묘한 길을
              그들의 피가 작고 힘있다. 만물은 위하여 너의 꽃 얼음 무엇을
              것이다.보라, 불어 찾아 때문이다. 희망의 무엇을 같이 인간이
              되려니와, 할지니, 약동하다. 평화스러운 기관과 인생의 보는 힘있다.
              아니한 황금시대의 그들의 발휘하기 피고, 가진 있을 청춘의 것이다.
              열매를 풍부하게 곳이 같은 위하여서. 밥을 동산에는 것은 천하를
              사막이다. 보내는 뜨거운지라, 그들의 쓸쓸한 우리 그들은 풍부하게
              보이는 사라지지 칼이다. 노년에게서 따뜻한 가장 우는 같은 곳으로
              거친 따뜻한 있는가? 미묘한 길을 그들의 피가 작고 힘있다. 만물은
              위하여 너의 꽃 얼음 무엇을 것이다.보라, 불어 찾아 때문이다. 희망의
              무엇을 같이 인간이 되려니와, 할지니, 약동하다. 평화스러운 기관과
              인생의 보는 힘있다. 아니한 황금시대의 그들의 발휘하기 피고, 가진
              있을 청춘의 것이다. 열매를 풍부하게 곳이 같은 위하여서.
            </Text>
            <Text>제1조 (목적)</Text>
            <Text>
              밥을 동산에는 것은 천하를 사막이다. 보내는 뜨거운지라, 그들의
              쓸쓸한 우리 그들은 풍부하게 보이는 사라지지 칼이다. 노년에게서
              따뜻한 가장 우는 같은 곳으로 거친 따뜻한 있는가? 미묘한 길을
              그들의 피가 작고 힘있다. 만물은 위하여 너의 꽃 얼음 무엇을
              것이다.보라, 불어 찾아 때문이다. 희망의 무엇을 같이 인간이
              되려니와, 할지니, 약동하다. 평화스러운 기관과 인생의 보는 힘있다.
              아니한 황금시대의 그들의 발휘하기 피고, 가진 있을 청춘의 것이다.
              열매를 풍부하게 곳이 같은 위하여서. 밥을 동산에는 것은 천하를
              사막이다. 보내는 뜨거운지라, 그들의 쓸쓸한 우리 그들은 풍부하게
              보이는 사라지지 칼이다. 노년에게서 따뜻한 가장 우는 같은 곳으로
              거친 따뜻한 있는가? 미묘한 길을 그들의 피가 작고 힘있다. 만물은
              위하여 너의 꽃 얼음 무엇을 것이다.보라, 불어 찾아 때문이다. 희망의
              무엇을 같이 인간이 되려니와, 할지니, 약동하다. 평화스러운 기관과
              인생의 보는 힘있다. 아니한 황금시대의 그들의 발휘하기 피고, 가진
              있을 청춘의 것이다. 열매를 풍부하게 곳이 같은 위하여서.
            </Text>
          </Flex>
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
