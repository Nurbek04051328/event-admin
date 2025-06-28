import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/social-media'

export const socialStore = defineStore('socialStore', () => {
  const socials = ref([])
  const socialsCount = ref(0)
  const notification = useNotification()

  const getSocials = async (params) => {
    console.log(params);
    
    const { data } = await api.get(base_url, {params})
    console.log("social", data);
    
    socials.value = data?.socialMedia;
    socialsCount.value = data?.count;
  }

  const addSocial = async (social, t) => {
    console.log("add", social);
    
    const { data } = await api.post(base_url, social)
    socials.value = [data,...socials.value]
    socialsCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeSocial = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    socials.value = socials.value.filter((item) => item._id !== id)
    socialsCount.value > 0 ? (socialsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveSocial = async (social, t) => {
    console.log(social);
    
    const { data } = await api.put(`${base_url}`, social)
    socials.value = socials.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getSocial = async (id) => {
    return await api.get(`${base_url}/${id}`)
  }

  const changeStatus = async (id, status) => {
      let {data} = await api.get(`${base_url}/status/${id}/${status}`)
      if (data) {
        socials.value = socials.value.map(reg => {
          if (reg._id == id) return {
              ...reg,
              status: status
          }
          return reg
        })
      }
    }

  return {
    socials,
    socialsCount,
    getSocials,
    addSocial,
    removeSocial,
    saveSocial,
    getSocial,
    changeStatus
  }
})