import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import SendBird from 'sendbird';
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
import {
  deleteSendBirdToken,
  getSendBirdToken,
} from '@/utils/localStorage/token/index';
import { useChatZuInfo } from '@/_store/ChatInfo';
// import { cookies } from 'next/headers';

function MainHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getSendBird = searchParams.get('sendBird');
  const getSendbirdUrl = searchParams.get('sendbirdUrl');
  const { setPartnerZuInfo } = usePartnerZuInfo((state) => state);
  const { alarmInfo, setAlarmInfo } = useAlarmZuInfo((state) => state);
  const { chatStateInfo, setChatStateInfo } = useChatZuInfo((state) => state);
  const [logout, setLogout] = useState(false);
  const [alramModal, setAlramModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  const appId = '78B8D84A-E617-493C-98CA-2D15F647923B';
  const userId = getSendBirdToken().user_id;
  const accessToken = getSendBirdToken().sendBird;
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setChatStateInfo({ openYn: false });
  }, []);

  useEffect(() => {
    const sb = new SendBird({ appId });

    // 연결 및 초기화
    sb.connect(userId, accessToken, (user: any, error: any) => {
      if (error) {
        console.error('SendBird 연결 오류:', error);
        return;
      }

      // 초기 총 안 읽은 메시지 수 가져오기
      updateUnreadCount();

      // 채널 핸들러 추가
      const ChannelHandler = new sb.ChannelHandler();

      // 메시지 수신 이벤트 감지
      ChannelHandler.onMessageReceived = (channel: any, message: any) => {
        console.log('새 메시지 수신:', message);
        updateUnreadCount(); // 메시지 수신 시 안 읽은 메시지 수 업데이트
      };

      ChannelHandler.onReadReceiptUpdated = () => {
        console.log('읽음 확인 업데이트');
        updateUnreadCount(); // 읽음 확인 업데이트 시 안 읽은 메시지 수 재조회
      };

      // 핸들러 등록
      sb.addChannelHandler('unique_handler_id', ChannelHandler);

      // 정리: 컴포넌트 언마운트 시 핸들러 제거
      return () => {
        sb.removeChannelHandler('unique_handler_id');
      };
    });

    // 안 읽은 메시지 수 업데이트 함수
    const updateUnreadCount = () => {
      sb.getTotalUnreadMessageCount((count: number, err: any) => {
        if (err) {
          console.error('안 읽은 메시지 수 가져오기 실패:', err);
          return;
        }
        console.log('총 안 읽은 메시지 수:', count);
        setUnreadCount(count);
      });
    };
  }, [appId, userId, accessToken]);

  const onLogout = () => {
    deleteUserInfo();
    deleteToken();
    deleteSendBirdToken();
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
    if (getSendBird == 'true') {
      setChatStateInfo({ openYn: true });
    }
    if (getSendbirdUrl) {
      setChatStateInfo({ openYn: true });
    }
  }, []);

  // 경로 변경 시 마다 채팅창 닫기
  useEffect(() => {
    setChatStateInfo({ openYn: false });
  }, [pathname]);

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
          {chatStateInfo.openYn ? (
            <Image
              src={'/images/header/ch_on.png'}
              width={49}
              height={49}
              alt="로고"
              onClick={() =>
                setChatStateInfo({ openYn: !chatStateInfo.openYn })
              }
            />
          ) : (
            <Flex position={'relative'}>
              <Image
                src={'/images/header/icon_chatting_off.png'}
                width={49}
                height={49}
                alt="로고"
                onClick={() =>
                  setChatStateInfo({ openYn: !chatStateInfo.openYn })
                }
              />
              {unreadCount > 0 && (
                <Flex
                  borderRadius={50}
                  bgColor={'#FF6060'}
                  width={'16px'}
                  height={'16px'}
                  position={'absolute'}
                  top={'-1px'}
                  right={'-5px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  p={'2px'}
                >
                  <Text color={'white'} fontSize={'10px'}>
                    {unreadCount}
                  </Text>
                </Flex>
              )}
            </Flex>
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
        {chatStateInfo.openYn && <ChatComponent />}
      </Flex>
    </>
  );
}

export default MainHeader;
