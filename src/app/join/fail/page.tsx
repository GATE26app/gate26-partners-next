'use client';

import JoinFailComponent from '@/components/Join/Fail/JoinFailComponent';
import { Suspense } from 'react';

function page() {
  return (
    <Suspense>
      <JoinFailComponent />
    </Suspense>
  );
}

export default page;
