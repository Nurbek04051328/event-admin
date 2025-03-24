import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/news-category'

export const newsCategoryStore = defineStore('newsCategoryStore', () => {
  const newCategories = ref([])
  const newCategoryCount = ref(0)
  const notification = useNotification()

  const getNewsCategories = async (params) => {
    const { data } = await api.get(base_url, {params})
    console.log("datas", data);
    
    newCategories.value = data?.categories;
    newCategoryCount.value = data?.count;
  }

  const addNewsCategory = async (category, t) => {
    const { data } = await api.post(base_url, category)
    newCategories.value = [data,...newCategories.value]
    newCategoryCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeNewsCategory = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    newCategories.value = newCategories.value.filter((item) => item._id !== id)
    newCategoryCount.value > 0 ? (newCategoryCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveNewsCategory = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    newCategories.value = newCategories.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getNewsCategory = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
    let {data} = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      newCategories.value = newCategories.value.map(cat => {
          if (cat._id == id) return {
              ...cat,
              status: status
          }
          return cat
      })
    }
  }

  return {
    newCategories,
    newCategoryCount,
    getNewsCategories,
    addNewsCategory,
    removeNewsCategory,
    saveNewsCategory,
    getNewsCategory,
    changeStatus
  }
})