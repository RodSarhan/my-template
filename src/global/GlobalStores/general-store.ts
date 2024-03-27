import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandPersistStorage} from '~global/LocalStorage/zustand-persist';
import {GENERAL_STORAGE_VERSION, SupportedLanguages} from '~constants/app-constants';
import {UnistylesRuntime} from 'react-native-unistyles';
import {GestureResponderEvent} from 'react-native';
import switchTheme from 'react-native-theme-switch-animation';

type GeneralStoreState = {
    theme: 'light' | 'dark';
    language: (typeof SupportedLanguages)[number];
};

type GeneralStoreActions = {
    setLanguage: (language: GeneralStoreState['language']) => void;
    toggleTheme: (e: GestureResponderEvent | undefined) => void;
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
            toggleTheme: (e) => {
                const switchThemeFunction = () => {
                    set((state) => {
                        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
                        state.theme = nextTheme;
                        UnistylesRuntime.setTheme(nextTheme);
                    });
                };
                if (!e) {
                    switchThemeFunction();
                } else {
                    e.currentTarget.measure((x1, y1, width, height, px, py) => {
                        switchTheme({
                            switchThemeFunction: switchThemeFunction,
                            animationConfig: {
                                type: 'circular',
                                duration: 500,
                                startingPoint: {
                                    cy: py + height / 2,
                                    cx: px + width / 2,
                                },
                            },
                        });
                    });
                }
            },
        })),
        {
            name: 'general-store',
            storage: createJSONStorage(() => zustandPersistStorage),
            version: GENERAL_STORAGE_VERSION,
        },
    ),
);

(e: GestureResponderEvent) => {};
