import { ref  } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/tax'

export const taxStore = defineStore('taxStore', () => {
  const taxes = ref([])
  const taxesCount = ref(0)
  const notification = useNotification()

  const getTaxes = async (params) => {
    const { data } = await api.get(base_url, {params})
    taxes.value = data?.taxes;
    taxesCount.value = data?.count;
  }

  const addTax = async (category, t) => {
    console.log("nalog", category);
    
    const { data } = await api.post(base_url, category)
    taxes.value = [data,...taxes.value]
    taxesCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeTax = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    taxes.value = taxes.value.filter((item) => item._id !== id)
    taxesCount.value > 0 ? (taxesCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveTax = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    taxes.value = taxes.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getTax = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
    let {data} = await api.get(`${base_url}/status/${id}/${status}`)
    if (data) {
      taxes.value = taxes.value.map(reg => {
        if (reg._id == id) return {
            ...reg,
            status: status
        }
        return reg
      })
    }
  }

  return {
    taxes,
    taxesCount,
    getTaxes,
    addTax,
    removeTax,
    saveTax,
    getTax,
    changeStatus
  }
})
