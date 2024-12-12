import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'
import { useI18n } from 'vue-i18n'
const base_url = '/ticket-package'

export const tarifStore = defineStore('tarifStore', () => {
  const { t } = useI18n()
  const tarifs = ref([])
  const tarifsCount = ref(0)
  const notification = useNotification()

  const getTarifs = async (params) => {
    const { data } = await api.get(base_url, params)
    console.log('data', data)

    tarifs.value = data?.ticketPackages
    tarifsCount.value = data?.count
  }

  const addTarif = async (paskage) => {
    const { data } = await api.post(base_url, paskage)
    tarifs.value = [data, ...tarifs.value]
    tarifsCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeTarif = async (id) => {
    await api.delete(`${base_url}/${id}`)
    tarifs.value = tarifs.value.filter((item) => item._id !== id)
    tarifsCount.value > 0 ? (tarifsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveTarif = async (paskage) => {
    const { data } = await api.put(`${base_url}`, paskage)
    tarifs.value = tarifs.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getTarif = async (id, language) => {
    console.log(id, language)

    return await api.get(`${base_url}/${id}/${language}`)
  }

  return {
    tarifs,
    tarifsCount,
    getTarifs,
    addTarif,
    removeTarif,
    saveTarif,
    getTarif
  }
})
