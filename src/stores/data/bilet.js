import { reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { useNotification } from '../usefull/notification'

const base_url = '/logger/tickets'

export const biletStore = defineStore('biletStore', () => {
  const bilets = reactive({
    data: [],
    count: 0
  })
  const notification = useNotification()

  const getBilets = async (params) => {
    console.log("paramsbilet", params);
    
    const { data } = await api.get(base_url, { params })
    bilets.data = [...data.tickets]
    bilets.count = data.count
  }

  const getLastBilet = async () => {
    const { data } = await api.get(base_url, { params: { limit: 1} })
    bilets.data = [...data.tickets,...bilets.data]
    bilets.count += 1
    notification.setNotif(true, 'Добавлено новое Билет', 'success')
  }
  const getBilet = async (id) => {
    bilets.data = bilets.data.map(item => {
      if(item._id == id) item.activated = true
      return item
    })
  }
  return {
    bilets,
    getBilets,
    getLastBilet,
    getBilet
  }
})
