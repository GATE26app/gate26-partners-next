'use client';
import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import { usePostFindPwResetPwMutation } from '@/apis/join/JoinApi.mutation';

function FindPwChangeComponent() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getAuthId = searchParams.get('authId');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState({
    pwError: '',
    checkPwError: '',
  });
  const [submitAble, setSubmitAble] = useState(false);
  //비밀번호 체크
  const handleCheckPw = (pw: string) => {
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;
    if (pw.length == 0) {
      setError({
        ...error,
        pwError: '비밀번호를 입력해주세요.',
      });
    } else if (passwordRegex.test(pw)) {
      setError({
        ...error,
        pwError: '',
      });
      // setJoinInfo({
      //   ...joinInfo,
      //   password: pw,
      // });
    } else {
      setError({
        ...error,
        pwError: '8~20자의 영문 대/소문자, 숫자, 특수문자를 사용하세요.',
      });
    }
  };
  //비밀번호 확인 체크
  const handleCheckChangePw = (pw: string) => {
    setPasswordCheck(pw);
    if (pw.length == 0) {
      setError({
        ...error,
        checkPwError: '비밀번호를 입력해주세요.',
      });
    } else if (pw !== password) {
      setError({
        ...error,
        checkPwError: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      setError({
        ...error,
        checkPwError: '',
      });
    }
  };
  //비밀번호 변경
  const { mutate: AuthFindPwResetPwMutate, isLoading: AuthEmailCodeLoading } =
    usePostFindPwResetPwMutation({
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
            router.replace('/login');
            // setAuthEmailCheckDisable(true);
            // setEmailSend(false); //인증 완료 후 이메일 인증 코드 input 가리기
            // setSubmitAble(true);
          } else {
            // setError({
            //   ...error,
            //   emailCodeError: res.message,
            // });
            // ToastComponent(res.message);
          }
        },
      },
    });
  useEffect(() => {
    if (password == '' && passwordCheck == '') {
      setSubmitAble(false);
      // setError({
      //   ...error,
      //   passwordError:'비밀번호를 입력해주세요.'
      // })
    } else {
      setSubmitAble(true);
    }
  }, [password, passwordCheck]);
  const handleSubmit = () => {
    if (password == '' && passwordCheck == '') {
      // setSubmitAble(false);
      // setError({
      //   ...error,
      //   passwordError:'비밀번호를 입력해주세요.'
      // })
    } else {
      let body = {
        authId: String(getAuthId),
        password: password,
      };
      AuthFindPwResetPwMutate(body);
    }
  };
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
          비밀번호 재설정
        </Text>
        <Flex pb={'6px'} mt={'30px'}>
          <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
            새비밀번호
          </Text>
          <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
            *
          </Text>
        </Flex>
        <InputBox
          placeholder="비밀번호 입력(8~20자의 영문 대/소문자, 숫자, 특수문자)"
          // value={request.loginId}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleCheckPw(e.target.value);
          }}
          w={'100%'}
          mb={error.pwError == '' ? '30px' : '0px'}
        />
        {error.pwError && (
          <Text
            color={ColorRed}
            fontWeight={400}
            fontSize={'12px'}
            pt={'6px'}
            mb={'12px'}
          >
            {error.pwError}
          </Text>
        )}
        <InputBox
          placeholder="비밀번호 입력"
          value={passwordCheck}
          type="password"
          onChange={(e) => handleCheckChangePw(e.target.value)}
          mb={error.checkPwError == '' ? '60px' : '0px'}
          w={'100%'}
        />
        {error.checkPwError && (
          <Text
            color={ColorRed}
            fontWeight={400}
            fontSize={'12px'}
            pt={'6px'}
            mb={'40px'}
          >
            {error.checkPwError}
          </Text>
        )}

        <Box>
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
            onClick={() => handleSubmit()}
          />
        </Box>
        {/* <Flex
          w={'100%'}
          bgColor={ColorRed}
          borderRadius={'10px'}
          h={'50px'}
          justifyContent={'center'}
          alignItems={'center'}
          cursor={'pointer'}
          // onClick={() => router.back()}
        >
          <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
            확인
          </Text>
        </Flex> */}
      </Flex>
    </Flex>
  );
}

export default FindPwChangeComponent;
