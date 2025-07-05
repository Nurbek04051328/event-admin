import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

const base_url = '/statistic/wallet-history'

export const transactionStore = defineStore('transactionStore', () => {
  const transactions = ref([])
  const transactionsCount = ref(0)
  const deposit = ref(0)
  const profit = ref(0)
  const purchase = ref(0)
  const withdrawal = ref(0)

  
  const getTransactions = async (params) => {
    const { data } = await api.get(base_url, {params})
    
    transactions.value = data?.wallet
    transactionsCount.value = data?.count
    deposit.value = data?.deposit
    profit.value = data?.profit
    purchase.value = data?.purchase
    withdrawal.value = data?.withdrawal
  }


  return {
    transactions,
    transactionsCount,
    deposit,
    profit,
    purchase,
    withdrawal,
    getTransactions,
  }
})
