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
import { newsStore } from '@/stores/data/news'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
const store = newsStore()

const title = ref('')
// const router = useRouter()

const findMe = async () => {
  await store.getNews({
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