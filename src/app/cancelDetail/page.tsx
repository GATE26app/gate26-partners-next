import CancelDetailComponentPage from "@/components/Cancel/Detail/CancelDetatilPage";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, Suspense, useState } from 'react';


function CancelDetailPage() {

  return (
    <Suspense>
      <CancelDetailComponentPage />
    </Suspense>
  );
}

export default CancelDetailPage;
