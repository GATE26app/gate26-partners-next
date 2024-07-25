'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BottomLayout from './BottomLayout';
import MainLayout from './MainLayout';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';
import JoinLayout from './JoinLayout';
import * as serviceWorkerRegistration from '../../app/serviceWorkerRegistration';

function LayoutForm({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);
  // useEffect(() => {
  //   fcm();
  // }, []);
  // console.log('fcmtoken,', fcmtoken);
  // const fcm = async () => {
  //   onMessageListener()
  //     .then((payload) => {
  //       console.log('Message received. ', payload);
  //       // setAlarmInfo({ alarm: true });
  //       // 여기서 알림을 표시하거나 상태를 업데이트할 수 있습니다.
  //     })
  //     .catch((err) => console.log('Failed to receive message: ', err));
  // };
  // useEffect(() => {
  //   if (
  //     getToken().access == null ||
  //     getToken().access == '' ||
  //     (getToken().access == undefined &&
  //       (pathname == '/login' ||
  //         pathname == '/join' ||
  //         pathname == '/join/terms'))
  //   ) {
  //   } else {
  //     router.replace('/login');
  //   }
  // }, [getToken(), pathname]);
  // serviceWorkerRegistration.register();

  // useEffect(() => {
  //   const native = navigator.serviceWorker;
  //   if (native) {
  //     navigator.serviceWorker.addEventListener('message', (event) => {
  //       if (!event.data.action) {
  //         return;
  //       }

  //       switch (event.data.action) {
  //         case 'redirect-from-notificationclick':
  //           window.location.href = event.data.url;
  //           break;
  //         // no default
  //       }
  //     });
  //   }
  // }, []);
  return (
    <>
      {pathname == '/login' ? (
        <BottomLayout>{children}</BottomLayout>
      ) : pathname == '/' ? (
        <>{children}</>
      ) : pathname == '/join' ||
        pathname == '/join/terms' ||
        pathname == '/join/select' ||
        pathname == '/join/success' ||
        pathname == '/join/fail' ||
        pathname == '/findId' ||
        pathname == '/findId/select' ||
        pathname == '/findId/success' ||
        pathname == '/findPw' ||
        pathname == '/findPw/select' ||
        pathname == '/findPw/change' ? (
        <JoinLayout>{children}</JoinLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
}

export default LayoutForm;
