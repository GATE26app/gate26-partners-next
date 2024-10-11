'use client';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';

import { usePostLoginMutation } from '@/apis/auth/AuthApi.mutation';

import CheckBox from '@/components/common/CheckBox';
import FormHelper from '@/components/common/FormHelper';
import InputBox from '@/components/common/Input';

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
} from '@/utils/_Palette';
import {
  getSendBirdToken,
  setSendBirdToken,
  setToken,
  setUserInfo,
} from '@/utils/localStorage/token';

import { getFcmToken } from '../../../firebase';

import { useAlarmZuInfo } from '@/_store/AlarmInfo';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { TokenType } from '@/apis/auth/AuthApi.type';
import { useQuery } from 'react-query';
import goodsApi from '@/apis/goods/GoodsApi';
import sendBirdApi from '@/apis/sendbird/SendBirdApi';

interface LoginModel {
  loginId: string;
  password: string;
}
// interface PayloadNotification {
//   title: string;
//   body: string;
// }
// interface MessagePayload {
//   notification: PayloadNotification;
// }
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
  const { userZuInfo, setUserZuInfo } = useUserZuInfo((state) => state);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [fcmtoken, setFcmToken] = useState('');
  const { setAlarmInfo } = useAlarmZuInfo((state) => state);
  const [sendBirdTokenState, setSendBirdTokenState] = useState(false);

  useEffect(() => {
    fcm();
  }, []);
  const fcm = async () => {
    const fcmToken = await getFcmToken();
    if (fcmToken) {
      setUserZuInfo({
        fcmToken: fcmToken ? fcmToken : '',
      });
      setFcmToken(fcmToken);
      console.log('FCM Token:', fcmToken);
      // 여기서 FCM 토큰을 서버로 전송하여 저장할 수 있습니다.
    }
  };

  function requestPermission() {
    // console.log('권한 요청 중...');
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // console.log('알림 권한이 허용됨');
          // FCM 메세지 처리
        } else {
          console.log('알림 권한 허용 안됨');
        }
      });
    }
  }
  requestPermission();

  // 1.최초 로그인시 샌드버드 토큰 발급 > 로컬에 담기
  // 2.로컬에 있는 지 확인 , expire_at 확인 후 7일 지났는지 확인 (수시로 발급받으면 안됨. 정지당함.)
  // 3.토큰 유효하지 않을 경우 토큰 재발급
  useEffect(() => {
    // console.log('getSendBirdToken().expiresAt', getSendBirdToken().expiresAt);
    // console.log('Date.now()', Date.now());
    // console.log(
    //   'getSendBirdToken().expiresAt < Date.now()',
    //   getSendBirdToken().expiresAt < Date.now(),
    // );
  }, []);
  const { data: SendBirdTokenData, error } = useQuery(
    ['GET_GOODSDETAIL'],
    () => sendBirdApi.getSendBirdToken(),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!sendBirdTokenState,
    },
  );
  useEffect(() => {
    if (SendBirdTokenData !== undefined && sendBirdTokenState) {
      console.log('SendBirdTokenData', SendBirdTokenData);
      setSendBirdToken({
        sendBird: SendBirdTokenData.data.token,
        expiresAt: SendBirdTokenData.data.expires_at,
        user_id: SendBirdTokenData.data.user_id,
      });
      router.push('/');
    }
  }, [SendBirdTokenData]);

  const { mutate: loginMutate, isLoading } = usePostLoginMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          const data = res.data;
          document.cookie = `auth=${data?.accessToken}`;
          const param = {
            fcm: fcmtoken,
            access: data?.accessToken ? data?.accessToken : '',
            refresh: data?.refreshToken ? data?.refreshToken : '',
          };
          setToken(param);
          setUserZuInfo({
            accessToken: data?.accessToken ? data?.accessToken : '',
            refreshToken: data?.refreshToken ? data?.refreshToken : '',
            userId: request.loginId,
          });
          if (userZuInfo.userId !== request.loginId) {
            setSendBirdTokenState(true);
          } else {
            if (getSendBirdToken().expiresAt < Date.now()) {
              console.log('샌드버드 토큰 재발급');
              // ReTokenFun();
              setSendBirdTokenState(true);
            } else {
              setSendBirdTokenState(false);
              router.push('/');
              // ReTokenFun();
            }
          }

          // setSendBirdToken({
          //   sendBird:
          //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoyMDc1MTEzODgsInYiOjIsImUiOjE3MjYxMDg3MDh9.tOHIkIJUMh18nNgHG8gXgrahKFoWe9jaIY8cSRwxzsw',
          //   expiresAt: 1726108708000,
          //   user_id: '9f86f694-4f22-438d-8672-e95a5121d3c7',
          // });

          setErrorMsg('');
        } else {
          if (res.code == 'A023') {
            router.replace(`/join/fail?message=${res.message}`);
          } else {
            setErrorMsg(String(res.message));
          }
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
      fcmToken: fcmtoken,
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
              src={'/images/icon_logo_big.png'}
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
          <Flex justifyContent={'space-between'}>
            <Box cursor={'pointer'} onClick={() => router.push('/join/terms')}>
              <Text color={ColorGray700} fontSize={'14px'} fontWeight={500}>
                회원가입
              </Text>
            </Box>
            <Flex flexDirection={'row'}>
              <Box
                cursor={'pointer'}
                onClick={() => router.push('/findId/select')}
              >
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
              <Box
                cursor={'pointer'}
                onClick={() => router.push('/findPw/select')}
              >
                <Text color={ColorGray700} fontSize={'14px'} fontWeight={500}>
                  비밀번호찾기
                </Text>
              </Box>
            </Flex>
          </Flex>
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
                      apps@asianaidt.com
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

export default LoginPage;
