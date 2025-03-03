import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/region'

export const regionStore = defineStore('regionStore', () => {
  const regions = ref([])
  const regionCount = ref(0)
  const notification = useNotification()

  const getRegions = async (params) => {
    const { data } = await api.get(base_url, { params })
    console.log(data)
    regions.value = data?.regions
    regionCount.value = data?.count
  }

  const addRegion = async (region, t) => {
    const { data } = await api.post(base_url, region)
    regions.value = [data, ...regions.value]
    regionCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeRegion = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    regions.value = regions.value.filter((item) => item._id !== id)
    regionCount.value > 0 ? (regionCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveRegion = async (region, t) => {
    const { data } = await api.put(`${base_url}`, region)
    console.log(data)
    regions.value = regions.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getRegion = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const listCategories = computed(() => {
    return [
      ...regions.value.map((region) => {
        return {
          _id: region._id,
          title: region?.translates?.at(0)?.title
        }
      })
    ]
  })

  return {
    regions,
    regionCount,
    getRegions,
    addRegion,
    removeRegion,
    saveRegion,
    getRegion,
    listCategories
  }
})
