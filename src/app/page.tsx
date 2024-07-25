'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {} from 'next/font/google';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';

export default function Home() {
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

  // 서비스 워커 등록
  // serviceWorkerRegistration.register();

  // 서비스 워커 메시지 수신 대기
  // navigator.serviceWorker.addEventListener('message', (event) => {
  //   if (!event.data.action) {
  //     return;
  //   }

  //   switch (event.data.action) {
  //     case 'redirect-from-notificationclick':
  //       window.location.href = event.data.url;
  //       break;
  //     // no default
  //   }
  // });

  useEffect(() => {
    // if (
    //   getToken().access == '' ||
    //   getToken().access == undefined ||
    //   getToken().access == null
    // ) {
    //   router.replace('/login');
    // } else {
    router.push('/orderList');
    // }
  }, []);
  return <main className={styles.main}></main>;
}
