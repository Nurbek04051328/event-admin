<template>
  <div class="h-screen flex flex-col">
    <div class="flex items-center justify-between pl-4 md:w-[w-full]">

      <h3 class="text-[#645A77] text-[22px] font-bold md:hidden">Финансы</h3>
      <div class="flex items-center justify-end px-4 gap-3 md:fixed md:w-full md:bottom-0 md:right-0 md:left-0 md:bg-white md:py-3 md:pl-4 md:z-50 md:overflow-y-auto md:shadow-lg md:shadow-violet-900 sm:overflow-hidden sm:w-auto sm:justify-center">
          <router-link
            :to="{ name: 'transaction-list' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded sm:border-0"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'transaction-list'
            }"
          >
            <span class="sm:hidden">Транзакция</span>
            <BanknotesIcon class="hidden size-7 sm:block"/>
          </router-link>
          <router-link
            :to="{ name: 'sales' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded sm:border-0"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'sales'
            }"
          >
            <span class="sm:hidden">Продажи</span>
            <PresentationChartLineIcon class="hidden size-7 sm:block"/>
          </router-link>
          <router-link
            :to="{ name: 'ticketpaskage' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded sm:border-0"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'ticketpaskage'
            }"
          >
            <span class="sm:hidden">Тарифы</span>
            <SwatchIcon class="hidden size-7 sm:block"/>
          </router-link>
          <router-link
            :to="{ name: 'type-notification' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded sm:border-0"
            :class="
              route.name == 'type-notification' ? 'bg-purple-500 py-1 px-3 rounded text-white' : 
              route.name == 'package-notification' ? 'bg-purple-500 py-1 px-3 rounded text-white' :
              route.name == 'bought-notification' ? 'bg-purple-500 py-1 px-3 rounded text-white' :
              ''
            "
          >
            <span class="sm:hidden">Уведомление</span>
            <BellIcon class="hidden size-7 sm:block"/>
          </router-link>
          <router-link
            :to="{ name: 'tax' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded sm:border-0"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'tax'
            }"
          >
            <span class="sm:hidden">Налог</span>
            <ReceiptPercentIcon class="hidden size-7 sm:block"/>
          </router-link>
          <router-link
            :to="{ name: 'refound' }"
            class="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-1 px-3 rounded sm:border-0 min-w-44 sm:min-w-0"
            :class="{
              'bg-purple-500 py-1 px-3 rounded text-white': route.name == 'refound'
            }"
          >
            <span class="sm:hidden">Политика возврата</span>
            <ReceiptRefundIcon class="hidden size-7 sm:block"/>
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
import {
  BanknotesIcon,
  PresentationChartLineIcon,
  SwatchIcon,
  BellIcon,
  ReceiptPercentIcon,
  ReceiptRefundIcon
} from '@heroicons/vue/24/outline'

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

// const getData = async () => {
//   console.log("page", page.value);
  
//   await store.getTransactions({ limit: limit.value, page: page.value })
//   await users_store.getUsers({ limit: 0, type:"all"})
// }

// onMounted(async () => {
//   await getData()
// })
</script>
<style lang=""></style>