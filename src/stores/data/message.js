import { reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { useNotification } from '../usefull/notification'

const base_url = '/work-chat'

export const messageStore = defineStore('messageStore', () => {
  const chatrooms = reactive({
    data: [],
    count: 0
  })
  const chatMessages = reactive({
    data: [],
    count: 0
  })
  const notification = useNotification()

  const getChatrooms = async (params) => {
    const { data } = await api.get(base_url, { params })
    // console.log('data', data)
    chatrooms.data = [...data.rooms]
    chatrooms.count = data.count
  }
  const getChatMessages = async (id,params) => {
    console.log("id",id, params);
    
    const { data } = await api.get(`${base_url}/chat-messages/${id}`, { params })
    console.log('dataMessages', data)
    chatMessages.data = [...data.messages]
    chatMessages.count = data.count
  }

  const getOneChatroom = async (id) => {

    const { data } = await api.get(`${base_url}/${id}`)
    // console.log("kutayapman", data);
    
    return data
  }

  const getLastChatRooms = async () => {
    const { data } = await api.get(base_url, { params: { limit: 1} })
    chatrooms.data = [...data.rooms,...chatrooms.data]
    chatrooms.count += 1
    notification.setNotif(true, 'Добавлено новое Message', 'success')
  }
  return {
    chatrooms,
    chatMessages,
    getChatrooms,
    getLastChatRooms,
    getOneChatroom,
    getChatMessages
  }
})
