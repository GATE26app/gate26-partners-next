import { useEffect, useState } from 'react';

import { Text } from '@chakra-ui/react';

import Footer from '@components/common/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
