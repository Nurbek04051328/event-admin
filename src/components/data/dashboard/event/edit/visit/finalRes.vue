<template>
  <div class="flex-1 overflow-auto pb-4 space-y-[30px]">
    <component :is="pages[main.page.sub - 1]" v-model="data" />
  </div>

  <div class="pt-[26px] w-full">
    <button
      class="mt-4 btn w-full"
      @click="pages?.length > main.page.sub ? main.setPage(0, 1) : main.setPage(1, 0)"
    >
      {{ step == 0 ? t('understand') : t('continue') }}
      <ChevronRightIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const data = defineModel()

const step = ref(5)

import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

// const emits = defineEmits(['nextPage'])
// const nextPage = () => {
//   emits('nextPage')
// }

import Calendar from './final/calendar.vue'
import Group from './final/group.vue'
import Ticket from './final/ticket.vue'
import GroupSize from './final/groupSize.vue'
import Price from './final/price.vue'
import Total from './final/total.vue'

const pages = [Group, Calendar, Ticket, GroupSize, Price, Total]
</script>
<style lang=""></style>
