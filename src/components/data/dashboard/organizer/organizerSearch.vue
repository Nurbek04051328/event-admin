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
    <div class="space-x-2 flex items-center md:hidden">
      <div class="w-[300px]">
        <default-input 
          v-model="search.search" 
          placeholder="Поиск по имени" 
          @enter="findMe"
        />
      </div>
      <div>
        <filterSelect
          v-model="search.status"
          :options="statusList"
          option_title="title"
          :class="['w-full z-[100]'] "
          placeholder="Выберите статус"
          @change="findMe"
        />
      </div>
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
          <default-input v-model="search.search" placeholder="Поиск по имени" />
          <filterSelect
            v-model="search.status"
            :options="statusList"
            option_title="title"
            :class="['w-full z-[100]'] "
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
import { computed, ref } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import DefaultSelect from '@/components/default/defaultSelect.vue'
import { userStatus } from '@/helpers/vars'

const search = defineModel()
const showFilter = ref(false)

const emit = defineEmits(['searching'])

const statusList = computed(() => {
  return Object.entries(userStatus).map(([key, value]) => ({ _id: key, title: value.title }))
})

const findMe = async () => {
  // router.push({ name: 'users', query: { ...search.value } })
  emit('searching')
}

const clear = () => {
  search.value = {
    status: '',
    search: ''
  }
  emit('searching')
}

const clearModal = () => {
  showFilter.value = false
  search.value = {
    status: '',
    search: ''
  }
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
