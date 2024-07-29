'use client';
import {
  ColorBlack,
  ColorGray400,
  ColorGray50,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import {
  usePosFindPwtAuthCheckMutation,
  usePostFindPwAuthEmailCheckMutation,
  usePostFindPwAuthEmailMutation,
  usePostFindPwAuthKeyMutation,
} from '@/apis/join/JoinApi.mutation';
import { RequestPayResponse } from '@/app/join/portone';

function FindPwComponent() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const [loading, setLoading] = useState(false);
  const [phoneNum, setPhoneNum] = useState(''); //핸드폰번호
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [userId, setUserId] = useState('');
  const [merchantUid, setMerchantUid] = useState('');
  const [findId, setfindId] = useState('');
  const [emailSend, setEmailSend] = useState(false);
  const [submitAble, setSubmitAble] = useState(false);
  const [authCheckDisable, setAuthCheckDisable] = useState(false); //본인인증 완료
  const [error, setError] = useState({
    idError: '',
    phoneError: '',
    emailError: '',
    emailCodeError: '',
  });

  // 핸드폰번호 확인
  const handlePhone = (phone: string) => {
    let result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    console.log('phone', phone);
    if (phone == '') {
      setError({
        ...error,
        phoneError: '핸드폰번호를 입력해주세요.',
      });
    } else if (!result.test(phone)) {
      setError({
        ...error,
        phoneError: '올바르지 않는 번호입니다.',
      });
    } else {
      setError({
        ...error,
        phoneError: '',
      });
      setLoading(true);
      AuthFIndPwKeyMutate(phone);
    }
  };

  //본인인증 키
  const { mutate: AuthFIndPwKeyMutate, isLoading: AuthLoading } =
    usePostFindPwAuthKeyMutation({
      options: {
        onSuccess: (res) => {
          console.log('본인인증 키 : ', res);
          if (res.success) {
            setMerchantUid(res.data.merchantUid);

            onClickIMP(res.data.merchantUid, res.data.phone, res.data.pg);
          } else {
            setLoading(false);
            setError({
              ...error,
              phoneError: res.message,
            });
          }
        },
      },
    });

  //본인인증 확인
  const { mutate: AuthFindPwCheckMutate, isLoading: AuthCheckLoading } =
    usePosFindPwtAuthCheckMutation({
      options: {
        onSuccess: (res) => {
          console.log('본인인증 확인 : ', res);
          if (res.success) {
            setSubmitAble(true);
            setAuthCheckDisable(true);
            setfindId(res.data.loginId);
            // setfindId(res.data.)
          } else {
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
                  {`${res.message}`}
                </Box>
              ),
            });
            // ToastComponent(res.message);
          }
        },
      },
    });

  //본인인증
  const onClickIMP = (merchant_uid: string, phone: string, pg: string) => {
    if (!window.IMP) return;
    const { IMP } = window;
    // 고유 코드
    const userCode = 'imp15848657';
    IMP.init(userCode);

    const info = {
      merchant_uid: merchant_uid,
      phone: phone,
      pg: pg,
    };
    IMP.certification(info, callback);
    setLoading(false);
  };

  /* 본인인증 후 콜백함수 */
  function callback(response: RequestPayResponse) {
    console.log('response', response);
    if (
      response.success &&
      response.imp_uid !== undefined &&
      response.imp_uid !== null
    ) {
      let body = {
        authId: response.merchant_uid,
        impUid: response.imp_uid,
      };
      // setMerchantUid(response.merchant_uid);
      console.log('body', body);
      AuthFindPwCheckMutate(body);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (authCheckDisable && userId !== '') {
      setSubmitAble(true);
    } else {
      setSubmitAble(false);
    }
  }, [authCheckDisable, userId]);

  // 이메일 확인
  const hadnleEmail = () => {
    let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (email == '') {
      setError({
        ...error,
        emailError: '이메일을 입력해주세요.',
      });
    } else if (!email_regex.test(email)) {
      setError({
        ...error,
        emailError: '이메일이 올바르지 않습니다.',
      });
    } else {
      AuthFindPwEmailMutate(email);
    }
  };
  //이메일 인증 코드 발급
  const { mutate: AuthFindPwEmailMutate, isLoading: AuthEmailLoading } =
    usePostFindPwAuthEmailMutation({
      options: {
        onSuccess: (res) => {
          console.log('이메일 인증코드 발급 : ', res);
          if (res.success) {
            setEmailSend(true);
            setMerchantUid(res.data.authId);
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
                  {'이메일로 인증코드가 전송되었습니다.'}
                </Box>
              ),
            });
          } else {
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
                  {`${res.message}`}
                </Box>
              ),
            });
            // ToastComponent(res.message);
          }
        },
      },
    });

  const handleEmailCodeCheck = () => {
    if (emailCode == '') {
      setError({
        ...error,
        emailCodeError: '이메일 인증코드를 입력해주세요.',
      });
    } else {
      let data = {
        authId: merchantUid,
        authCode: emailCode,
      };
      console.log('data', data);
      AuthFindPwEmailCodeMutate(data);
    }
  };
  //이메일 인증코드 확인
  const { mutate: AuthFindPwEmailCodeMutate, isLoading: AuthEmailCodeLoading } =
    usePostFindPwAuthEmailCheckMutation({
      options: {
        onSuccess: (res) => {
          console.log('이메일 인증코드 확인 : ', res);
          if (res.success) {
            // setAuthEmailCheckDisable(true);
            setEmailSend(false); //인증 완료 후 이메일 인증 코드 input 가리기
            setSubmitAble(true);
          } else {
            setError({
              ...error,
              emailCodeError: res.message,
            });

            // ToastComponent(res.message);
          }
        },
      },
    });

  return (
    <Flex
      width="100vw"
      backgroundColor={ColorGray50}
      height={'calc(100vh - 323px)'}
      pt={'150px'}
      // height={'100%'}
      pb={'170px'}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w={'568px'}
        bgColor={ColorWhite}
        borderRadius={'16px'}
        px={'70px'}
        py={'70px'}
        borderColor={ColorGray400}
        borderWidth={1}
        boxShadow={'3px 6px 20px #3737370D'}
        // alignItems="center"
        flexDirection={'column'}
      >
        <Text fontWeight={700} fontSize={'28px'} color={ColorBlack}>
          비밀번호 찾기
        </Text>
        <Flex pb={'6px'} mt={'30px'}>
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            // mb={'10px'}
            w={'100%'}
          />
        </Flex>
        {getType == '1' ? (
          <>
            <Flex pb={'6px'} pt={'20px'}>
              <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
                연락처
              </Text>
              <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
                *
              </Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'space-between'}>
              <InputBox
                // w={'320px'}
                w={'71%'}
                placeholder="'-' 없이 숫자만 입력"
                mr={'10px'}
                value={phoneNum}
                disabled={authCheckDisable}
                onChange={(e) =>
                  setPhoneNum(e.target.value.replace(/[^0-9]/g, ''))
                }
              />
              <CustomButton
                text="본인인증"
                fontSize="15px"
                color={ColorRed}
                borderColor={ColorRed}
                bgColor={ColorWhite}
                px="29px"
                py="14px"
                onClick={() => handlePhone(phoneNum)}
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
            <Flex w={'100%'} justifyContent={'space-between'}>
              <InputBox
                // w={'320px'}
                w={'71%'}
                placeholder="이메일 입력"
                mr={'10px'}
                value={email}
                disabled={submitAble}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomButton
                text="메일인증"
                fontSize="15px"
                color={ColorRed}
                borderColor={ColorRed}
                bgColor={ColorWhite}
                px="29px"
                py="14px"
                onClick={() => hadnleEmail()}
              />
            </Flex>
            {error.emailError && (
              <Text
                color={ColorRed}
                fontWeight={400}
                fontSize={'12px'}
                pt={'6px'}
              >
                {error.emailError}
              </Text>
            )}
            {emailSend && (
              <>
                <Flex
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  mt={'15px'}
                >
                  <InputBox
                    placeholder="이메일 인증번호 입력"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    // mb={'10px'}
                    // disabled={authEmailCheckDisable}
                    w={'71%'}
                  />
                  <CustomButton
                    bgColor={ColorWhite}
                    color={ColorRed}
                    fontSize="15px"
                    text="인증"
                    px="41px"
                    py="13px"
                    borderColor={ColorRed}
                    onClick={() => handleEmailCodeCheck()}
                    // disabled={authEmailCheckDisable}
                  />
                </Flex>
                {error.emailCodeError && (
                  <Text
                    color={ColorRed}
                    fontWeight={400}
                    fontSize={'12px'}
                    pt={'6px'}
                  >
                    {error.emailCodeError}
                  </Text>
                )}
              </>
            )}
          </>
        )}

        <Box mt={'40px'}>
          <CustomButton
            disabled={!submitAble}
            text="확인"
            fontSize="16px"
            fontWeight={800}
            // py=""
            py="16px"
            color={ColorWhite}
            borderColor={ColorRed}
            bgColor={ColorRed}
            borderRadius={'10px'}
            onClick={() => router.push(`/findPw/change?authId=${merchantUid}`)}
          />
        </Box>
        {/* <Flex
          w={'100%'}
          bgColor={ColorRed}
          borderRadius={'10px'}
          h={'50px'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'40px'}
          cursor={'pointer'}
          
          // onClick={() => router.push('/findPw/change')}
        >
          <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
            확인
          </Text>
        </Flex> */}
      </Flex>
    </Flex>
  );
}

export default FindPwComponent;
