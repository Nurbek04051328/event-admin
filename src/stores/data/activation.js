import { reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { useNotification } from '../usefull/notification'

const base_url = '/logger/activation-key'

export const activationStore = defineStore('activationStore', () => {
  const activation = reactive({
    data: [],
    count: 0
  })
  const notification = useNotification()

  const getActivations = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log('data', data)
    activation.data = [...data.activationKeys]
    activation.count = data.count
  }

  const getLastKey = async () => {
    const { data } = await api.get(base_url, { params: { limit: 1} })
    activation.data = [...data.activationKeys,...activation.data]
    activation.count += 1
    notification.setNotif(true, 'Добавлено новое Key', 'success')
  }
  const getActiveKey = async (id) => {
    activation.data = activation.data.map(item => {
      if(item._id == id) item.activated = true
      return item
    })
  }
  return {
    activation,
    getActivations,
    getLastKey,
    getActiveKey
  }
})
