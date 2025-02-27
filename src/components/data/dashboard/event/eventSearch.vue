<template>
  <div class="space-x-2 flex items-center">
    <default-input v-model="search.title" placeholder="Поиск по имени, email" />
    <button class="edit-btn w-auto px-3" @click="clear">
      <XMarkIcon class="size-5" />
    </button>
    <button class="success-btn w-auto px-3" @click="findMe">
      <MagnifyingGlassIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { workerStore } from '@/stores/data/workers'
import { ref } from 'vue'
// import { useRouter } from 'vue-router's
const store = workerStore()

const search = ref({})
// const router = useRouter()

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