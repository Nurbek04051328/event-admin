import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/2x-subcategory'

export const subcategory2xStore = defineStore('subcategory2xStore', () => {
  const subcategories2x = ref([])
  const sSubcategories2x = ref([])
  const subcategory2xCount = ref(0)
  const notification = useNotification()

  const get2xSubcategories = async (params, forSecond = false) => {
    if (!forSecond) subcategories2x.value = []
    const { data } = await api.get(base_url, { params })
    if (forSecond) {
      sSubcategories2x.value = data?.data
      return
    }
    subcategories2x.value = data?.data
    subcategory2xCount.value = data?.count
  }

  const add2xSubcategory = async (subcategory, t) => {
    const { data } = await api.post(base_url, subcategory)
    subcategories2x.value = [data, ...subcategories2x.value]
    subcategory2xCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const remove2xSubcategory = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    subcategories2x.value = subcategories2x.value.filter((item) => item._id !== id)
    subcategory2xCount.value > 0 ? (subcategory2xCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const save2xSubcategory = async (subcategory, t) => {
    const { data } = await api.put(`${base_url}`, subcategory)
    subcategories2x.value = subcategories2x.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const changeStatus = async (id, status) => {
    let { data } = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      subcategories2x.value = subcategories2x.value.map((sub) => {
        if (sub._id == id)
          return {
            ...sub,
            status: status
          }
        return sub
      })
    }
  }

  const get2xtSubcategory = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  return {
    subcategories2x,
    subcategory2xCount,
    sSubcategories2x,
    get2xSubcategories,
    add2xSubcategory,
    remove2xSubcategory,
    save2xSubcategory,
    get2xtSubcategory,
    changeStatus
  }
})
