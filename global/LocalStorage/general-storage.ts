import {GENERAL_STORAGE_VERSION, SupportedLanguages} from '~constants/app-constants';
import {generalStorage} from '~libs/mmkv-clients';
import {isNonNullish} from 'remeda';

export const GENERAL_STORAGE_KEYS = {
    VERSION: 'version',
    THEME: 'theme',
    LANGUAGE: 'language',
};

const setGeneralStorageVersion = (value: number) => {
    generalStorage.set(GENERAL_STORAGE_KEYS.VERSION, value);
};

const getGeneralStorageVersion = () => {
    return generalStorage.getNumber(GENERAL_STORAGE_KEYS.VERSION);
};

const setTheme = (value: 'light' | 'dark') => {
    generalStorage.set(GENERAL_STORAGE_KEYS.THEME, value === 'dark' ? 'dark' : 'light');
};

const getTheme = () => {
    const theme = generalStorage.getString(GENERAL_STORAGE_KEYS.THEME);
    return theme === 'dark' ? 'dark' : 'light';
};

const setLanguage = (value: string) => {
    const selectedLanguage = SupportedLanguages.includes(value) ? value : 'en';
    generalStorage.set(GENERAL_STORAGE_KEYS.LANGUAGE, selectedLanguage);
};

const getLanguage = () => {
    const language = generalStorage.getString(GENERAL_STORAGE_KEYS.LANGUAGE);
    const languageToReturn =
        isNonNullish(language) && SupportedLanguages.includes(language) ? language : 'en';
    return languageToReturn;
};

const clearGeneralStorage = () => {
    console.log('resetting general storage');
    generalStorage.clearAll();
    setGeneralStorageVersion(GENERAL_STORAGE_VERSION);
};

export const generalStorageFunctions = {
    setGeneralStorageVersion,
    getGeneralStorageVersion,
    setTheme,
    getTheme,
    setLanguage,
    getLanguage,
    clearGeneralStorage,
} as const;
