import {
  usePostAuthCheckMutation,
  usePostAuthEmailCheckMutation,
  usePostAuthEmailMutation,
  usePostAuthKeyMutation,
  usePostIdCheckMutation,
} from '@/apis/join/JoinApi.mutation';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import { ColorBlack, ColorRed, ColorWhite } from '@/utils/_Palette';
import { Box, Flex, Text, Textarea, useToast } from '@chakra-ui/react';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { JoinBody } from '@/apis/join/JoinApi.type';
import { RequestPayResponse } from '@/app/join/portone';

interface Props {
  joinInfo: JoinBody;
  setJoinInfo: React.Dispatch<React.SetStateAction<JoinBody>>;
  idDisable: boolean;
  setIdDisable: React.Dispatch<React.SetStateAction<boolean>>;
  authCheckDisable: boolean;
  setAuthCheckDisable: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  authEmailCheckDisable: boolean;
  setAuthEmailCheckDisable: React.Dispatch<React.SetStateAction<boolean>>;
}
function JoinBasicInfoComponent({
  joinInfo,
  setJoinInfo,
  idDisable,
  setIdDisable,
  setLoading,
  authCheckDisable,
  setAuthCheckDisable,
  authEmailCheckDisable,
  setAuthEmailCheckDisable,
}: Props) {
  const toast = useToast();
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const [merchantUid, setMerchantUid] = useState('');
  const [id, setId] = useState(''); // 아이디 중복확인 전
  const [checkPw, setCheckPw] = useState(''); //비밀번호 확인
  const [phoneNum, setPhoneNum] = useState(''); //핸드폰번호
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailAuthId, setEmailAuthId] = useState('');

  const [error, setError] = useState({
    idError: '',
    pwError: '',
    checkPwError: '',
    phoneError: '',
    emailError: '',
    emailCodeError: '',
  });
  const [data, setData] = useState({
    merchant_uid: '',
    phone: '',
    pg: '',
  });

  console.log('joinInfo', joinInfo);
  const ToastComponent = (message: string) => {
    const toast = useToast();
    return toast({
      position: 'top',
      duration: 2000,
      render: () => (
        <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
          {`${message}`}
        </Box>
      ),
    });
  };
  //아이디 중복확인
  const { mutate: IdCheckMutate, isLoading } = usePostIdCheckMutation({
    options: {
      onSuccess: (res) => {
        console.log('아이디 중복확인 : ', res);
        if (res.success) {
          setJoinInfo({
            ...joinInfo,
            loginId: id,
          });
          setError({
            ...error,
            idError: '',
          });
          setIdDisable(true);
        } else {
          setError({
            ...error,
            idError: res.message,
          });
        }
      },
    },
  });
  //아이디 중복확인 클릭시
  const handleCheckId = (e: string) => {
    IdCheckMutate(e);
  };
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
      setJoinInfo({
        ...joinInfo,
        password: pw,
      });
    } else {
      setError({
        ...error,
        pwError: '8~20자의 영문 대/소문자, 숫자, 특수문자를 사용하세요.',
      });
    }
  };
  //비밀번호 확인 체크
  const handleCheckChangePw = (pw: string) => {
    setCheckPw(pw);
    if (pw.length == 0) {
      setError({
        ...error,
        checkPwError: '비밀번호를 입력해주세요.',
      });
    } else if (pw !== joinInfo.password) {
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
      AuthKeyMutate(phone);
    }
  };

  //본인인증 키
  const { mutate: AuthKeyMutate, isLoading: AuthLoading } =
    usePostAuthKeyMutation({
      options: {
        onSuccess: (res) => {
          console.log('본인인증 키 : ', res);
          if (res.success) {
            setMerchantUid(res.data.merchantUid);
            setData({
              merchant_uid: res.data.merchantUid,
              phone: res.data.phone,
              pg: res.data.pg,
            });
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
  const { mutate: AuthCheckMutate, isLoading: AuthCheckLoading } =
    usePostAuthCheckMutation({
      options: {
        onSuccess: (res) => {
          console.log('본인인증 확인 : ', res);
          if (res.success) {
            setAuthCheckDisable(true);
            console.log('merchantUid', merchantUid);
            setJoinInfo({
              ...joinInfo,
              authId: merchantUid,
            });
          } else {
            ToastComponent(res.message);
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
      setMerchantUid(response.merchant_uid);
      console.log('body', body);
      AuthCheckMutate(body);
    }
    setLoading(false);
  }

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
      AuthEmailMutate(email);
    }
  };
  //이메일 인증 코드 발급
  const { mutate: AuthEmailMutate, isLoading: AuthEmailLoading } =
    usePostAuthEmailMutation({
      options: {
        onSuccess: (res) => {
          console.log('이메일 인증코드 발급 : ', res);
          if (res.success) {
            setEmailSend(true);
            setEmailAuthId(res.data.authId);
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
            // ToastComponent('이메일로 인증코드가 전송되었습니다.');
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
                  {res.message}
                </Box>
              ),
            });
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
        authId: emailAuthId,
        authCode: emailCode,
      };
      console.log('data', data);
      AuthEmailCodeMutate(data);
    }
  };
  //이메일 인증코드 확인
  const { mutate: AuthEmailCodeMutate, isLoading: AuthEmailCodeLoading } =
    usePostAuthEmailCheckMutation({
      options: {
        onSuccess: (res) => {
          console.log('이메일 인증코드 확인 : ', res);
          if (res.success) {
            setJoinInfo({
              ...joinInfo,
              authId: emailAuthId,
            });
            setAuthEmailCheckDisable(true);
            setEmailSend(false); //인증 완료 후 이메일 인증 코드 input 가리기
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
    <>
      <Flex pb={'6px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          아이디(이메일)
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex gap={'10px'} flexDirection={'row'} justifyContent={'space-between'}>
        <InputBox
          placeholder="아이디"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          disabled={idDisable}
          // mb={'10px'}
          w={'70%'}
        />
        <CustomButton
          bgColor={ColorBlack}
          color={ColorWhite}
          fontSize="15px"
          text={idDisable ? '변경' : '중복확인'}
          px={idDisable ? '43px' : '29px'}
          py="13px"
          borderColor={ColorBlack}
          onClick={() => {
            if (idDisable) {
              //중복확인 완료
              setIdDisable(false);
            } else {
              //중복확인 전
              handleCheckId(id);
            }
          }}
        />
      </Flex>
      {error.idError && (
        <Text color={ColorRed} fontWeight={400} fontSize={'12px'} pt={'6px'}>
          {error.idError}
        </Text>
      )}
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          비밀번호
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>
      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="비밀번호"
          value={joinInfo.password}
          onChange={(e) => {
            setJoinInfo({
              ...joinInfo,
              password: e.target.value,
            });
            handleCheckPw(e.target.value);
          }}
          type="password"
        />
      </Flex>
      {error.pwError && (
        <Text color={ColorRed} fontWeight={400} fontSize={'12px'} pt={'6px'}>
          {error.pwError}
        </Text>
      )}
      <Flex pb={'6px'} pt={'30px'}>
        <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
          비밀번호 확인
        </Text>
        <Text fontSize={'16px'} fontWeight={600} color={ColorRed}>
          *
        </Text>
      </Flex>

      <Flex flexDirection={'row'} justifyContent={'flex-end'}>
        <InputBox
          placeholder="비밀번호 재입력"
          type="password"
          onChange={(e) => {
            handleCheckChangePw(e.target.value);
          }}
        />
      </Flex>
      {error.checkPwError && (
        <Text color={ColorRed} fontWeight={400} fontSize={'12px'} pt={'6px'}>
          {error.checkPwError}
        </Text>
      )}

      {getType == '1' ? (
        <>
          <Flex pb={'6px'} pt={'30px'}>
            <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
              연락처
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
              placeholder="휴대폰번호입력"
              value={phoneNum}
              maxLength={11}
              onChange={(e) =>
                setPhoneNum(e.target.value.replace(/[^0-9]/g, ''))
              }
              // mb={'10px'}
              disabled={authCheckDisable}
              w={'70%'}
            />
            <CustomButton
              bgColor={ColorWhite}
              color={ColorRed}
              fontSize="15px"
              text="본인인증"
              px="29px"
              py="13px"
              borderColor={ColorRed}
              disabled={authCheckDisable}
              onClick={() => handlePhone(phoneNum)}
            />
          </Flex>

          {error.phoneError && (
            <Text
              color={ColorRed}
              fontWeight={400}
              fontSize={'12px'}
              pt={'6px'}
            >
              {error.phoneError}
            </Text>
          )}
        </>
      ) : (
        <>
          <Flex pb={'6px'} pt={'30px'}>
            <Text fontSize={'16px'} fontWeight={600} color={ColorBlack}>
              연락망
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
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // mb={'10px'}
              disabled={authEmailCheckDisable}
              w={'70%'}
            />
            <CustomButton
              bgColor={ColorWhite}
              color={ColorRed}
              fontSize="15px"
              text="메일인증"
              px="29px"
              py="13px"
              borderColor={ColorRed}
              disabled={authEmailCheckDisable}
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
                gap={'10px'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                mt={'15px'}
              >
                <InputBox
                  placeholder="이메일 인증번호 입력"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  // mb={'10px'}
                  disabled={authEmailCheckDisable}
                  w={'70%'}
                />
                <CustomButton
                  bgColor={ColorWhite}
                  color={ColorRed}
                  fontSize="15px"
                  text="인증"
                  px="42px"
                  py="13px"
                  borderColor={ColorRed}
                  onClick={() => handleEmailCodeCheck()}
                  disabled={authEmailCheckDisable}
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
    </>
  );
}

export default JoinBasicInfoComponent;
