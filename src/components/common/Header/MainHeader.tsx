import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { useGetUserQuery } from '@/apis/user/UserApi.query';

import {
  ColorBlack,
  ColorGray400,
  ColorGray900,
  ColorMainBackBule,
  ColorWhite,
} from '@/utils/_Palette';
import { getImagePath, imgPath } from '@/utils/format';
import {
  deleteToken,
  deleteUserInfo,
  getToken,
} from '@/utils/localStorage/token';

import { useAlarmZuInfo } from '@/_store/AlarmInfo';
import AlarmModal from '../Modal/AlarmModal';
import { usePartnerZuInfo } from '@/_store/PartnerInfo';
import ChatComponent from '@/components/Chat/ChatComponent';
// import { cookies } from 'next/headers';

function MainHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getSendBird = searchParams.get('sendBird');
  const getSendbirdUrl = searchParams.get('sendbirdUrl');
  const { setPartnerZuInfo } = usePartnerZuInfo((state) => state);
  const { alarmInfo, setAlarmInfo } = useAlarmZuInfo((state) => state);
  const [alram, setAlram] = useState(false);
  const [chat, setChat] = useState(false);
  const [logout, setLogout] = useState(false);
  const [alramModal, setAlramModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const onLogout = () => {
    deleteUserInfo();
    deleteToken();
    document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    // cookies().delete('token');
    router.push('/login');
  };
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/header/icon_header_user.png';
  };
  const { data } = useGetUserQuery({
    options: {
      enabled: !!getToken().access,
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      onSuccess: (res: any) => {
        if (res.success == true) {
          setPartnerZuInfo(res.data);
          //  setAllList(res.data);
          //    if (res.data) {
          //   setLocationList(res.data);
          // }
        }
      },
    },
  });
  useEffect(() => {
    console.log('getSendbirdUrl', getSendbirdUrl);
    console.log('getSendBird', getSendBird);
    if (getSendBird == 'true') {
      setChat(true);
    }
    if (getSendbirdUrl) {
      setChat(true);
    }
  }, []);

  return (
    <>
      <Flex
        justifyContent={'flex-end'}
        py={'20px'}
        pr={'60px'}
        alignItems={'center'}
        cursor={'pointer'}
        position={'sticky'}
        bgColor={ColorMainBackBule}
        top={'0px'}
        zIndex={999}
      >
        <Flex
          alignItems={'center'}
          onClick={() => setLogout(!logout)}
          position={'relative'}
          pr={'25px'}
        >
          <Box borderRadius={'50px'} overflow={'hidden'} w={'32px'} h={'32px'}>
            {/* <Image
              src={
                data?.data.images !== undefined && data?.data.images.length > 0
                  ? `${imgPath()}${data?.data.images[0].thumbnailImagePath}`
                  : '/images/header/icon_header_user.png'
              }
              width={32}
              height={32}
              alt="로고"
            /> */}
            <img
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'cover',
              }}
              src={
                data?.data.images !== undefined && data?.data.images.length > 0
                  ? getImagePath(data?.data.images[0].thumbnailImagePath)
                  : '/images/header/icon_header_user.png'
              }
              onError={addDefaultImg}
              alt="이미지 업로드"
            />
          </Box>

          <Text
            fontWeight={700}
            fontSize={'16px'}
            color={ColorBlack}
            pl={'10px'}
            pr={'5px'}
          >
            {data?.data.title}님 반갑습니다.
          </Text>
          <Image
            src={'/images/header/icon_arrow_down.png'}
            width={10}
            height={10}
            alt="로고"
            priority={true}
          />
          {logout && (
            <Flex
              position={'absolute'}
              bgColor={ColorWhite}
              top={8}
              right={0}
              borderWidth={1}
              borderColor={ColorGray400}
              px={'20px'}
              py={'10px'}
              borderRadius={'8px'}
              onClick={() => onLogout()}
            >
              <Text>로그아웃</Text>
            </Flex>
          )}
        </Flex>
        <Box pr={'20px'} cursor={'pointer'}>
          {chat ? (
            <Image
              src={'/images/header/ch_on.png'}
              width={49}
              height={49}
              alt="로고"
              onClick={() => setChat(!chat)}
            />
          ) : (
            <Image
              src={'/images/header/icon_chatting_off.png'}
              width={49}
              height={49}
              alt="로고"
              onClick={() => setChat(!chat)}
            />
          )}
        </Box>
        <Box cursor={'pointer'}>
          {alarmInfo.alarm ? (
            <Image
              src={'/images/header/icon_alarm_on.png'}
              width={49}
              height={49}
              alt="로고"
              onClick={() => setAlramModal(!alramModal)}
            />
          ) : (
            <Image
              src={'/images/header/icon_alarm_off.png'}
              width={49}
              height={49}
              alt="로고"
              onClick={() => setAlramModal(!alramModal)}
            />
          )}
        </Box>
        {alramModal && (
          <AlarmModal
            isOpen={alramModal}
            onClose={() => setAlramModal(false)}
          />
        )}
        {chat && <ChatComponent />}
      </Flex>
    </>
  );
}

export default MainHeader;
