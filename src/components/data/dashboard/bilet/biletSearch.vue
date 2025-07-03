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
    <div class="gap-2 flex items-center md:hidden">
      <filterSelect
        v-model="search.user"
        name="user"
        :options="user__store.user.data || []"
        :option_title="[`name`, `lname`]"
        :class="['w-full z-[99]'] "
        placeholder="Выберите пользовател"
        @change="findMe"
      />
      <filterSelect
        v-model="search.status"
        name="status"
        :options="statuses || []"
        option_title="value"
        :class="['w-full z-[99]'] "
        placeholder="Выберите статус"
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
            name="user"
            :options="user__store.user.data || []"
            :option_title="[`name`, `lname`]"
            :class="['w-full z-[99]'] "
            placeholder="Выберите пользовател"
          />
          <filterSelect
            v-model="search.status"
            name="status"
            :options="statuses || []"
            option_title="value"
            :class="['w-full z-[19]'] "
            placeholder="Выберите статус"
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
import { onMounted, ref } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
// import { useRouter } from 'vue-router'
import { biletStore } from '@/stores/data/bilet'
const store = biletStore()

// Filter uchun ma'lumotlar
import { usersStore } from '@/stores/data/users'
const user__store = usersStore()

const showFilter = ref(false)
const search = ref({
  status: '',
  user: ''
})
// const router = useRouter()


const statuses = [
  {
    _id: 0,
    value: "В процессе",
  },
  {
    _id: 1,
    value: "Куплено",
  },
  {
    _id: 2,
    value: "Отказ",
  },
  {
    _id: 3,
    value: "Использовано",
  },
]



const findMe = async () => {
  await store.getBilets({
    ...search.value
  })
}

const clear = async() => {
  await store.getBilets({})
  search.value = {
    status: '',
    user: ''
  }
}

const clearModal = () => {
  showFilter.value = false
  search.value = {
    status: '',
    user: ''
  }
}



onMounted(async () => {
  await user__store.getUsers({ limit: 0, type:"all"})
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