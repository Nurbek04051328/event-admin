import { ref } from 'vue'
import { defineStore } from 'pinia'
import cookies from 'vue-cookies'
import api from '@/helpers/api'
import { connectSocket, disconnectSocket } from "@/socket";
import router from '../../router'

import { useNotification } from '../usefull/notification'

export const authStore = defineStore('authStore', () => {
  const user = ref('')
  const notification = useNotification()

  const login = async (user) => {
    try {
      const { data } = await api.post('/auth/login', user)
      console.log(data)
      if (data?.accessToken) {
        cookies.set('dashboard-token', data?.accessToken)
        user = { ...data.user }
        connectSocket()
        router.push({ name: 'dashboard' })
      }
    } catch (error) {
      console.log(error)
      notification.setNotif(true, error?.response?.data?.message, 'danger')
    }
  }

  const checkUser = async () => {
    try {
      if(cookies.get('dashboard-token')) {
        const { data } = await api.get('auth/verify')
        user.value = { ...data }
      } else {
        router.push({ name: 'signIn' })
      }
    } catch (error) {
      if (error.response?.status == 401) {
        router.push({ name: 'signIn' })
      }
      console.log(error)
    }
  }

  const getLanguage = async (params) => {
    const response = await api.get('/employee/set-language', {params})
    console.log("language", response);
    if(response.status == 200) {
      notification.setNotif(true, 'Til yangilandi', 'info')
    }
  }

  const logout = () => {
    cookies.remove('dashboard-token')
    disconnectSocket()
    router.push({ name: 'signIn' })
  }

  return {
    user,
    logout,
    checkUser,
    login,
    getLanguage
  }
})
