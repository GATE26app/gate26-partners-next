'use client';

import React, { Suspense, useEffect, useState } from 'react';
import FindPwChangeComponent from '@/components/FIndPw/FindPwChangeComponent';
function page() {
  return (
    <Suspense>
      <FindPwChangeComponent />
    </Suspense>
  );
}

export default page;
