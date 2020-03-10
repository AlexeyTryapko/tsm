import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const en = require('./translations/en.json');
const ru = require('./translations/ru.json');
const ua = require('./translations/ua.json');

const resources = {
    en: {
        translation: {
            ...en,
        },
    },
    ru: {
        translation: {
            ...ru,
        },
    },
    ua: {
        translation: {
            ...ua,
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
