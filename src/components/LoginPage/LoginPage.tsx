import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import authApi from '@apis/auth/AuthApi';
import { usePostLoginMutation } from '@apis/auth/AuthApi.mutation';

import AdminHeader from '@components/common/@Layout/AdminLayout/_fragments/AdminHeader';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import FormHelper from '@components/common/FormHelper';
import InputBox from '@components/common/Input';

import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorGray800,
  ColorGray900,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';
import { setToken, setUserInfo } from '@utils/localStorage/token';

import { getFcmToken, onMessageListener } from '../../../firebase';

import { useUserZuInfo } from '_store/UserZuInfo';
import BottomLayout from 'layout/BottomLayout';

interface LoginModel {
  loginId: string;
  password: string;
}
interface PayloadNotification {
  title: string;
  body: string;
}
interface MessagePayload {
  notification: PayloadNotification;
}
function LoginPage() {
  const toast = useToast();
  const router = useRouter();
  const [request, setRequest] = useState<LoginModel>({
    loginId: '',
    password: '',
  });
  const [checkbox, setCheckbox] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const toggleCheckbox = () => setCheckbox(!checkbox);
  const { setUserZuInfo } = useUserZuInfo((state) => state);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [fcmtoken, setFcmToken] = useState('');
  useEffect(() => {
    fcm();
  }, []);
  console.log('fcmtoken,', fcmtoken);
  const fcm = async () => {
    const fcmToken = await getFcmToken();
    if (fcmToken) {
      setFcmToken(fcmToken);
      console.log('FCM Token:', fcmToken);
      // 여기서 FCM 토큰을 서버로 전송하여 저장할 수 있습니다.
    }

    onMessageListener()
      .then((payload) => {
        console.log('Message received. ', payload);
        // 여기서 알림을 표시하거나 상태를 업데이트할 수 있습니다.
      })
      .catch((err) => console.log('Failed to receive message: ', err));
  };

  useEffect(() => {
    async function getMessageToken() {
      const token = await getFcmToken();
      console.log(token);
    }
    getMessageToken();
  }, []);
  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        console.log('Message received. ', payload);
        const { title, body } = payload.notification;
        if (Notification.permission === 'granted') {
          new Notification(title, { body });
        }
      })
      .catch((err) => console.log('Failed to receive message: ', err));
  }, []);
  // useEffect(() => {
  //   setTokenHandler();
  // }, []);
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await requestFCMToken();
  //     setFcmToken(token);
  //     if (token) {
  //       console.log('FCM Token:', token);
  //     }
  //   };

  //   fetchToken();
  // }, []);
  const { mutate: loginMutate, isLoading } = usePostLoginMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          const data = res.data;
          const param = {
            access: data?.accessToken ? data?.accessToken : '',
            refresh: data?.refreshToken ? data?.refreshToken : '',
          };
          setToken(param);
          setUserZuInfo({
            accessToken: data?.accessToken ? data?.accessToken : '',
            refreshToken: data?.refreshToken ? data?.refreshToken : '',
          });

          // setUserInfo(
          //   param
          // );

          router.push('/');
          setErrorMsg('');
        } else {
          setErrorMsg(String(res.message));
        }
      },
      onError: (e) => {
        toast({
          position: 'top',
          duration: 1000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              서버 오류! 잠시 후 다시시도해주세요.
            </Box>
          ),
        });
      },
    },
  });
  const handleClickLogin = () => {
    const body = {
      loginId: request.loginId,
      password: request.password,
    };

    loginMutate(body);
  };
  function handleChangeInput(key: string, value: string | number) {
    const newRequest = { ...request, [key]: value };

    setRequest(newRequest);
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      // enter 했을 때의 코드 작성
      // if(e.keyCode === 13) 도 사용가능하다.
      handleClickLogin();
    }
  };
  return (
    <Box width="100vw" backgroundColor={ColorGray50}>
      <Flex
        pt={'150px'}
        pb={'170px'}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w={'568px'}
          bgColor={ColorWhite}
          borderRadius={'16px'}
          px={'74px'}
          py={'70px'}
        >
          <Flex
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Image
              src={'/images/header/icon_logo_big.png'}
              width={300}
              height={66}
              alt="로고"
            />
            <Box
              bgColor={'rgba(255,223,219,0.38)'}
              borderRadius={'11px'}
              px={'6px'}
              py={'2px'}
              mt={'24px'}
              mb={'37px'}
            >
              <Text fontSize={'18px'} fontWeight={600} color={ColorRed}>
                파트너스
              </Text>
            </Box>
          </Flex>
          <FormHelper errorText="아이디를 입력해주세요." isInvalid={false}>
            <InputBox
              placeholder="아이디"
              value={request.loginId}
              onChange={(e) => handleChangeInput('loginId', e.target.value)}
              mb={'10px'}
            />
          </FormHelper>
          <FormHelper
            errorText="비밀번호를 입력해주세요."
            isInvalid={false}
            mb={'10px'}
          >
            <InputBox
              type="password"
              placeholder="비밀번호"
              value={request.password}
              onChange={(e) => handleChangeInput('password', e.target.value)}
              error={errorMsg}
              onKeyDown={handleKeyDown}
            />
          </FormHelper>
          <CheckBox
            children={'자동로그인'}
            onClick={() => toggleCheckbox()}
            checked={checkbox}
          />
          <Flex
            w={'100%'}
            bgColor={ColorRed}
            borderRadius={'10px'}
            h={'50px'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={'30px'}
            mb={'15px'}
            cursor={'pointer'}
            onClick={handleClickLogin}
          >
            <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
              로그인
            </Text>
          </Flex>
          {/* <Flex justifyContent={'space-between'}>
            <Box>
              <Text color={ColorGray700} fontSize={'14px'} fontWeight={500}>
                회원가입
              </Text>
            </Box>
            <Flex flexDirection={'row'}>
              <Box>
                <Text color={ColorGray700} fontSize={'14px'} fontWeight={500}>
                  아이디찾기
                </Text>
              </Box>
              <Box>
                <Text
                  color={ColorGray700}
                  fontSize={'14px'}
                  fontWeight={500}
                  px={'5px'}
                >
                  |
                </Text>
              </Box>
              <Box>
                <Text color={ColorGray700} fontSize={'14px'} fontWeight={500}>
                  비밀번호찾기
                </Text>
              </Box>
            </Flex>
          </Flex> */}
          <Box
            w={'100%'}
            height={'1px'}
            mt={'50px'}
            bgColor={ColorGray400}
          ></Box>

          <Flex pt={'20px'} justifyContent={'center'} alignItems={'center'}>
            <Text
              color={ColorGray700}
              fontSize={'14px'}
              fontWeight={500}
              pr={'10px'}
            >
              궁금하신게 있으신가요?
            </Text>
            <Box
              borderBottomWidth={1}
              borderBottomColor={ColorGray900}
              mb={0}
              pb={0}
              display={'block'}
              cursor={'pointer'}
              position={'relative'}
              onClick={() => setModal(!modal)}
            >
              <Text
                color={ColorGray900}
                fontSize={'14px'}
                fontWeight={500}
                mb={0}
                pb={0}
                lineHeight={'14px'}
              >
                문의하기
              </Text>
              {modal && (
                <Box
                  borderRadius={'10px'}
                  borderWidth={1}
                  borderColor={ColorGray400}
                  px={'30px'}
                  py={'20px'}
                  w={220}
                  bgColor={ColorWhite}
                  position={'absolute'}
                  left={0}
                  top={'25px'}
                >
                  <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                  >
                    <Text
                      color={ColorBlack}
                      fontWeight={700}
                      fontSize={'15px'}
                      mb={'15px'}
                    >
                      고객센터
                    </Text>
                    <Text
                      color={ColorGray800}
                      fontWeight={500}
                      fontSize={'14px'}
                    >
                      email.@email.com
                    </Text>
                    <Flex
                      borderColor={ColorGrayBorder}
                      borderWidth={1}
                      py={'13px'}
                      justifyContent={'center'}
                      width={'100%'}
                      borderRadius={'6px'}
                      mt={'15px'}
                    >
                      <Text
                        fontSize={'12px'}
                        color={ColorGray700}
                        fontWeight={400}
                      >
                        닫기
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
      {/* <AdminHeader />
      <Flex
        alignItems="center"
        justifyContent="center"
        height="calc(100% - 60px)"
        width="100%"
      >
        <Box width="402px">
          <Flex flexDirection="column" alignItems="center" marginBottom="30px">
            <Text color="primary.100" textStyle="lg">
              Admin
            </Text>
            <Image
              src="/images/login/logo.svg"
              width="294.25px"
              height="60.36px"
            />
          </Flex>
          <Flex flexDirection="column" gap="10px" marginBottom="20px">
            <FormHelper errorText="아이디를 입력해주세요.">
              <InputBox
                placeholder="아이디"
                value={request.loginId}
                onChange={(e) => handleChangeInput('loginId', e.target.value)}
              />
            </FormHelper>
            <FormHelper errorText="비밀번호를 입력해주세요.">
              <InputBox
                placeholder="비밀번호"
                value={request.password}
                onChange={(e) => handleChangeInput('password', e.target.value)}
              />
            </FormHelper>
          </Flex>
          <Box marginBottom="30px">
            <CheckBox checked={checkbox} onClick={toggleCheckbox}>
              아이디 저장
            </CheckBox>
          </Box>
          <Flex flexDirection="column" alignItems="center" gap="15">
            <Button
              width="100%"
              size="md"
              type="round"
              text="로그인"
              onClick={handleClickLogin}
            />
            <Text color="gray.700" textStyle="textActiveSm">
              아이디/비밀번호 찾기
            </Text>
          </Flex>
        </Box>
      </Flex> */}
    </Box>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <BottomLayout>{page}</BottomLayout>;
};
export default LoginPage;
