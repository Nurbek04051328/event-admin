<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <div class="flex items-center justify-between pl-4">

      <h3 class="text-[#645A77] text-[22px] font-bold">Финансы</h3>
      <div class="flex items-center justify-end px-4 gap-3">
          <router-link
            :to="{ name: 'transaction-list' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'transaction-list'
            }"
          >
            Транзакция
          </router-link>
          <router-link
            :to="{ name: 'sales' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'sales'
            }"
          >
            Продажи
          </router-link>
          <router-link
            :to="{ name: 'ticketpaskage' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'ticketpaskage'
            }"
          >
            Тарифы
          </router-link>
          <router-link
            :to="{ name: 'type-notification' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded"
            :class="
              route.name == 'type-notification' ? 'bg-purple-500 py-1 px-3 rounded text-white' : 
              route.name == 'package-notification' ? 'bg-purple-500 py-1 px-3 rounded text-white' :
              route.name == 'bought-notification' ? 'bg-purple-500 py-1 px-3 rounded text-white' :
              ''
            "
          >
            Уведомление
          </router-link>
          <router-link
            :to="{ name: 'tax' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'tax'
            }"
          >
            Налог
          </router-link>
          <router-link
            :to="{ name: 'refound' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'refound'
            }"
          >
            Политика возврата
          </router-link>
        </div>
    </div>
    <div class="mt-2">
      <router-view />
    </div>
  </div>
</template>
<script setup>
// import { storeToRefs } from 'pinia';

import { onMounted, ref } from 'vue'


import { transactionStore } from '@/stores/data/transaction'
const store = transactionStore()
import { statisticStore } from '@/stores/data/statistic'
const stat_store = statisticStore()

import { usersStore } from '@/stores/data/users'
const users_store = usersStore()

import { useRoute } from 'vue-router'
const route = useRoute()

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