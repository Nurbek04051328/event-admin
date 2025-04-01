import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/event-category'

export const categoryStore = defineStore('categoryStore', () => {
  const categories = ref([])
  const categoryCount = ref(0)
  const notification = useNotification()

  const getCategories = async (params) => {
    const { data } = await api.get(base_url, {params})
    categories.value = data?.eventCategories;
    categoryCount.value = data?.count;
  }

  const addCategory = async (category, t) => {
    const { data } = await api.post(base_url, category)
    categories.value = [data,...categories.value]
    categoryCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeCategory = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    categories.value = categories.value.filter((item) => item._id !== id)
    categoryCount.value > 0 ? (categoryCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveCategory = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    categories.value = categories.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getCategory = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const listCategories = computed(() => {
    return [
      ...categories.value.map((category) => {
        return {
          _id: category._id,
          title: category?.translates?.at(0)?.title,
        }
      })
    ]
  })

  const changeStatus = async (id, status) => {
    let {data} = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      categories.value = categories.value.map(cat => {
        if (cat._id == id) return {
            ...cat,
            status: status
        }
        return cat
      })
    }
  }

  return {
    categories,
    categoryCount,
    getCategories,
    addCategory,
    removeCategory,
    saveCategory,
    getCategory,
    listCategories,
    changeStatus
  }
})