import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SettingStateType {
  settingState: boolean;
}

interface SettingStateInfoState {
  settingStateInfo: SettingStateType;
  setSettingStateInfo: (settingStateInfo: SettingStateType) => void;
  deleteSettingStateInfo: () => void;
}

const defaultState = {
  settingState: false,
};

export const useSettingStateZuInfo = create(
  persist<SettingStateInfoState>(
    (set) => ({
      settingStateInfo: defaultState,
      setSettingStateInfo: (settingStateInfo: SettingStateType) => {
        set({ settingStateInfo });
      },
      deleteSettingStateInfo: () => {
        set({ settingStateInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
