import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/news'

export const newsStore = defineStore('newsStore', () => {
  const news = ref([])
  const newsCount = ref(0)
  const notification = useNotification()

  const getNews = async (params) => {
    const { data } = await api.get(base_url, {params})
    console.log("news", data);
    
    news.value = data?.news;
    newsCount.value = data?.count;
  }

  const addNews = async (n, ) => {
    const { data } = await api.post(base_url, n)
    news.value = [data, ...news.value]
    newsCount.value += 1
    notification.setNotif(true, 'Добавлена новая новость.', 'success')
  }

  const removeNews = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    news.value = news.value.filter((item) => item._id !== id)
    newsCount.value > 0 ? (newsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveNews = async (n,) => {
    const { data } = await api.put(`${base_url}`, n)
    news.value = news.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, 'Новость отредактирована.', 'info')
  }

  const getOneNews = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  
  const changeStatus = async (id, status) => {
    let {data} = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      news.value = news.value.map(n => {
          if (n._id == id) return {
              ...n,
              status: status
          }
          return n
      })
    }
  }

  return {
    news,
    newsCount,
    getNews,
    addNews,
    removeNews,
    saveNews,
    getOneNews,
    changeStatus
  }
})