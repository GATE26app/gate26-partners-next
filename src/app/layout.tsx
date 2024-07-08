import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import localFont from 'next/font/local';
import ReactQueryProviders from '@/utils/react-query-provider';
import LayoutForm from '@/components/Layout/LayoutForm';
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
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <LayoutForm>{children}</LayoutForm>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
