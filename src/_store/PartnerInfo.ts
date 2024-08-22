import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface PartnerImageType {
  imagePath: string;
  thumbnailImagePath: string;
  createdDate: string;
}
interface partnerInfoType {
  partnerId: string;
  loginId: string;
  level: number;
  levelName: string;
  status: number;
  statusName: string;
  type: number;
  typeName: string;
  title: string;
  images: Array<PartnerImageType>;
  shippingType: number;
  shippingTypeName: string;
  shippingFee: number;
  shippingMinAmount: number;
}

interface PartnerInfoState {
  partnerInfo: partnerInfoType;
  setPartnerZuInfo: (partnerInfo: partnerInfoType) => void;
  deletePartnerZuInfo: () => void;
}

const defaultState = {
  partnerId: '',
  loginId: '',
  level: 0,
  levelName: '',
  status: 0,
  statusName: '',
  type: 0,
  typeName: '',
  title: '',
  images: [
    {
      imagePath: '',
      thumbnailImagePath: '',
      createdDate: '',
    },
  ],
  shippingType: 0,
  shippingTypeName: '',
  shippingFee: 0,
  shippingMinAmount: 0,
};

export const usePartnerZuInfo = create(
  persist<PartnerInfoState>(
    (set) => ({
      partnerInfo: defaultState,
      setPartnerZuInfo: (partnerInfo: partnerInfoType) => {
        set({ partnerInfo });
      },
      deletePartnerZuInfo: () => {
        set({ partnerInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
