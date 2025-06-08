<template>
  <div>
    <!-- 📱 Mobile: Only button visible -->
    <div class="hidden items-center md:flex">
      <button
        class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg p-2 w-auto"
        @click="showFilter = true"
      >
        <MagnifyingGlassIcon class="size-5" />
      </button>
    </div>

    <!-- 💻 Desktop: Inputs and buttons -->
    <div class="space-x-2 flex items-center md:hidden">
      <default-input v-model="search" placeholder="Поиск по имени" />
      <phone-maska
        v-model="phone"
        name="phone"
        placeholder="Введите номер телефона"
      />
      <button
        class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg w-auto p-2"
        @click="clear"
      >
        <XMarkIcon class="size-5" />
      </button>
      <button
        class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg w-auto p-2"
        @click="findMe"
      >
        <MagnifyingGlassIcon class="size-5" />
      </button>
    </div>

    <!-- 📲 Mobile Filter Modal -->
    <transition name="fade">
      <div
        v-if="showFilter"
        class="fixed top-0 right-0 w-[50%] h-full bg-white z-50 flex flex-col p-4 xm:w-[80%]"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-[#483D5B]">Фильтр</h2>
          <button @click="clearModal" class="p-2 text-[#FF5558]">
            <XMarkIcon class="size-6" />
          </button>
        </div>

        <div class="flex flex-col space-y-4">
          <default-input v-model="search" placeholder="Поиск по имени" />
          <phone-maska
            v-model="phone"
            name="phone"
            placeholder="Введите номер телефона"
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
import { ref } from 'vue'
import { workerStore } from '@/stores/data/workers'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'

const store = workerStore()
const search = ref('')
const phone = ref('')
const showFilter = ref(false)

const findMe = async () => {
  await store.getWorkers({
    page: 1,
    search: search.value,
    phone: phone.value
  })
}

const clear = () => {
  search.value = ''
  phone.value = ''
}
const clearModal = () => {
  showFilter.value = false
  search.value = ''
  phone.value = ''
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>














<!-- <template>
  <div class="space-x-2 flex items-center">
    <default-input v-model="search" placeholder="Поиск по имени" />
    <phone-maska
      v-model="phone"
      name="phone"
      placeholder="Введите номер телефона"
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
import { workerStore } from '@/stores/data/workers'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
const store = workerStore()

const search = ref('')
const phone = ref('')
// const router = useRouter()

const findMe = async () => {
  await store.getWorkers({
    page: 1,
    search: search.value,
    phone: phone.value
  })
}

const clear = () => {
  search.value = ''
  phone.value = ''
}
</script>
<style lang=""></style> -->
