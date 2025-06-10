
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loadingStore', () => {
  const loading = ref(false)

  const start = () => {
    loading.value = true
  }

  const stop = () => {
    loading.value = false
  }

  return {
    loading,
    start,
    stop
  }
})
