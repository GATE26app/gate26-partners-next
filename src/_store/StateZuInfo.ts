import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface GoodsType {
  goodState?: boolean;
  LogItemDisable?: boolean;
  orderState?: boolean;
  cancelState?: boolean;
}

interface GoodsInfoState {
  goodsInfo: GoodsType;
  setGoodsInfo: (userZuInfo: GoodsType) => void;
  deleteGoodsInfo: () => void;
}

const defaultState = {
  goodState: false,
  LogItemDisable: false,
  orderState: false,
  cancelState: false,
};

export const useGoodsStateZuInfo = create(
  persist<GoodsInfoState>(
    (set) => ({
      goodsInfo: defaultState,
      setGoodsInfo: (goodsInfo: GoodsType) => {
        set({ goodsInfo });
      },
      deleteGoodsInfo: () => {
        set({ goodsInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
