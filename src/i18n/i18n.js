import uzLan from './locales/uz'
import ruLan from './locales/ru'
import enLan from './locales/en'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: localStorage.getItem('language') || 'ru', // Dastlabki til
  fallbackLocale: 'ru', // Asosiy til
  messages: {
    uz:uzLan,
    ru:ruLan,
    en:enLan,
  }
});

export default i18n