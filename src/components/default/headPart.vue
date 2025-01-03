<template>
  <div class="border-b border-gray-200 pb-3 px-4 bg-white pt-3">
    <div class="flex items-center justify-between">
      <div class="min-w-0 gap-3 flex items-center">
        <button v-if="backLink" @click="router.push({ name: backLink })">
          <ArrowLongLeftIcon class="size-5 mr-2" />
        </button>
        <button v-if="route?.meta?.back" @click="router.back()">
          <ArrowLongLeftIcon class="size-5 mr-2" />
        </button>
        <h2
          class="text-1xl font-bold leading-7 text-gray-700 xm-max:text-[15px]"
        >
          {{ title || route.meta?.title || '' }}
        </h2>
        <button v-if="route?.meta?.toggle" @click="openModal" type="button" class="add-btn flex-none">
          <PlusIcon class="size-5 text-white-400" />
        </button>
        <button v-if="route?.meta?.linkName" @click="$router.push({ name: 'workerAdd' })" type="button" class="add-btn flex-none">
          <PlusIcon class="size-5 text-white-400" />
        </button>
      </div>
      <div class="flex">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  toggleTitle: String,
  addLink: String,
  addLinkTitle: String,
  toggle: Boolean,
  backLink: String,
  downloadLink: String,
  grayTitle: String
})

import { PlusIcon } from '@heroicons/vue/24/outline'
import { ArrowLongLeftIcon } from '@heroicons/vue/20/solid'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useFullStore } from '@/stores/usefull/modal'
const store = useFullStore()

const openModal = () => {
  store.setToggle(true)
}
</script>
<style lang="scss" scoped>
header {
  height: 62px;
}
</style>
