import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/attribute-category'

export const atributeCategoryStore = defineStore('atributeCategoryStore', () => {
  const atributeCategories = ref([])
  const atributeCategoryCount = ref(0)
  const notification = useNotification()

  const getAtributeCategories = async (params) => {
    console.log(params);
    
    const { data } = await api.get(base_url, {params})
    console.log("atributcategory", data);
    
    atributeCategories.value = data?.attributeCategories;
    atributeCategoryCount.value = data?.count;
  }

  const addAtributeCategory = async (category, t) => {
    const { data } = await api.post(base_url, category)
    atributeCategories.value = [data,...atributeCategories.value]
    atributeCategoryCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeAtributeCategory = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    atributeCategories.value = atributeCategories.value.filter((item) => item._id !== id)
    atributeCategoryCount.value > 0 ? (atributeCategoryCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveAtributeCategory = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    atributeCategories.value = atributeCategories.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getAtributeCategory = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  

  return {
    atributeCategories,
    atributeCategoryCount,
    getAtributeCategories,
    addAtributeCategory,
    removeAtributeCategory,
    saveAtributeCategory,
    getAtributeCategory,
  }
})