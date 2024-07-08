"use client"
import React, { Suspense, useState } from 'react';

import SaveGoodsComponentPage from "@/components/Goods/Save/SaveGoodsComponentPage";
function SaveGoodsPage() {


  return (
    <Suspense>
      <SaveGoodsComponentPage/>
    </Suspense>
  );
}

export default SaveGoodsPage;
