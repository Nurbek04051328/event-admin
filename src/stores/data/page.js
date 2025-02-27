import { ref  } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/page'

export const pageStore = defineStore('pageStore', () => {
  const pages = ref([])
  const pagesCount = ref(0)
  const notification = useNotification()

  const getPages = async (params) => {
    console.log(params);
    
    const { data } = await api.get(base_url, {params})
    console.log("pages", data);
    
    pages.value = data?.pages;
    pagesCount.value = data?.count;
  }

  const addPage = async (category, t) => {
    const { data } = await api.post(base_url, category)
    pages.value = [data,...pages.value]
    pagesCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removePage = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    pages.value = pages.value.filter((item) => item._id !== id)
    pagesCount.value > 0 ? (pagesCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const savePage = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    pages.value = pages.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getPage = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  return {
    pages,
    pagesCount,
    getPages,
    addPage,
    removePage,
    savePage,
    getPage,
  }
})