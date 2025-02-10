<template>
  <div class="space-x-2 flex items-center">
    <default-input v-model="title" placeholder="Поиск по названию" />
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
import { atributeCategoryStore } from '@/stores/data/atributCategory'
const store = atributeCategoryStore()
import { ref } from 'vue'


const title = ref('')


const findMe = async () => {
  await store.getAtributeCategories({
    page: 1,
    title: title.value.trim(),
  })
}

const clear = () => {
  title.value = ''
  findMe()
}
</script>
<style lang=""></style>