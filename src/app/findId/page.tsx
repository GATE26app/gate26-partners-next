'use client';

import React, { Suspense, useState } from 'react';

import FindIdComponent from '@/components/FIndId/FIndIdComponent';
function page() {
  return (
    <Suspense>
      <FindIdComponent />
    </Suspense>
  );
}

export default page;
