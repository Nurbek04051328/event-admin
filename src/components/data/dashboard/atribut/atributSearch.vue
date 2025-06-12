<template>
  <div class="space-x-2 flex items-center">
    <default-input v-model="title" placeholder="Поиск по названию" @enter="findMe" />
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
import { atributStore } from '@/stores/data/atribut'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const store = atributStore()

const title = ref('')
const route = useRoute()

const findMe = async () => {
  await store.getAtributes({
    attributeCategory: route.params.id,
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