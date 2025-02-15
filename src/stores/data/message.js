import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
// import { useNotification } from '../usefull/notification'
import { authStore } from '@/stores/user/auth';




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
  const selectChatRoom = ref({})
  // const notification = useNotification()
  const auth_store = authStore()

  const getChatrooms = async (params) => {
    const { data } = await api.get(base_url, { params })
    chatrooms.data = [...data.rooms]
    chatrooms.count = data.count
  }
  const getChatMessages = async (id,params) => {
    chatMessages.data = []
    const { data } = await api.get(`${base_url}/chat-messages/${id}`, { params })
    chatMessages.data = [...data.messages]
    chatMessages.count = data.count
    selectChatRoom.value = data.room
  }

  const sendMessage = async (message) => {
    const { data } = await api.post(base_url, message)
    
    // chatMessages.data = [...chatMessages.data, data]
    // chatMessages.count += 1
    // await filterRoom({room:data?.room, message:data, notViewed:data?.notViewed})
  }


  // Bitta chatroom ratib qaytarish
  const getOneChatroom = async (id) => {
    const { data } = await api.get(`${base_url}/${id}`)
    return data
  }


  const filterRoom = async ({ room, message, notViewed }) => {
    let findIndex = chatrooms.data.findIndex(r => r._id === room);
    if (findIndex === -1) {
      console.log("if", findIndex, room, message, notViewed );
      
      const {data} = await api.get(base_url, {params:{limit:1} });
      chatrooms.data = [...data.rooms, ...chatrooms.data];
    } else {
      console.log("else", findIndex, room, message, notViewed );
      let findData = chatrooms.data[findIndex]
      findData = { ...findData, notViewed, lastMessage: message }
      chatrooms.data = chatrooms.data.filter(r => r._id !== room);
      chatrooms.data = [findData, ...chatrooms.data];
    };
    
  }

  const selectChat = async (roomId) => {
    chatrooms.data =  chatrooms.data.map(item => {
      if (item._id == roomId) {
        item.notViewed = 0
      }
      return item
    })
  }




  // For Socket
  const newMessage = async (message) => {
    chatMessages.data = [...chatMessages.data, message]
    chatMessages.count += 1
  }
  const viewMessage =  (id) => {
    chatMessages.data =  chatMessages.data.map(item => {
      if(item?.sender?._id == auth_store.user?.id  && item?.room == id) {
        item.viewed = true
      }
      return item
    })
  }

  
  return {
    chatrooms,
    chatMessages,
    selectChatRoom,
    getChatrooms,
    getChatMessages,
    sendMessage,
    newMessage,
    viewMessage,
    filterRoom,
    selectChat,
    getOneChatroom
  }
})
