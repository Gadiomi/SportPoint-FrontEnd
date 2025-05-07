import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Languages } from './constants';
import en from './translations/en.json';
import ua from './translations/ua.json';

export const resources = {
  [Languages.EN]: { translation: en },
  [Languages.UA]: { translation: ua },
} as const;

i18next

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.UA,
    supportedLngs: [Languages.EN, Languages.UA],
    defaultNS: 'translation',
    debug: true,
    resources,
    backend: {
      loadPath: '/translations/{{lng}}.json',
    },

    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
