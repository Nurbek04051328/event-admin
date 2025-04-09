import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import router from '@/router'

export const mainStore = defineStore('mainStore', () => {
  const taxes = ref([])

  const getTaxes = async () => {
    const { data } = await api.get('/api/default/all-tax', { params: { limit: 0, toUser: false } })
    console.log(data)
    taxes.value = [...data]
  }

  const page = reactive({
    main: 1,
    sub: 1
  })

  const setPage = (valuePage = 1, valueSub = 0) => {
    console.log(valuePage, valueSub)
    if (valuePage == -1 && page.main == 1) {
      console.log('1')
      return
    }
    if (valuePage == 0 && valueSub == -1 && page.sub == 1) {
      console.log('2')
      page.main -= 1
      page.sub = 1
      return
    }
    if (valuePage == 0 && valueSub != 0) {
      console.log('sub')
      page.sub += valueSub
      return
    }
    if (valuePage != 0) {
      console.log('3')
      page.main += valuePage
      page.sub = 1
    }
  }

  const regions = ref([])
  const getRegions = async () => {
    const { data } = await api.get('api/default/get-regions', {
      params: {
        limit: 0
      }
    })
    console.log(data)
    regions.value = [...data]
    return data
  }

  const languages = ref([])
  const getLanguages = async () => {
    const { data } = await api.get('api/default/all-languages', {
      params: {
        limit: 0
      }
    })
    languages.value = [...data]
  }

  const commissionRate = ref(0)
  const commission = ref({})
  const getTicketPackages = async (entryFee) => {
    const { data } = await api.post('api/default/get-ticket-package', { entryFee })
    console.log(data)
    commission.value = { ...data }
    commissionRate.value = data.commissionRate
    // ticketPackage.value = data
    return data._id
  }

  const addEvent = async (payload) => {
    try {
      await api.post('/api/organizer-event', payload)
      page.main = 1
      page.sub = 1
      router.push({ name: router.currentRoute?.value?.name, query: { action: 'close' } })
    } catch (error) {
      console.log(error)
    }
  }

  
  const getAtributes = async (params) => {
    const { data } = await api.get('/api/default/all-attribute-category', {
      params})
    return data
  }

  return {
    addEvent,
    commission,
    commissionRate,
    getTaxes,
    getAtributes,
    getTicketPackages,
    taxes,
    page,
    setPage,
    getRegions,
    regions,
    getLanguages,
    languages
  }
})
