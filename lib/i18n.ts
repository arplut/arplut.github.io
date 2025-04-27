import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@/locales/en/translation.json';
import knTranslations from '@/locales/kn/translation.json';

// Initialize i18next for both client and server
const initI18n = () => {
  // Only access localStorage on the client side
  const savedLanguage = typeof window !== 'undefined' 
    ? localStorage.getItem("language") || "en"
    : "en";
    
  // Check if i18n is already initialized to prevent multiple initializations
  if (!i18n.isInitialized) {
    i18n
      // .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: enTranslations
          },
          kn: {
            translation: knTranslations
          }
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage']
        }
      });
  }

  return i18n;
};

// Initialize i18n and export the instance
export default initI18n();