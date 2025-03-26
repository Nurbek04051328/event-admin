import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

const base_url = '/api/default/tags'

export const tagStore = defineStore('tagStore', () => {
  const tags = ref([])


  const getHashtags = async (params) => {
    console.log("hashparams", params);
    
    const { data } = await api.get(base_url, {params})
    console.log("hashtag", data);
    return data
    
    // ads.value = data?.ad;

  }


  

  return {
    tags,
    getHashtags,
  }
})
