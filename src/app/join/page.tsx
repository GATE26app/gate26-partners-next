'use client';

import React, { Suspense } from 'react';

import JoinComponent from '@/components/Join/JoinComponent';
function page() {
  return (
    <Suspense>
      <JoinComponent />
    </Suspense>
  );
}

export default page;
