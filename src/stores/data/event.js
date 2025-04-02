import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/event'

export const eventStore = defineStore('eventStore', () => {
  const events = ref([])
  const eventInfo = ref({})
  const eventsCount = ref(0)
  const comments = ref([])
  const notification = useNotification()

  const getEvents = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log('eventdata', data)

    events.value = data?.events
    eventsCount.value = data?.count
  }

  const getComments = async (id) => {
    const { data } = await api.get(`${base_url}/rating-info/${id}`)

    comments.value = data || []
  }

  const changeStatus = async (payload, t) => {
    const { data } = await api.post(`${base_url}/status`, payload).catch((er) => {
      console.log(er)
    })

    eventInfo.value.event = {
      ...eventInfo.value.event,
      ...data
    }
    notification.setNotif(true, t('story.update'), 'success')
  }

  const getEvent = async (id) => {
    let { data } = await api.get(`${base_url}/${id}`)
    console.log(data.event)
    eventInfo.value = { ...data }
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
    comments,
    eventsCount,
    getEvents,
    getEvent,
    changeStatus,
    getNewSocket,
    getUpdateSocket,
    getComments
  }
})
