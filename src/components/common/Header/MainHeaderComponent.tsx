import React, { Suspense } from 'react';
import MainHeader from './MainHeader';

function MainHeaderComponent() {
  return (
    <Suspense>
      <MainHeader />
    </Suspense>
  );
}

export default MainHeaderComponent;
