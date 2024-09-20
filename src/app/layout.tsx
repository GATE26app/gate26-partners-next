import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import localFont from 'next/font/local';
import ReactQueryProviders from '@/utils/react-query-provider';
import LayoutForm from '@/components/Layout/LayoutForm';
import Script from 'next/script';
import { SendBirdProvider } from 'sendbird-uikit';
// import { SendBirdProvider } from '@sendbird/uikit-react';
// import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
// const inter = Inter({ subsets: ['latin'] });
const pretendard = localFont({
  // src:'../../../',
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'GATE26 | 파트너스 관리자',
  description: 'GATE26 | 파트너스 관리자',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      <body className={pretendard.className}>
        <ReactQueryProviders>
          {/* <SendBirdProvider
            appId={'78B8D84A-E617-493C-98CA-2D15F647923B'}
            userId="9f86f694-4f22-438d-8672-e95a5121d3c7"
          > */}
          <LayoutForm>{children}</LayoutForm>
          {/* </SendBirdProvider> */}
        </ReactQueryProviders>
      </body>
    </html>
  );
}
