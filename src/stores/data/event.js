import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'
import router from '@/router'

const base_url = '/event'

export const eventStore = defineStore('eventStore', () => {
  const events = ref([])
  const loading = ref(false)
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
    const { data } = await api.get(`${base_url}/rating-info/${id}`, 
      {
        params: { status: 'active' }
      }
  )
    console.log("commentdata", data);
    
    comments.value = data || []
  }

  const removeComments = async (id) => {
    await api.delete(`${base_url}/remove-rating/${id}`)
    comments.value = comments.value.filter((item) => item._id !== id)
    notification.setNotif(true, 'Удалено', 'info')
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
    loading.value = true
    try {
      let { data } = await api.get(`${base_url}/${id}`)
      console.log(data.event)
      eventInfo.value = { ...data }

    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
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

  const getEditEvent = async (id) => {
    let { data } = await api.get(`${base_url}/get-one/${id}`)
    console.log(data.communicativeAmenities)
    return data
  }

  const saveEvent = async (payload) => {
    await api.put(`${base_url}`, payload)
    router.push({ name: 'eventDetail', params: { id: payload._id } })
  }

  return {
    events,
    loading,
    eventInfo,
    comments,
    eventsCount,
    getEvents,
    saveEvent,
    getEditEvent,
    getEvent,
    changeStatus,
    getNewSocket,
    getUpdateSocket,
    getComments,
    removeComments
  }
})
