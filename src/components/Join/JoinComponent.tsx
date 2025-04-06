'use client';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import JoinBasicInfoComponent from '@/components/Join/JoinBasicInfoComponent';
import JoinPartnerInfoComponent from '@/components/Join/JoinPartnerInfoComponent';
import JoinComponyInfoComponent from '@/components/Join/JoinComponyInfoComponent';
import JoinPdfComponent from '@/components/Join/JoinPdfComponent';
import { usePutJoinMutation } from '@/apis/join/JoinApi.mutation';
import { safeEncrypt } from '@/utils/crypto';

function JoinComponent() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const getType = searchParams.get('type');
  const [loading, setLoading] = useState(false);
  const [idDisable, setIdDisable] = useState(false); //아이디 중복확인 상태값
  const [authCheckDisable, setAuthCheckDisable] = useState(false); //본인인증 완료
  const [authEmailCheckDisable, setAuthEmailCheckDisable] = useState(false); //이메일 인증 완료
  const [joinInfo, setJoinInfo] = useState({
    type: Number(getType),
    authId: '',
    loginId: '',
    password: '',
    title: '',
    tel: '',
    info: '',
    bank: '',
    accountNumber: '',
    accountHolder: '',
    nameOfCompany: '',
    businessRegistrationNumber: '',
    nameOfRepresentative: '',
    registrationNumber: '',
    address: '',
    addressDetail: '',
    businessType: '',
    businessItem: '',
    businessTel: '',
    mailOrderSalesRegistrationNo: '',
    images: [
      {
        imagePath: '',
        thumbnailImagePath: '',
      },
    ],
    files: [
      {
        type: 0,
        filePath: '',
        thumbnailImagePath: '',
      },
    ],
    kakaoId: '',
  });

  const ToastComponent = (message: string) => {
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

  const handleClickNext = () => {
    if (joinInfo.loginId == '') {
      ToastComponent('아이디를 입력해주세요');
    } else if (!idDisable) {
      ToastComponent('아이디 중복확인 해주세요.');
    } else if (joinInfo.password == '') {
      ToastComponent('비밀번호를 입력해주세요');
    } else if (getType == '1' && !authCheckDisable) {
      ToastComponent('본인 인증을 해주세요.');
    } else if (getType == '2' && !authEmailCheckDisable) {
      ToastComponent('메일 인증을 해주세요.');
    } else if (joinInfo.title == '') {
      ToastComponent('파트너사명을 입력해주세요.');
    } else if (joinInfo.tel == '') {
      ToastComponent('전화번호를 입력해주세요.');
    } else if (joinInfo?.images[0].thumbnailImagePath == '') {
      ToastComponent('프로필 이미지를 확인해주세요.');
    } else if (joinInfo.info.length == 0) {
      ToastComponent('소개글을 입력해주세요.');
    } else if (joinInfo.nameOfCompany == '') {
      ToastComponent('상호명을 입력해주세요.');
    } else if (joinInfo.businessRegistrationNumber == '' && joinInfo.type == 1) {
      ToastComponent('사업자 번호를 입력해주세요.');
    } else if (joinInfo.businessType == '' && joinInfo.type == 1) {
      ToastComponent('업태를 입력해주세요.');
    } else if (joinInfo.businessItem == '' && joinInfo.type == 1) {
      ToastComponent('업종을 입력해주세요.');
      // } else if (joinInfo.mailOrderSalesRegistrationNo == '') {
      //   // api 없음
      //   ToastComponent('통신판매업신고번호를 입력해주세요.');
    } else if (joinInfo.nameOfRepresentative == '') {
      ToastComponent('대표자명 입력해주세요.');
    } else if (joinInfo.businessTel == '') {
      ToastComponent('대표 전화번호을 입력해주세요.');
    } else if (joinInfo.address == '') {
      ToastComponent('주소를 입력해주세요.');
    } else if (joinInfo.addressDetail == '' && joinInfo.type == 1) {
      ToastComponent('상세 주소를 입력해주세요.');
    } else if (joinInfo.files?.filter((prev) => prev.type == 1).length == 0 && joinInfo.type == 1) {
      ToastComponent('사업자등록증 파일첨부해주세요.');
      // } else if (joinInfo.files?.filter((prev) => prev.type == 2).length == 0) {
      //   ToastComponent('통신판매업신고증 파일첨부해주세요.');
    } else if (joinInfo.bank == '') {
      ToastComponent('은행명을 입력해주세요.');
    } else if (joinInfo.accountNumber == '') {
      ToastComponent('계좌번호를 입력해주세요.');
    } else if (joinInfo.accountHolder == '') {
      ToastComponent('예금주명을 입력해주세요.');
    } else if (joinInfo.files?.filter((prev) => prev.type == 3).length == 0) {
      ToastComponent('통장사본 파일첨부해주세요.');
    } else {
      setLoading(true);
      setJoinInfo({
        ...joinInfo,
        bank: safeEncrypt(joinInfo.bank),
        accountNumber: safeEncrypt(joinInfo.accountNumber),
        accountHolder: safeEncrypt(joinInfo.accountHolder),
        nameOfCompany: safeEncrypt(joinInfo.nameOfCompany),
        businessRegistrationNumber: safeEncrypt(joinInfo.businessRegistrationNumber),
        nameOfRepresentative: safeEncrypt(joinInfo.nameOfRepresentative),
        registrationNumber: safeEncrypt(joinInfo.registrationNumber)
      })
      joinMutate(joinInfo);
    }
  };

  //회원가입
  const { mutate: joinMutate, isLoading } = usePutJoinMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          router.replace('/join/success');
        } else {
          setLoading(false);
          toast({
            position: 'top',
            duration: 1000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {res.message}
              </Box>
            ),
          });
          // router.replace('/join/fail');
          // setErrorMsg(String(res.message));
        }
      },
      onError: (e) => {
        setLoading(false);
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

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  return (
    <>
      <LoadingModal
        children={loading}
        isOpen={loading}
        onClose={() => setLoading(false)}
      />
      <Box width="100vw" backgroundColor={ColorGray50}>
        <Flex
          pt={'150px'}
          // height={'100%'}
          pb={'170px'}
          alignItems="center"
          justifyContent="center"
          flexDirection={'column'}
        >
          <Text
            fontWeight={700}
            fontSize={'40px'}
            color={ColorBlack}
            pb={'50px'}
            // pt={'137px'}
          >
            회원가입
          </Text>
          <Box
            w={'568px'}
            bgColor={ColorWhite}
            borderRadius={'16px'}
            px={'50px'}
            py={'50px'}
            borderColor={ColorGray400}
            borderWidth={1}
            boxShadow={'3px 6px 20px #3737370D'}
          >
            {/* 아이디, 비밀번호, 연락처 */}
            <JoinBasicInfoComponent
              joinInfo={joinInfo}
              setJoinInfo={setJoinInfo}
              idDisable={idDisable}
              setIdDisable={setIdDisable}
              authCheckDisable={authCheckDisable}
              setAuthCheckDisable={setAuthCheckDisable}
              setLoading={setLoading}
              authEmailCheckDisable={authEmailCheckDisable}
              setAuthEmailCheckDisable={setAuthEmailCheckDisable}
            />

            {/* 파트너사명, 프로필사진, 소개글 */}
            <JoinPartnerInfoComponent
              joinInfo={joinInfo}
              setJoinInfo={setJoinInfo}
            />
            {/* 상호명, 사업자등록번호, 업태/업종, 통신판매업신고번호, 대표자, 대표 전화번호, 사업장주소 */}
            <JoinComponyInfoComponent
              joinInfo={joinInfo}
              setJoinInfo={setJoinInfo}
            />
            {/* 사업자등록증, 통신판매업신고증, 계좌, 통장사본 */}
            <JoinPdfComponent joinInfo={joinInfo} setJoinInfo={setJoinInfo} />
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
              onClick={handleClickNext}
            >
              <Text color={ColorWhite} fontWeight={800} fontSize={'16px'}>
                확인
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default JoinComponent;
