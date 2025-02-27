import { ref  } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/refound'

export const refoundStore = defineStore('refoundStore', () => {
  const refounds = ref([])
  const refaundsCount = ref(0)
  const notification = useNotification()

  const getRefaunds = async (params) => {
    console.log(params);
    
    const { data } = await api.get(base_url, {params})
    console.log("refaunds", data);
    
    refounds.value = data?.refounds;
    refaundsCount.value = data?.count;
  }

  const addRefaund = async (category, t) => {
    const { data } = await api.post(base_url, category)
    refounds.value = [data,...refounds.value]
    refaundsCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeRefaund = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    refounds.value = refounds.value.filter((item) => item._id !== id)
    refaundsCount.value > 0 ? (refaundsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveRefaund = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    console.log("saverefaund",data);
    
    refounds.value = refounds.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getRefaund = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  return {
    refounds,
    refaundsCount,
    getRefaunds,
    addRefaund,
    removeRefaund,
    saveRefaund,
    getRefaund,
  }
})
