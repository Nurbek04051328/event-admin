import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { reactive } from 'vue'
import { useNotification } from '../usefull/notification'

const base_url = '/organizer'
export const organizerStore = defineStore('organizerStore', () => {
  const organizer = reactive({
    data: [],
    count: 0
  })
  const notification = useNotification()
  //   const usefull = useFullStore()
  //   const notification = useNotification()

  const getorganizers = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log("dataorgan", data);
    
    organizer.data = [...(data?.organizers || [])]
    organizer.count = data?.count
  }

  const getorganizer = async (id) => {
    const { data } = await api.get(`${base_url}/${id}`)
    return data
  }

  const getorganizerEvents = async (id) => {
    const { data } = await api.get(`${base_url}/organizer-events/${id}`)
    return data
  }

  const getLastOrganizer = async () => {
    const { data } = await api.get(base_url, { params: { limit: 1} })
    organizer.data = [...data.organizers,...organizer.data]
    organizer.count += 1
  }
  // const getNewSocket = async (id) => {
  //   let {data} =  await api.get(`${base_url}/${id}`)
  //   organizer.data = [(data?.organizers || []), ...organizer.data]
  //   notification.setNotif(true, 'Добавлено новое Организатор', 'success')
  // }
  const getNewSocket = async () => {
    const { data } = await api.get(base_url, { params: { limit: 1} })
    organizer.data = [...data.organizers,...organizer.data]
    organizer.count += 1
    notification.setNotif(true, 'Добавлено новое Организатор', 'success')
  }
  const getUpdateSocket = async (id) => {
    let {data} =  await api.get(`${base_url}/${id}`)
    organizer.data = [(data?.organizers || []), ...organizer.data]
    notification.setNotif(true, 'Информация об организаторе обновлена', 'success')
  }

  return {
    organizer,
    getorganizers,
    getorganizer,
    getLastOrganizer,
    getNewSocket,
    getorganizerEvents,
    getUpdateSocket
  }
})

//// "active", "not active", "limited", "deleted"
// 1) Активный
// 2) Не активирован
// 3) Ограничен
// 4) Удален/Заблокирован
// Вы действительно принимаете?