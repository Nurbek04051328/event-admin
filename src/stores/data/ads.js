import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/ad'

export const adsStore = defineStore('adsStore', () => {
  const ads = ref([])
  const adsCount = ref(0)
  const notification = useNotification()

  const getAds = async (params) => {
    const { data } = await api.get(base_url, {params})
    console.log("dadada", data);
    
    ads.value = data?.ad;
    adsCount.value = data?.count;
  }

  const addAd = async (ad,t) => {
    const { data } = await api.post(base_url, ad)
    ads.value = [data,...ads.value]
    adsCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeAd = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    ads.value = ads.value.filter((item) => item._id !== id)
    adsCount.value > 0 ? (adsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveAd = async (ad, t) => {
    const { data } = await api.put(`${base_url}`, ad)
    ads.value = ads.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getAd = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }


  const changeStatus = async (id, status) => {
    console.log("iststats", id, status);
    
    let {data} = await api.get(`${base_url}/status/${id}/${status}`)
    console.log(data);
    if (data) {
      ads.value = ads.value.map(ad => {
          if (ad._id == id) return {
              ...ad,
              status: status
          }
          return ad
      })
    }
    
    // .then(()=> {
    //   ads.value = ads.value.map(ad => {
    //       if (ad._id == id) return {
    //           ...ad,
    //           status: status
    //       }
    //       return ad
    //   })
    // })
  }

  return {
    ads,
    adsCount,
    getAds,
    addAd,
    removeAd,
    saveAd,
    getAd,
    changeStatus
  }
})

