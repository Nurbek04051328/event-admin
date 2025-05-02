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
  const comments = reactive({
    data: [],
    count: 0
  })
  const likes = reactive({
    data: [],
    count: 0
  })
  const viewsHistory = reactive({
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

  const addPost = async (n, ) => {
    const { data } = await api.post(`api${base_url}`, n)
    posts.data = [data, ...posts.data]
    posts.count += 1
    notification.setNotif(true, 'Добавлена новая пост.', 'success')
  }

  const savePost = async (post) => {
    console.log(post);
    
    const { data } = await api.put(`api${base_url}`, post)
    posts.data = posts.data.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Обновлено', 'info')
  }

  const changeStatus = async (payload, t) => {
    try {
      const { data } = await api.post(`${base_url}/status`, payload)
      if (data) {
        posts.data = posts.data.map((p) => {
          if (p._id == payload._id)
            return {
              ...p,
              status: payload.status
            }
          return p
        })
      }
      notification.setNotif(true, 'Обновлено', 'success')
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }

  const getPost = async (id) => {
    try {
      let { data } = await api.get(`${base_url}/${id}`)
      console.log("storkega keldi",data)
      return data
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }
  const getInfoPost = async (id) => {
    try {
      let { data } = await api.get(`api${base_url}/get-post-info/${id}`)
      console.log("info",data)
      return data
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }
  const getViewPost = async (id, params) => {
    try {
      let { data } = await api.get(`api${base_url}/get-post-views/${id}`,{ params })
      viewsHistory.data = [...data.views]
      viewsHistory.count = data.count
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }
  const getLikePost = async (id, params) => {
    try {
      let { data } = await api.get(`api${base_url}/get-post-likes/${id}`, { params })
      likes.data = [...data.likes]
      likes.count = data.count
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }
  const getCommentsPosts = async (id, params) => {
    try {
      const { data } = await api.get(`api${base_url}/get-post-comments/${id}`, { params })
      console.log('postdata', data)
      comments.data = [...data.comments]
      comments.count = data.count
    } catch (error) {
      notification.setNotif(true, error?.response?.data?.message, 'error')
    }
  }

  return {
    posts,
    getPosts,
    getPost,
    changeStatus,
    addPost,
    savePost,
    getInfoPost,
    getViewPost,
    viewsHistory,
    getLikePost,
    likes,
    getCommentsPosts,
    comments,
  }
})

