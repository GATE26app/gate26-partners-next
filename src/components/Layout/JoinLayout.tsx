import React from 'react';
import JoinHeader from '../common/Header/JoinHeader';
import Footer from '../common/Footer/Footer';
import { Box } from '@chakra-ui/react';

function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <JoinHeader />
      <Box minH={'calc(100vh - 323px)'}>{children}</Box>
      <Footer />
    </div>
  );
}

export default JoinLayout;
