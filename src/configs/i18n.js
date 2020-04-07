import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const en = require('./translations/en.json');
const ru = require('./translations/ru.json');
const ua = require('./translations/ua.json');
const en_ex = require('../expand/lang/en.json');
const ru_ex = require('../expand/lang/ru.json');
const ua_ex = require('../expand/lang/ua.json');

const resources = {
    en: {
        translation: {
            ...en,
            ...en_ex,
        },
    },
    ru: {
        translation: {
            ...ru,
            ...ru_ex,
        },
    },
    ua: {
        translation: {
            ...ua,
            ...ua_ex,
        },
    },
};

const lng = window.localStorage.getItem('lang') || 'en';
i18n.use(initReactI18next).init({
    resources,
    lng,
    keySeparator: false,
    fallbackLng: ['en', 'ru', 'ua'],
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
