<template>
  <div>
    <!-- Mobile button  -->
    <div class="hidden items-center md:flex">
      <button
        class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg p-2 w-auto"
        @click="showFilter = true"
      >
        <MagnifyingGlassIcon class="size-5" />
      </button>
    </div>
    <!--Desktop: Inputs and buttons -->
    <div class="flex gap-2 items-center w-full md:hidden">
      <filterSelect
        v-model="search.user"
        name="type"
        :options="users_store.user?.data"
        option_title="lname name"
        :class="['w-full z-[99]'] "
        placeholder="Выберите пользователя"
        @change="findMe"
      />
      <VueDatePicker v-model="date" placeholder="Выберите месяц" range :multi-calendars="{ solo: true }" class="w-full placeholder:text-black-500 peer" />
      <filterSelect
        v-model="search.type"
        name="type"
        :options="walletActions"
        option_title="title"
        :class="['w-full z-[99]'] "
        placeholder="Выберите транзакция"
        @change="findMe"
      />
      <button class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg w-auto p-2" @click="clear">
        <XMarkIcon class="size-5" />
      </button>
      <button class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg w-auto p-2" @click="findMe">
        <MagnifyingGlassIcon class="size-5" />
      </button>
    </div>

    <!--Mobile Filter Modal -->
    <transition name="fade">
      <div
        v-if="showFilter"
        class="fixed top-0 right-0 w-[50%] h-full bg-white z-50 flex flex-col p-4 xm:w-[80%] shadow-lg"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-[#483D5B]">Фильтр</h2>
          <button @click="clearModal" class="p-2 text-[#FF5558]">
            <XMarkIcon class="size-6" />
          </button>
        </div>

        <div class="flex flex-col space-y-4">
          <filterSelect
            v-model="search.user"
            name="type"
            :options="users_store.user?.data"
            option_title="lname name"
            :class="['w-full z-[99]'] "
            placeholder="Выберите пользователя"
          />
          <VueDatePicker v-model="date" placeholder="Выберите месяц" range :multi-calendars="{ solo: true }" class="w-full placeholder:text-black-500 peer" />
          <filterSelect
            v-model="search.type"
            name="type"
            :options="walletActions"
            option_title="title"
            :class="['w-full z-[99]'] "
            placeholder="Выберите транзакция"
          />

          <button
            class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg py-2"
            @click="() => { findMe(); showFilter = false }"
          >
            Применить
          </button>
          <button
            class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg py-2"
            @click="() => { clear(); showFilter = false }"
          >
            Очистить
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { transactionStore } from '@/stores/data/transaction'
const store = transactionStore()
import { usersStore } from '@/stores/data/users'
const users_store = usersStore()

const emit = defineEmits(['update:modelValue', 'change'])

const search = ref({
  user: '',
  type: '',
  from: null,
  to: null,
})

const showFilter = ref(false)

let date = ref([]) // Boshlang'ich qiymat bo'sh massiv bo‘lishi kerak

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
  search.value = { user: '',type: '', from: null, to: null }
  date.value = []
  findMe()
}

const clearModal = () => {
  showFilter.value = false
  search.value = { user: '',type: '', from: null, to: null }
  date.value = []
}


watch(date, (newDate) => {
  if (newDate && newDate.length === 2) {
    search.value.from = new Date(newDate[0])
    search.value.to = new Date(newDate[1])
    findMe()
  }
})


</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>