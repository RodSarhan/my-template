import i18n, {LanguageDetectorModule, changeLanguage} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '~localization/locales/en/translation.json';
import fr from '~localization/locales/fr/translation.json';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import 'intl-pluralrules';
import {titleCase, capitalize} from 'voca';
import {SupportedLanguages, isWeb} from '~utils/constants/app-constants';

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
    fr: {
        translation: fr,
    },
} as const;

export const initi18n = () => {
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

    i18n.services.formatter?.add('lowercase', (value: string, lng, options) => {
        return value.toLowerCase();
    });

    i18n.services.formatter?.add('uppercase', (value: string, lng, options) => {
        return value.toUpperCase();
    });

    i18n.services.formatter?.add('capitalize', (value: string, lng, options) => {
        return capitalize(value);
    });

    i18n.services.formatter?.add('titlecase', (value: string, lng, options) => {
        return titleCase(value);
    });
};

if (isWeb) {
    initi18n();
}

export default i18n;

export const changeAppLanguage = (language: (typeof SupportedLanguages)[number]) => {
    if (SupportedLanguages.includes(language)) {
        changeLanguage(language);
        useGeneralStore.getState().setLanguage(language);
    }
};
