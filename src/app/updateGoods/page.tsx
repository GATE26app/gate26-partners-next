"use client"
import UpdateGoodsComponentPage from "@/components/Goods/Update/UpdateGoodsComponentPage";
import React, { ReactElement, Suspense, useEffect, useState } from 'react';

function UpdateGoodsPage() {

  return (
    <Suspense>
      <UpdateGoodsComponentPage />
    </Suspense>
  );
}

export default UpdateGoodsPage;

