import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/event'

export const eventStore = defineStore('eventStore', () => {
  const events = ref([])
  const eventInfo = ref({})
  const eventsCount = ref(0)
  const notification = useNotification()

  const getEvents = async (params) => {

    const { data } = await api.get(base_url, { params })
    console.log("dataEvents", data);
    
    events.value = data?.events
    eventsCount.value = data?.count
  }

  const changeStatus = async (payload, t) => {
    console.log('send', payload)

    const { data } = await api.post(`${base_url}/status`, payload).catch((er) => {
      console.log(er)
    })
    console.log("datatataa",data);
    
    eventInfo.value.event = {
      ...eventInfo.value.event,
      ...data
    }
    notification.setNotif(true, t('story.update'), 'success')
  }

  const getEvent = async (id) => {
    let res = await api.get(`${base_url}/${id}`)
    if (res.status == 200) {
      eventInfo.value = res.data
      console.log("geteventInfo", eventInfo.value);
      
    }
  }

  const getNewSocket = async (id) => {
    let { data } = await api.get(`${base_url}/${id}`)
    events.value = [data, ...events.value]
    notification.setNotif(true, 'Добавлено новое Мероприятие', 'success')
  }
  const getUpdateSocket = async (id) => {
    let { data } = await api.get(`${base_url}/${id}`)
    events.value = events.value.map((e) => {
      if (e._id == data._id) return data
      return e
    })
    notification.setNotif(true, 'Мероприятие изменено', 'success')
  }

  return {
    events,
    eventInfo,
    eventsCount,
    getEvents,
    getEvent,
    changeStatus,
    getNewSocket,
    getUpdateSocket
  }
})
