import { create } from 'zustand';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AlarmType {
  alarm: boolean;
}

interface AlarmInfoState {
  alarmInfo: AlarmType;
  setAlarmInfo: (alarmInfo: AlarmType) => void;
  deleteAlarmInfo: () => void;
}

const defaultState = {
  alarm: false,
};

export const useAlarmZuInfo = create(
  persist<AlarmInfoState>(
    (set) => ({
      alarmInfo: defaultState,
      setAlarmInfo: (alarmInfo: AlarmType) => {
        set({ alarmInfo });
      },
      deleteAlarmInfo: () => {
        set({ alarmInfo: defaultState });
      },
    }),
    {
      name: 'gate26',
      storage: createJSONStorage(() => sessionStorage),
      // storage: typeof window !== "undefined" ? window.localStorage : dummyStorageApi,
    },
  ),
);
