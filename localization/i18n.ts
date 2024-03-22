import i18n, {LanguageDetectorModule, changeLanguage} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en/translation.json';
import {LocalStorage} from '~global/LocalStorage/local-storage';

const languageDetector: LanguageDetectorModule = {
    type: 'languageDetector',
    detect: () => {
        const selectedLanguage = LocalStorage.general.getLanguage();
        return selectedLanguage;
    },
    init: () => {},
    cacheUserLanguage: () => {},
};

export const defaultNS = 'translation';
export const resources = {
    en: {
        translation: en,
    },
} as const;

i18n.use(initReactI18next)
    .use(languageDetector)
    .init({
        ns: ['translation'],
        defaultNS,
        resources,
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
