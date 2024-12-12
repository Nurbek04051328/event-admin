import { reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

const base_url = '/user'

export const usersStore = defineStore('usersStore', () => {
  const user = reactive({
    data: [],
    count: 0
  })
  // const notification = useNotification()

  const getUsers = async (params) => {
    console.log(params);
    
    const { data } = await api.get(base_url, {params})
    console.log('dataUser', data)

    user.data = [...(data?.users || [])]
    user.count = data?.count || 0
  }

  const getUser = async (id) => {
    console.log("id", id);
    
    const { data } = await api.get(`${base_url}/${id}`)
    return data
  }

  const getuserEvents = async (id) => {
    const { data } = await api.get(`${base_url}/user-events/${id}`)
    return data
  }

  const userAccess = async (payload) => {
    console.log(payload)
    const { data } = await api.put('/user/user-access', payload)
    return data
  }

  return {
    user,
    getUsers,
    getUser,
    userAccess,
    getuserEvents
  }
})
