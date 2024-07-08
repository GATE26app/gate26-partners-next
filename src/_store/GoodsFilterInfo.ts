import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface goodsFilterType {
  pageNo: number;
  pageSize: number;
  status: number | null;
  level: number;
  forSale: number;
  searchKeyword: string;
  searchType: string;
}

interface goodsFiterInfoState {
  goodsFilterInfo: goodsFilterType;
  setGoodsFilterInfo: (goodsFilterInfo: goodsFilterType) => void;
  deleteGoodsFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  status: null,
  level: 0,
  forSale: 0,
  searchKeyword: '',
  searchType: '',
};

export const useGoodsFilterZuInfo = create(
  persist<goodsFiterInfoState>(
    (set) => ({
      goodsFilterInfo: defaultState,
      setGoodsFilterInfo: (goodsFilterInfo: goodsFilterType) => {
        set({ goodsFilterInfo });
      },
      deleteGoodsFilterInfo: () => {
        set({ goodsFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
