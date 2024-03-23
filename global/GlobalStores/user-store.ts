import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandPersistStorage} from '~global/LocalStorage/zustand-persist';

type UserStoreState = {};

type UserStoreActions = {};

export const useGeneralStore = create<UserStoreState & UserStoreActions>()(
    persist(
        immer((set) => ({})),
        {
            name: 'user-store',
            storage: createJSONStorage(() => zustandPersistStorage),
            version: 1,
        },
    ),
);
