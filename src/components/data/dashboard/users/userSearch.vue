<template>
  <div class="space-x-2 flex items-center">
    <default-input v-model="search.title" placeholder="Поиск по имени, email" />
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
import { useRouter } from 'vue-router'
const store = workerStore()

const search = ref({})
const router = useRouter()

const findMe = async () => {
  await store.getWorkers({
    page: 1,
    ...search.value
  })
}

const clear = () => {
  findMe()
}
</script>
<style lang=""></style>