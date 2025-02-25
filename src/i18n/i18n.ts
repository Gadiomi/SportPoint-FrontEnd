import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import { Languages } from './constants';
import en from './translations/en.json';
import ua from './translations/ua.json';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.UA,
    supportedLngs: [Languages.EN, Languages.UA],
    debug: true,
    resources: {
      [Languages.EN]: { translation: en },
      [Languages.UA]: { translation: ua },
    },

    backend: {
      loadPath: '/translations/{{lng}}.json',
    },

    detection: {
      order: ['localStorage', 'cookie'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
