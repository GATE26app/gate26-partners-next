'use client';

import React, { Suspense } from 'react';

import FindIdSuccessComponent from '@/components/FIndId/FindIdSuccessComponent';

function page() {
  return (
    <Suspense>
      <FindIdSuccessComponent />
    </Suspense>
  );
}

export default page;
