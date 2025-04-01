import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/attribute'

export const atributStore = defineStore('atributStore', () => {
  const atributs = ref([])
  const atributsCount = ref(0)
  const notification = useNotification()

  const getAtributes = async (params) => {
    atributs.value = []
    const { data } = await api.get(base_url, {params})
    atributs.value = data?.attributes;
    atributsCount.value = data?.count;
  }

  const addAtribut = async (atribut, t) => {
    const { data } = await api.post(base_url, atribut)
    atributs.value = [data,...atributs.value]
    atributsCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeAtribut = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    atributs.value = atributs.value.filter((item) => item._id !== id)
    atributsCount.value > 0 ? (atributsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveAtribut = async (atribut, t) => {
    const { data } = await api.put(`${base_url}`, atribut)
    atributs.value = atributs.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getAtribut = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
    let {data} = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      atributs.value = atributs.value.map(atr => {
        if (atr._id == id) return {
            ...atr,
            status: status
        }
        return atr
      })
    }
  }
  

  return {
    atributs,
    atributsCount,
    getAtributes,
    addAtribut,
    removeAtribut,
    saveAtribut,
    getAtribut,
    changeStatus
  }
})