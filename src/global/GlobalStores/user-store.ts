import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandPersistStorage} from '~global/LocalStorage/zustand-persist';

type UserStoreState = {
    user:
        | {
              username: string;
              fullName: string;
          }
        | undefined;
};

type UserStoreActions = {
    setUser: (user: UserStoreState['user']) => void;
};

export const useUserStore = create<UserStoreState & UserStoreActions>()(
    persist(
        immer((set) => ({
            user: undefined,
            setUser: (user) => {
                set({
                    user,
                });
            },
        })),
        {
            name: 'user-store',
            storage: createJSONStorage(() => zustandPersistStorage),
            version: 1,
        },
    ),
);
