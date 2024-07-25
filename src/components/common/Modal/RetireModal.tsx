import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

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
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import ReviewGoodsInfo from './review/ReviewGoodsInfo';
import ButtonModal from '../ModalContainer/_fragments/ButtonModal';
import { useQuery } from 'react-query';
import reviewApi from '@/apis/review/ReviewApi';
import { PaymentMethod, formatDateDash, imgPath } from '@/utils/format';
import {
  useDeleteReviewCommentMutation,
  usePutReviewCommentMutation,
} from '@/apis/review/ReviewApi.mutation';
import { useProfileResignMutation } from '@/apis/setting/SettingApi.mutation';
import { deleteToken, deleteUserInfo } from '@/utils/localStorage/token';
import { useRouter } from 'next/navigation';

interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}
function RetireModal({
  onClose,
  // onSubmit,
  ...props
}: AlertModalProps) {
  const toast = useToast();
  const router = useRouter();

  const [resignStr, setResignStr] = useState('');
  const [error, setError] = useState('');

  const onSumbit = () => {
    if (resignStr == '') {
      setError('탈퇴 사유를 입력해주세요.');
    } else {
      setError('');
      let obj = {
        resignRequestReason: resignStr,
      };
      ProflieChangeMutate(obj);
    }
  };
  //탈퇴요청
  const { mutate: ProflieChangeMutate } = useProfileResignMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'탈퇴 되었습니다.'}
              </Box>
            ),
          });
          onClose();
          deleteUserInfo();
          deleteToken();
          document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          router.replace('/login');
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
    <Modal onClose={onClose} isCentered variant={'alert'} {...props}>
      <ModalOverlay />
      <Content maxW={536} overflowX={'auto'}>
        <Header>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text>탈퇴 요청</Text>
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
          <Text
            color={ColorBlack}
            fontWeight={700}
            fontSize={'16px'}
            pb={'5px'}
          >
            탈퇴요청 후에는 해당 계정으로 로그인 불가합니다.
          </Text>
          <Text
            color={ColorBlack}
            fontWeight={700}
            fontSize={'16px'}
            pb={'5px'}
          >
            관리자의 확인 후 탈퇴처리 됩니다.
          </Text>
          <Text
            color={ColorBlack}
            fontWeight={700}
            fontSize={'16px'}
            pb={'20px'}
          >
            정말로 탈퇴요청 하시겠습니까?
          </Text>
          <Textarea
            // value={memo}
            placeholder="탈퇴 요청사유를 입력해주세요."
            _placeholder={{ color: ColorGray700 }}
            color={ColorBlack}
            borderColor={ColorGrayBorder}
            onChange={(e) => setResignStr(e.target.value)}
            height={'96px'}
            borderRadius={'10px'}
            bgColor={ColorWhite}
            value={resignStr}
          />
          {error && (
            <Text
              color={ColorRed}
              fontWeight={400}
              fontSize={'12px'}
              pt={'6px'}
            >
              {error}
            </Text>
          )}
        </ModalBody>
        <Flex
          pt={'30px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          backgroundColor={ColorWhite}
        >
          <CustomButton
            text="취소"
            px="95px"
            bgColor={ColorWhite}
            borderColor={ColorGray400}
            fontSize="16px"
            color={ColorBlack}
            py="15px"
            fontWeight={700}
            onClick={onClose}
          />
          <CustomButton
            text="탈퇴요청"
            px="95px"
            bgColor={ColorGray900}
            borderColor={ColorGray900}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            onClick={() => {
              onSumbit();
            }}
          />
        </Flex>
      </Content>
    </Modal>
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
export default RetireModal;
