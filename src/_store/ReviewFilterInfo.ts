import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ReviewFilterType {
  pageNo: number;
  pageSize: number;
  searchType: string;
  searchKeyword: string;
  reply?: string;
}

interface ReviewFiterInfoState {
  reviewFilterInfo: ReviewFilterType;
  setReviewFilterInfo: (ReviewFilterInfo: ReviewFilterType) => void;
  deleteReviewFilterInfo: () => void;
}

const defaultState = {
  pageNo: 0,
  pageSize: 10,
  searchType: '',
  searchKeyword: '',
  reply: '',
};

export const useReviewFilterZuInfo = create(
  persist<ReviewFiterInfoState>(
    (set) => ({
      reviewFilterInfo: defaultState,
      setReviewFilterInfo: (reviewFilterInfo: ReviewFilterType) => {
        set({ reviewFilterInfo });
      },
      deleteReviewFilterInfo: () => {
        set({ reviewFilterInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
