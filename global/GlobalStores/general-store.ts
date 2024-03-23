import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandPersistStorage} from '~global/LocalStorage/zustand-persist';
import {SupportedLanguages} from '~constants/app-constants';
import {UnistylesRuntime} from 'react-native-unistyles';

type GeneralStoreState = {
    theme: 'light' | 'dark';
    language: (typeof SupportedLanguages)[number];
};

type GeneralStoreActions = {
    setLanguage: (language: GeneralStoreState['language']) => void;
    toggleTheme: () => void;
};

export const useGeneralStore = create<GeneralStoreState & GeneralStoreActions>()(
    persist(
        immer((set) => ({
            theme: 'light',
            language: 'en',
            setLanguage: (language) => {
                set({
                    language,
                });
            },
            toggleTheme: () => {
                set((state) => {
                    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
                    state.theme = nextTheme;
                    UnistylesRuntime.setTheme(nextTheme);
                });
            },
        })),
        {
            name: 'general-store',
            storage: createJSONStorage(() => zustandPersistStorage),
            version: 1,
        },
    ),
);
