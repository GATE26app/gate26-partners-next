'use client';
import { useSettingStateZuInfo } from '@/_store/SettingStateInfo';
import { useProfileDetailMutation } from '@/apis/setting/SettingApi.mutation';
import { ProfileBodyType } from '@/apis/setting/SettingApi.type';
import BasicInfo from '@/components/Setting/BasicInfo';
import BusinessInfo from '@/components/Setting/BusinessInfo';
import DeliveryInfo from '@/components/Setting/DeliveryInfo';
import ProfileInfo from '@/components/Setting/ProfileInfo';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import {
  ColorBlack,
  ColorBlack00,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorRed50,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ServiceInfo from '@/components/Setting/ServiceInfo';

function page() {
  const { settingStateInfo, setSettingStateInfo } = useSettingStateZuInfo(
    (state) => state,
  );

  const [menu, setMenu] = useState(1);
  const [password, setPassword] = useState('');
  const [successState, setSuccessState] = useState(false);
  const [error, setError] = useState('');

  const [info, setInfo] = useState<ProfileBodyType>();
  //프로필 상세 - 비밀번호 입력
  const { mutate: IdCheckMutate, isLoading } = useProfileDetailMutation({
    options: {
      onSuccess: (res) => {
        setSettingStateInfo({
          settingState: false,
        });
        if (res.success) {
          setError('');
          setSuccessState(true);
          setInfo(res.data);
        } else {
          setError(res.message);
          setSuccessState(false);
        }
      },
    },
  });

  const onClickPwCheck = () => {
    if (password == '') {
      setError('비밀번호를 입력해주세요.');
    } else {
      let body = {
        password: password,
      };
      IdCheckMutate(body);
    }
  };

  return (
    <Box w={'100%'}>
      <Flex alignItems={'center'} mb={'26px'}>
        <Image
          src={'/images/Page/ico_setting.png'}
          width={'20px'}
          height={'20px'}
          alt="주문관리"
        />
        <Text
          fontWeight={800}
          fontSize={'22px'}
          color={ColorBlack00}
          pl={'10px'}
        >
          설정
        </Text>
      </Flex>
      {successState ? (
        <>
          <Flex mb={'22px'}>
            <Flex
              bgColor={ColorGray50}
              borderRadius={'12px'}
              flexDirection={'row'}
            >
              {/* {menu == 1 ? :} */}
              <Flex
                borderRadius={'12px'}
                py={'10px'}
                px={'11px'}
                bgColor={ColorGray50}
              >
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={menu == 1 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setMenu(1)}
                  cursor={'pointer'}
                >
                  <Text
                    color={menu == 1 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    기본정보
                  </Text>
                </Flex>
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={menu == 2 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setMenu(2)}
                  cursor={'pointer'}
                >
                  <Text
                    color={menu == 2 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    프로필정보
                  </Text>
                </Flex>
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={menu == 3 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setMenu(3)}
                  cursor={'pointer'}
                >
                  <Text
                    color={menu == 3 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    사업자정보
                  </Text>
                </Flex>
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={menu == 4 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setMenu(4)}
                  cursor={'pointer'}
                >
                  <Text
                    color={menu == 4 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    배송비 정책
                  </Text>
                </Flex>
                <Flex
                  w={'143px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  bgColor={menu == 5 ? ColorRed50 : ''}
                  borderRadius={'12px'}
                  pt={'13px'}
                  pb={'12px'}
                  onClick={() => setMenu(5)}
                  cursor={'pointer'}
                >
                  <Text
                    color={menu == 5 ? ColorRed : ColorGray700}
                    fontWeight={600}
                    fontSize={'16px'}
                  >
                    서비스수수료
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {menu == 1 && <BasicInfo info={info} />}
          {menu == 2 && <ProfileInfo info={info} />}
          {menu == 3 && <BusinessInfo info={info} />}
          {menu == 4 && <DeliveryInfo info={info} />}
          {menu == 5 && <ServiceInfo info={info} />}
        </>
      ) : (
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          minH={'calc(100vh - 600px)'}
        >
          <Flex
            borderRadius={'16px'}
            borderWidth={1}
            borderColor={ColorGray400}
            p={'70px'}
            flexDirection={'column'}
          >
            <Text
              color={ColorBlack}
              fontWeight={700}
              fontSize={'24px'}
              mb={'28px'}
            >
              회원정보 확인
            </Text>
            <Flex>
              <InputBox
                w={'320px'}
                placeholder="비밀번호 입력"
                mr={'10px'}
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <CustomButton
                text="확인"
                fontSize="15px"
                color={ColorRed}
                borderColor={ColorRed}
                bgColor={ColorWhite}
                px="42px"
                py="12px"
                onClick={() => onClickPwCheck()}
              />
            </Flex>
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
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

export default page;
