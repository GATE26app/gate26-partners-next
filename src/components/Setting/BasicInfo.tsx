import {
  ColoLineGray,
  ColorBlack,
  ColorGray200,
  ColorGray600,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CustomButton from '../common/CustomButton';
import RetireModal from '../common/Modal/RetireModal';
import PassModal from '../common/Modal/PassModal';
import { ProfileBodyType } from '@/apis/setting/SettingApi.type';
import InputBox from '../common/Input';
import { useProfileChangePwMutation } from '@/apis/setting/SettingApi.mutation';

import { deleteToken, deleteUserInfo } from '@/utils/localStorage/token';
import { useRouter } from 'next/navigation';
import ChangePasswordModal from '../common/Modal/ChangePasswordModal';
import { safeDecryptAndParse } from '@/utils/crypto';

interface Props {
  info: ProfileBodyType | undefined;
}
function BasicInfo({ info }: Props) {
  const [retireModal, setRetireModal] = useState(false);
  const [chagnePassModal, setChangePassModal] = useState(false);

  return (
    <>
      <RetireModal isOpen={retireModal} onClose={() => setRetireModal(false)} />
      {/* <PassModal
        isOpen={passModal}
        onClose={() => setPassModal(false)}
        getType="1"
      /> */}
      <ChangePasswordModal
        isOpen={chagnePassModal}
        onClose={() => setChangePassModal(false)}
      />
      <Flex
        borderRadius={'12px'}
        borderColor={ColoLineGray}
        borderWidth={1}
        w={'100%'}
        p={'40px'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            아이디
          </Text>
          <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
            {info?.loginId}
          </Text>
        </Flex>
        <Flex
          flexDirection={'row'}
          pb={'30px'}
          alignItems={'flex-start'}
          borderBottomWidth={1}
          borderBottomColor={ColoLineGray}
        >
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
            flexShrink={0}
            pt={'15px'}
          >
            비밀번호
          </Text>
          <CustomButton
            text="변경"
            borderRadius="10px"
            borderColor={ColorRed}
            color={ColorWhite}
            fontSize="15px"
            bgColor={ColorRed}
            px="49px"
            py="13px"
            onClick={() => setChangePassModal(true)}
          />
          {/* <Flex flexDirection={'row'} w={'100%'} alignItems={'flex-start'}>
            <Flex flexDirection={'column'} w={'50%'}>
              <InputBox
                w={'300px'}
                placeholder="비밀번호"
                value={changePw.pw}
                onChange={(e) => {
                  setChangePw({
                    ...changePw,
                    pw: e.target.value,
                  });
                  handleCheckPw(e.target.value);
                }}
                type="password"
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
            </Flex>
            <Text
              pt={'15px'}
              fontWeight={600}
              fontSize={'15px'}
              color={ColorBlack}
              w={'110px'}
              flexShrink={0}
            >
              비밀번호 확인
            </Text>
            <Flex w={'50%'} alignItems={'flex-start'}>
              <Flex flexDirection={'column'} mr={'10px'}>
                <InputBox
                  w={'300px'}
                  placeholder="비밀번호 재입력"
                  type="password"
                  value={changePw.chPw}
                  onChange={(e) => {
                    handleCheckChangePw(e.target.value);
                  }}
                />
                {error.checkPwError && (
                  <Text
                    color={ColorRed}
                    fontWeight={400}
                    fontSize={'12px'}
                    pt={'6px'}
                  >
                    {error.checkPwError}
                  </Text>
                )}
              </Flex>
              <CustomButton
                text="변경"
                borderRadius="10px"
                borderColor={ColorRed}
                color={ColorWhite}
                fontSize="15px"
                bgColor={ColorRed}
                px="49px"
                py="13px"
                disabled={!submitState}
                onClick={() => handleChangePw()}
              />
            </Flex>
          </Flex> */}
        </Flex>
        <Flex
          flexDirection={'row'}
          pb={'30px'}
          alignItems={'center'}
          mt={'30px'}
        >
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            구분
          </Text>
          <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
            {info?.type == 1 ? '국내사업자' : '해외사업자'}
          </Text>
        </Flex>
        <Flex flexDirection={'row'} pb={'30px'} alignItems={'center'}>
          <Text
            fontWeight={600}
            fontSize={'15px'}
            color={ColorBlack}
            w={'110px'}
          >
            {info?.type == 1 ? '연락처' : '이메일'}
          </Text>
          <Flex
            px={'15px'}
            py={'13px'}
            bgColor={ColorGray200}
            borderRadius={'10px'}
            w={'278px'}
          >
            <Text fontWeight={400} fontSize={'15px'} color={ColorBlack}>
              {info?.type == 1 ? safeDecryptAndParse(info?.hp) : info?.authEmail}
            </Text>
          </Flex>
        </Flex>
        <Text
          textDecoration={'underline'}
          color={ColorGray600}
          fontSize={'15px'}
          fontWeight={600}
          cursor={'pointer'}
          onClick={() => setRetireModal(true)}
        >
          탈퇴요청
        </Text>
      </Flex>
    </>
  );
}

export default BasicInfo;
