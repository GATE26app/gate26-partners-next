'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BottomLayout from './BottomLayout';
import MainLayout from './MainLayout';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';
import JoinLayout from './JoinLayout';
// import * as serviceWorkerRegistration from '../../app/serviceWorkerRegistration';

function LayoutForm({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

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

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function (registration) {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          );
        })
        .catch(function (err) {
          console.log('Service Worker registration failed:', err);
        });
    }
  }, []);
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
