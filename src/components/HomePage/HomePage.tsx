import React from 'react';

import { Box, BoxProps, getToken } from '@chakra-ui/react';

import LoginPage from '@components/LoginPage';
import UserListPage from '@components/UserListPage';

import { getNickName } from '@utils/localStorage/token';

// interface HomePageContentProps extends BoxProps {}

// function HomePageContent({ ...basisProps }: HomePageContentProps) {
//   return <Box {...basisProps}>Hello World</Box>;
// }

console.log(getNickName());
function HomePageContent() {
  return (
    <>
      {getNickName() !== null ? (
        <>
          <UserListPage />
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}
export default HomePageContent;
