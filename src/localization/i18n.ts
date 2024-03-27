import i18n, {LanguageDetectorModule, changeLanguage} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '~localization/locales/en/translation.json';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import 'intl-pluralrules';

const languageDetector: LanguageDetectorModule = {
    type: 'languageDetector',
    detect: () => {
        const selectedLanguage = useGeneralStore.getState().language;
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
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
