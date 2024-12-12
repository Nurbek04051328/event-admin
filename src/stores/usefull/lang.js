// stores/language.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const language = ref(localStorage.getItem('language') || 'ru')

  const setLanguage = (newLang) => {
    language.value = newLang
    localStorage.setItem('language', newLang)
  }

  return { language, setLanguage }
})
