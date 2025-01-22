import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';
interface ChatStateType {
  openYn: boolean;
}

interface ChatStateInfoState {
  chatStateInfo: ChatStateType;
  setChatStateInfo: (orderStateInfo: ChatStateType) => void;
  deleteChatStateInfo: () => void;
}

const defaultState = {
  openYn: false,
};

export const useChatZuInfo = create(
  persist<ChatStateInfoState>(
    (set) => ({
      chatStateInfo: defaultState,
      setChatStateInfo: (chatStateInfo: ChatStateType) => {
        set({ chatStateInfo });
      },
      deleteChatStateInfo: () => {
        set({ chatStateInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
