import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/statistic/all-counts'

export const statisticStore = defineStore('statisticStore', () => {
  const statistic_counts = ref({})

  const getStatistics = async (params) => {
    const { data } = await api.get(base_url, { params })
    statistic_counts.value = { ...data }
  }

  const ticketStatistic = async (params) => {
    return await api.get('/statistic/ticket-statistic', { params })
  }
  const profitStatistic = async (params) => {
    return await api.get('/statistic/profit-statistic', { params })
  }
  const userStatistic = async (params) => {
    return await api.get('/statistic/user-statistic', { params })
  }
  const allDeposit = async (params) => {
    return await api.get('/statistic/wallet-statistic', { params })
  }

  return {
    statistic_counts,
    getStatistics,
    ticketStatistic,
    profitStatistic,
    userStatistic,
    allDeposit
  }
})
