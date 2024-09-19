import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useToast,
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
import { useEffect, useState } from 'react';
import { useProfileChangePwMutation } from '@/apis/setting/SettingApi.mutation';
import { useRouter } from 'next/navigation';
import { deleteToken, deleteUserInfo } from '@/utils/localStorage/token';
interface AlertModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}
function ChangePasswordModal({ onClose, ...props }: AlertModalProps) {
  const toast = useToast();
  const router = useRouter();
  const [changePw, setChangePw] = useState({
    pw: '',
    newPw: '',
    chPw: '',
  });
  const [pwState, setPwState] = useState(false);
  const [newchpwState, setNewChPwState] = useState(false);
  const [chpwState, setChPwState] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [error, setError] = useState({
    pwError: '',
    newpwError: '',
    checkPwError: '',
  });
  //비밀번호 체크
  const handleCheckPw = (pw: string) => {
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;
    if (pw.length == 0) {
      setError({
        ...error,
        pwError: '비밀번호를 입력해주세요.',
      });
      setPwState(false);
    } else {
      setError({
        ...error,
        pwError: '',
      });
      setChangePw({
        ...changePw,
        pw: pw,
      });
      setPwState(true);
    }
    // else {
    //   setError({
    //     ...error,
    //     pwError: '8~20자의 영문 대/소문자, 숫자, 특수문자를 사용하세요.',
    //   });
    //   setPwState(false);
    // }
  };
  //새비밀번호 체크
  const handleNewCheckPw = (pw: string) => {
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;
    if (pw.length == 0) {
      setError({
        ...error,
        newpwError: '비밀번호를 입력해주세요.',
      });
      setNewChPwState(false);
    } else if (pw == changePw.pw) {
      setError({
        ...error,
        newpwError: '기존 비밀번호와 일치합니다.',
      });
      setNewChPwState(false);
    } else if (passwordRegex.test(pw)) {
      setError({
        ...error,
        newpwError: '',
      });
      setChangePw({
        ...changePw,
        newPw: pw,
      });
      setNewChPwState(true);
    } else {
      setError({
        ...error,
        newpwError: '8~20자의 영문 대/소문자, 숫자, 특수문자를 사용하세요.',
      });
      setNewChPwState(false);
    }
  };
  //비밀번호 확인 체크
  const handleCheckChangePw = (pw: string) => {
    setChangePw({
      ...changePw,
      chPw: pw,
    });
    if (pw.length == 0) {
      setError({
        ...error,
        checkPwError: '비밀번호를 입력해주세요.',
      });
      setChPwState(false);
    } else if (pw !== changePw.newPw) {
      setError({
        ...error,
        checkPwError: '비밀번호가 일치하지 않습니다.',
      });
      setChPwState(false);
    } else {
      setError({
        ...error,
        checkPwError: '',
      });
      setChPwState(true);
    }
  };

  //비밀번호 변경
  const { mutate: ChangePwResetPwMutate, isLoading: isLoading } =
    useProfileChangePwMutation({
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
                  {'비밀번호가 변경되었습니다.'}
                </Box>
              ),
            });
            onClose();
            deleteUserInfo();
            deleteToken();
            document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            router.replace('/login');
            // setAuthEmailCheckDisable(true);
            // setEmailSend(false); //인증 완료 후 이메일 인증 코드 input 가리기
            // setSubmitAble(true);
          } else {
            setError({
              ...error,
              pwError: res.message,
            });
            // ToastComponent(res.message);
          }
        },
      },
    });
  useEffect(() => {
    if (pwState && chpwState && newchpwState) {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }
  }, [pwState, chpwState]);
  const handleChangePw = () => {
    const body = {
      password: changePw.pw,
      newPassword: changePw.newPw,
    };
    ChangePwResetPwMutate(body);
  };
  return (
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
              기존 비밀번호
            </Text>
            <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
              *
            </Text>
          </Flex>
          <InputBox
            type="password"
            placeholder="비밀번호 입력(8~20자의 영문 대/소문자, 숫자, 특수문자)"
            value={changePw.pw}
            onChange={(e) => {
              setChangePw({
                ...changePw,
                pw: e.target.value,
              });
              handleCheckPw(e.target.value);
            }}
            // mb={changePw.pw == '' ? '30px' : '0px'}
            w={'100%'}
          />
          {error.pwError && (
            <Text
              color={ColorRed}
              fontWeight={400}
              fontSize={'12px'}
              pt={'6px'}
            >
              {error.pwError}
            </Text>
          )}
          <Flex pb={'6px'} mt={'10px'}>
            <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
              새 비밀번호
            </Text>
            <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
              *
            </Text>
          </Flex>
          <InputBox
            type="password"
            placeholder="비밀번호 입력(8~20자의 영문 대/소문자, 숫자, 특수문자)"
            value={changePw.newPw}
            onChange={(e) => {
              setChangePw({
                ...changePw,
                newPw: e.target.value,
              });
              handleNewCheckPw(e.target.value);
            }}
            // value={request.loginId}
            // onChange={(e) => handleChangeInput('loginId', e.target.value)}
            // mb={'30px'}
            w={'100%'}
          />
          {error.newpwError && (
            <Text
              color={ColorRed}
              fontWeight={400}
              fontSize={'12px'}
              pt={'6px'}
            >
              {error.newpwError}
            </Text>
          )}
          <InputBox
            type="password"
            placeholder="비밀번호 재입력"
            value={changePw.chPw}
            onChange={(e) => {
              handleCheckChangePw(e.target.value);
            }}
            mt={'20px'}
            // mb={changePw.chPw == '' ? '10px' : '0px'}
            w={'100%'}
          />
          {error.checkPwError && (
            <Text
              color={ColorRed}
              fontWeight={400}
              fontSize={'12px'}
              pt={'6px'}
              // mb={changePw.chPw == '' ? '10px' : '20px'}
            >
              {error.checkPwError}
            </Text>
          )}
        </ModalBody>
        {/* <Flex pt={'30px'} alignItems={'center'} backgroundColor={ColorWhite}> */}
        <Box mt={'30px'}>
          <CustomButton
            text="확인"
            px="95px"
            bgColor={ColorRed}
            borderColor={ColorRed}
            fontSize="16px"
            color={ColorWhite}
            py="15px"
            fontWeight={700}
            disabled={!submitState}
            // onClick={onClose}
            onClick={() => handleChangePw()}
          />
        </Box>
        {/* </Flex> */}
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
export default ChangePasswordModal;
