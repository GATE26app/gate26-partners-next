'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import BottomLayout from './BottomLayout';
import MainLayout from './MainLayout';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';
import JoinLayout from './JoinLayout';

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

  return (
    <>
      {pathname == '/login' ? (
        <BottomLayout>{children}</BottomLayout>
      ) : pathname == '/' ? (
        <>{children}</>
      ) : pathname == '/join' ||
        pathname == '/join/terms' ||
        pathname == '/join/select' ? (
        <JoinLayout>{children}</JoinLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
}

export default LayoutForm;
