<template>
  <div class="pb-3 px-4 pt-3">
    <div class="flex items-center justify-between">
      <div class="min-w-0 gap-3 flex items-center">
        {{ backLink }}
        <button v-if="backLink" @click="router.push({ name: backLink })">
          <ChevronLeftIcon
            class="w-[30px] h-[30px] rounded-full bg-[#F5F0FF] flex justify-center items-center hover:bg-[#9E55EC] hover:text-white"
          />
        </button>
        <button v-if="route?.meta?.back" @click="router.back()">
          <ChevronLeftIcon
            class="w-[30px] h-[30px] rounded-full bg-[#F5F0FF] flex justify-center items-center hover:bg-[#9E55EC] hover:text-white"
          />
        </button>
        <!-- <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
              <router-link :to="crumb.path">{{ crumb.title }}</router-link>
            </li>
          </ol>
        </nav> -->
        <div class="flex items-center relative mr-8">
          <h2
            class="leading-7 text-[#645A77] md:text-[20px]"
            :class="
              route?.meta?.group == 'setting' ? 'text-[16px] font-medium' :
              route?.meta?.group == 'middle' ? 'text-[18px] font-medium' :
              'text-[22px] font-bold'
            "
          >
            {{ title || route.meta?.title || '' }}
          </h2>
          <!-- <router-link
            :class="[
              'group flex gap-x-3 rounded-2xl px-[16px] py-[14px] text-lg leading-6 font-medium',
              item.name == route.name || item.name == route.meta?.active
                ? 'bg-[#9E55EC] text-white'
                : 'text-[#483D5B] hover:text-[#483D5B] hover:bg-[#F3EBFC]'
              
            ]"
          >
            <component :is="item?.meta.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
            {{ $t('menu.' + item.name) }}
          </router-link> -->
          <div class="absolute right-[-25px] top-[-7px] bg-[#E9E7ED] px-2 rounded-2xl text-[12px]">
            {{ count }}
          </div>
        </div>
        <button
          v-if="route.meta?.toggle"
          @click="openModal"
          type="button"
          class="bg-[#E9DCFF] text-[#360B64] hover:bg-[#9E55EC] hover:text-white p-1 rounded-lg"
        >
          <PlusIcon class="size-5 text-white-400 md:size-3" />
        </button>
        <button
          v-if="route.meta?.linkName"
          @click="$router.push({ name: route.meta?.linkName })"
          type="button"
          class="bg-[#E9DCFF] text-[#360B64] hover:bg-[#9E55EC] hover:text-white p-1 rounded-lg"
        >
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
  addLink: String,
  addLinkTitle: String,
  toggle: Boolean,
  backLink: String,
  downloadLink: String,
  category: {
    title: String,
    link: String
  }
})

import { PlusIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useFullStore } from '@/stores/usefull/modal'
const store = useFullStore()
// import { useBreadcrumbStore } from '@/stores/data/breadcrump';
// import { computed } from 'vue';
// const breadcrumbStore = useBreadcrumbStore();
// const breadcrumbs = computed(() => breadcrumbStore.breadcrumbs);

const openModal = () => {
  store.setToggle(true)
}
</script>
<style lang="scss" scoped>
header {
  height: 62px;
}
</style>
