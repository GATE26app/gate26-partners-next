"use client"
import React, { ReactElement, Suspense, useEffect, useState } from 'react';

import CreateGoodsComponentPage from "@/components/Goods/Create/CreateGoodsComponentPage";

function CreateGoodsPage() {
  return (
    <Suspense>
     <CreateGoodsComponentPage />
    </Suspense>
  );
}

export default CreateGoodsPage;
