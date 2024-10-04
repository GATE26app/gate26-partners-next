'use client';

import { Suspense } from 'react';
import Main from './Main';

export default function Home() {
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

  return (
    <Suspense>
      <Main />
    </Suspense>
  );
}
