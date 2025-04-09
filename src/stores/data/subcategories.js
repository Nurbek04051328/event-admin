import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/event-subcategory'

export const subcategoryStore = defineStore('subcategoryStore', () => {
  const subcategories = ref([])
  const sSubcategories = ref([])
  const subcategoryCount = ref(0)
  const notification = useNotification()

  const getSubcategories = async (params, forSecond = false) => {
    if (!forSecond) subcategories.value = []
    const { data } = await api.get(base_url, { params })
    if (forSecond) {
      console.log(forSecond, 'kuu')
      sSubcategories.value = data?.eventSubcategories
      return false
    }
    subcategories.value = data?.eventSubcategories
    subcategoryCount.value = data?.count
    console.log('ku')
  }

  const addSubcategory = async (subcategory, t) => {
    const { data } = await api.post(base_url, subcategory)
    subcategories.value = [data, ...subcategories.value]
    subcategoryCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeSubcategory = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    subcategories.value = subcategories.value.filter((item) => item._id !== id)
    subcategoryCount.value > 0 ? (subcategoryCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveSubcategory = async (subcategory, t) => {
    const { data } = await api.put(`${base_url}`, subcategory)
    subcategories.value = subcategories.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getSubcategory = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
    let { data } = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      subcategories.value = subcategories.value.map((sub) => {
        if (sub._id == id)
          return {
            ...sub,
            status: status
          }
        return sub
      })
    }
  }

  return {
    subcategories,
    sSubcategories,
    subcategoryCount,
    getSubcategories,
    addSubcategory,
    removeSubcategory,
    saveSubcategory,
    getSubcategory,
    changeStatus
  }
})
