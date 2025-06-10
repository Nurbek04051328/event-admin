import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/notif-package'

export const notifpackageStore = defineStore('notifpackageStore', () => {
  const notifpackages = ref([])
  const notifpackageCount = ref(0)
  const notifpackage = useNotification()

  const getNotifpackages = async (params) => {
    const { data } = await api.get(base_url, { params })

    notifpackages.value = data?.packages
    notifpackageCount.value = data?.count
  }

  const addNotifpackage = async (notif, t) => {
    const { data } = await api.post(base_url, notif)
    notifpackages.value = [data, ...notifpackages.value]
    notifpackageCount.value += 1
    notifpackage.setNotif(true, t('story.add'), 'success')
  }

  const removeNotifpackage = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    notifpackages.value = notifpackages.value.filter((item) => item._id !== id)
    notifpackageCount.value > 0 ? (notifpackageCount.value -= 1) : 0
    notifpackage.setNotif(true, t('story.delete'), 'info')
  }

  const saveNotifpackage = async (notif, t) => {
    const { data } = await api.put(`${base_url}`, notif)
    notifpackages.value = notifpackages.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notifpackage.setNotif(true, t('story.update'), 'info')
  }

  const getNotifpackage = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
    let { data } = await api.get(`${base_url}/status/${id}/${status}`)
    console.log(data)
    if (data) {
      notifpackages.value = notifpackages.value.map((notif) => {
        if (notif._id == id)
          return {
            ...notif,
            status: status
          }
        return notif
      })
    }
  }

  return {
    notifpackages,
    notifpackageCount,
    getNotifpackages,
    addNotifpackage,
    removeNotifpackage,
    saveNotifpackage,
    getNotifpackage,
    changeStatus
  }
})
