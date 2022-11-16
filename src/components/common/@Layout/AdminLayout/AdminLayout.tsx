import React from 'react';

import AdminHeader from './_fragments/AdminHeader';
import AdminSideMenu from './_fragments/AdminSideMenu';

const withAdminLayout = (WrappedComponent: React.ElementType) => {
  // eslint-disable-next-line react/display-name
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
