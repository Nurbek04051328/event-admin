import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
// import { useNotification } from '../usefull/notification'
import { useLoadingStore } from '@/stores/usefull/loading'
import api from '@/helpers/api'

const base_url = '/statistic/all-counts'

export const statisticStore = defineStore('statisticStore', () => {
  const statistic_counts = ref({})
  const loadingStore = useLoadingStore()
  
  const purchases = reactive({
    purchase: [],
    refound: []
  })

  const deposits = reactive({
    deposit: [],
    withdrawal: []
  })

  const eventChart = reactive({
    denied: [],
    pending: [],
    purchase: [],
    used: [],
  })
  const profComissionChart = reactive({
    commission: [],
    income: [],
    totalCommission: 0,
    totalIncome: 0,
  })

  const getStatistics = async (params) => {

      loadingStore.start()
      const { data } = await api.get(base_url, { params })
      console.log("getStatistics", data);
      
      statistic_counts.value = { ...data }
      loadingStore.stop()
      
  }

  const ticketStatistic = async (params) => {
    try {
      // loadingStore.start()
      const { data } = await api.get('/statistic/ticket-statistic', { params })
      console.log("ticketStatistic", data);
      eventChart.denied = data.denied || []
      eventChart.pending = data.pending || []
      eventChart.purchase = data.purchase || []
      eventChart.used = data.used || []
    }catch (error) {
    console.error('Statistika olishda xatolik:', error)
  } finally {
      // loadingStore.stop()
    }
  }
  const profitStatistic = async (params) => {
    const { data } = await api.get('/statistic/profit-statistic', { params })
    console.log("profitStatistic", data);
    profComissionChart.commission = data.commission || []
    profComissionChart.income = data.income || []
    profComissionChart.totalCommission = data.totalCommission || 0
    profComissionChart.totalIncome = data.totalIncome || 0
  }
  const userStatistic = async (params) => {
    return await api.get('/statistic/user-statistic', { params })
  }
  const allDeposit = async (params) => {
  
      loadingStore.start()
      const {data} =  await api.get('/statistic/wallet-statistic', { params })
      purchases.purchase = data.purchase || []
      purchases.refound = data.refound || []

      deposits.deposit = data.deposit || []
      deposits.withdrawal = data.withdrawal || []
      loadingStore.stop()
    
  }

  return {
    statistic_counts,
    getStatistics,
    ticketStatistic,
    profitStatistic,
    userStatistic,
    allDeposit,
    purchases,
    deposits,
    eventChart,
    profComissionChart
  }
})
