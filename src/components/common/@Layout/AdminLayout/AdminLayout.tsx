import React from 'react';

import { Container } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import AdminHeader from './_fragments/AdminHeader';
import AdminSideMenu from './_fragments/AdminSideMenu';

const withAdminLayout = (WrappedComponent: any) => {
  return (props: any) => (
    <>
      <AdminHeader />
      <AdminSideMenu>
      <WrappedComponent {...props} />
      </AdminSideMenu>
    </>
  );
};

export default withAdminLayout;
