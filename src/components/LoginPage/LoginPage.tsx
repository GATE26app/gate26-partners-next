import React, { useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import AdminHeader from '@components/common/@Layout/AdminLayout/_fragments/AdminHeader';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import FormHelper from '@components/common/FormHelper';
import InputBox from '@components/common/Input';

function LoginPage() {
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const toggleCheckbox = () => setCheckbox(!checkbox);
  return (
    <Box width="100vw" height="100vh" backgroundColor="google.600">
      <AdminHeader />
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
              <InputBox placeholder="아이디" />
            </FormHelper>
            <FormHelper errorText="비밀번호를 입력해주세요.">
              <InputBox placeholder="비밀번호" />
            </FormHelper>
          </Flex>
          <Box marginBottom="30px">
            <CheckBox checked={checkbox} onClick={toggleCheckbox}>
              아이디 저장
            </CheckBox>
          </Box>
          <Flex flexDirection="column" alignItems="center" gap="15">
            <Button width="100%" size="md" type="round" text="로그인" />
            <Text color="gray.700" textStyle="textActiveSm">
              아이디/비밀번호 찾기
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default LoginPage;
