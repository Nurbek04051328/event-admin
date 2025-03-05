import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
const base_url = '/statistic/wallet-history'

export const transactionStore = defineStore('transactionStore', () => {
  const transactions = ref([])
  const transactionsCount = ref(0)

  const getTransactions = async (params) => {
    const { data } = await api.get(base_url, {params})
    console.log('dataTrans', data)

    transactions.value = data?.wallet
    transactionsCount.value = data?.count
  }


  return {
    transactions,
    transactionsCount,
    getTransactions,

  }
})
