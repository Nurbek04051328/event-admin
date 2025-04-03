import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/notification'

export const notificationStore = defineStore('notificationStore', () => {
  const notifications = ref([])
  const notificationCount = ref(0)
  const notification = useNotification()

  const getNotifications = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log(data)
    notifications.value = data?.notifications
    notificationCount.value = data?.count
  }

  const addNotification = async (notif, t) => {
    const { data } = await api.post(base_url, notif)
    notifications.value = [data, ...notifications.value]
    notificationCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeNotification = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    notifications.value = notifications.value.filter((item) => item._id !== id)
    notificationCount.value > 0 ? (notificationCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveNotification = async (notif, t) => {
    const { data } = await api.put(`${base_url}`, notif)
    notifications.value = notifications.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getNotification = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
    let { data } = await api.get(`${base_url}/status/${id}/${status}`)
    console.log(data)
    if (data) {
      notifications.value = notifications.value.map((notif) => {
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
    notifications,
    notificationCount,
    getNotifications,
    addNotification,
    removeNotification,
    saveNotification,
    getNotification,
    changeStatus
  }
})
