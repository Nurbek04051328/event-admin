<template>
  <div class="flex gap-2 items-center w-full">

    <VueDatePicker v-model="date" placeholder="Выберите месяц" range :multi-calendars="{ solo: true }" class="w-full placeholder:text-black-500 peer" />

    <filterSelect
      v-model="search.type"
      name="type"
      :options="walletActions"
      option_title="title"
      :class="['w-full z-[99]'] "
      placeholder="Выберите транзакция"
    />
    <button class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg w-auto p-2" @click="clear">
      <XMarkIcon class="size-5" />
    </button>
    <button class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg w-auto p-2" @click="findMe">
      <MagnifyingGlassIcon class="size-5" />
    </button>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { transactionStore } from '@/stores/data/transaction'
import { ref, watch } from 'vue'

const store = transactionStore()

const search = ref({
  type: '',
  from: null,
  to: null,
})

let date = ref([]) // ✅ **Boshlang‘ich qiymat bo‘sh massiv bo‘lishi kerak**

const walletActions = [
  { _id: 'refill', title: 'Приход' },
  { _id: 'refound', title: 'Возврат' },
  { _id: 'purchase', title: 'Покупка' },
  { _id: 'withdrawal', title: 'Вывод' },
  { _id: 'deposit', title: 'Пополнение' },
]


const findMe = () => {
  store.getTransactions({ ...search.value })
}


const clear = () => {
  search.value = { type: '', from: null, to: null }
  date.value = []
  findMe()
}


watch(date, (newDate) => {
  if (newDate && newDate.length === 2) {
    search.value.from = new Date(newDate[0])
    search.value.to = new Date(newDate[1])
    findMe()
  }
})


</script>