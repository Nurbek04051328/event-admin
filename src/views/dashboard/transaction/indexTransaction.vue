<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.transactionsCount"
    >
      <TransactionSearch/>
    </headPart>
    <div class="px-4 pb-0 w-full grid grid-cols-12 gap-4 overflow-hidden">
      <TransactionStatistic class="col-span-6"  :transactionChart="stat_store.deposits"/>
      <div class="col-span-6 overflow-auto flex flex-col flex-1">
        
        <TransactionTable
          :page="page" :limit="limit"
        />
        <div class="pl-4 pb-2">
          <paginate
            v-if="store.transactionsCount > limit"
            v-model="page"
            :page-count="Math.ceil(store.transactionsCount / limit)"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Пред'"
            :next-text="'След'"
            :page-class="'page-item'"
            :container-class="'pagination_next shadow'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { storeToRefs } from 'pinia';
import TransactionTable from '@/components/data/dashboard/transaction/transactionTable.vue'
import TransactionStatistic from '@/components/data/dashboard/transaction/transactionStatistic.vue'
import TransactionSearch from '@/components/data/dashboard/transaction/transactionSearch.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'


import { transactionStore } from '@/stores/data/transaction'
const store = transactionStore()
import { statisticStore } from '@/stores/data/statistic'
const stat_store = statisticStore()

import { usersStore } from '@/stores/data/users'
const users_store = usersStore()

// Pagination
const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  console.log("page", page.value);
  
  await store.getTransactions({ limit: limit.value, page: page.value })
  await users_store.getUsers({ limit: 0, type:"all"})
  await stat_store.allDeposit()
}

onMounted(async () => {
  await getData()
})
</script>
<style lang=""></style>