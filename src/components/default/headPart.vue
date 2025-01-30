<template>
  <div class="border-b border-gray-200 pb-3 px-4  pt-3">
    <div class="flex items-center justify-between">
      <div class="min-w-0 gap-3 flex items-center">
        <button v-if="backLink" @click="router.push({ name: backLink })">
          <ArrowLongLeftIcon class="size-5 mr-2" />
        </button>
        <button v-if="route?.meta?.back" @click="router.back()">
          <ArrowLongLeftIcon class="size-5 mr-2" />
        </button>
        <div class="flex items-center relative mr-8">
          <h2
            class="text-[22px] font-bold leading-7 text-gray-700 xm-max:text-[15px]"
          >
            {{ title || route.meta?.title || '' }}
          </h2>
          <div class="absolute right-[-28px] top-[-5px] bg-[#E9E7ED] px-2 rounded-2xl text-[12px]">
            {{ count }}
          </div>
        </div>
        <button v-if="route?.meta?.toggle" @click="openModal" type="button" class="bg-[#E9DCFF] text-[#360B64] hover:bg-[#9E55EC] hover:text-white p-1 rounded-lg">
          <PlusIcon class="size-5 text-white-400" />
        </button>
        <button v-if="route?.meta?.linkName" @click="$router.push({ name: 'workerAdd' })" type="button" class="bg-[#E9DCFF] text-[#360B64] hover:bg-[#9E55EC] hover:text-white p-1 rounded-lg">
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
  count: Number,
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
