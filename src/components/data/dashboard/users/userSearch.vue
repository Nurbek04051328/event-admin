<template>
  <div class="space-x-2 flex items-center">
    <div class="w-[300px]">
      <default-input v-model="search.search" placeholder="Поиск по имени, email" />
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
</template>
<script setup>
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'

import { userStatus } from '@/helpers/vars'

const search = defineModel()

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
  }
  emit('searching')
}
</script>
<style lang=""></style>
