import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'
import router from '@/router'

const base_url = '/post'

export const postStore = defineStore('postStore', () => {
  const posts = reactive({
    data: [],
    count: 0
  })
  const notification = useNotification()

  const getPosts = async (params) => {
    try {
      const { data } = await api.get(base_url, { params })
      console.log('postdata', data)
      posts.data = [...data.posts]
      posts.count = data.count
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }

  const changeStatus = async (payload) => {
    try {
      console.log(payload)
      const { data } = await api.post(`${base_url}/status`, payload)
      console.log(data)
      notification.setNotif(true, t('story.update'), 'success')
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }

  const getPost = async (id) => {
    try {
      let { data } = await api.get(`${base_url}/${id}`)
      console.log(data)
      return data
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }

  return {
    posts,
    getPosts,
    getPost,
    changeStatus
  }
})
