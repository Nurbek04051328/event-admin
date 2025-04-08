<template>
  <div class="flex-1 overflow-auto pb-8 space-y-[30px]">
    <component :is="pages[main.page.sub - 1]" v-model="data" />
  </div>
  <div class="space-y-4">
    <div class="subtitle">
      {{ t('1.partner_title') }}
    </div>
    <div class="flex gap-4 pr-1 items-center">
      <div class="text break-words flex-1">
        {{ t('1.partner') }}
      </div>
      <defaultCheckbox v-model="data.partner" />
    </div>
  </div>
  <div class="pt-[26px] w-full">
    <button
      class="mt-4 btn w-full"
      @click="
        pages.filter((p) => p)?.length > main.page.sub ? main.setPage(0, 1) : main.setPage(1, 0)
      "
    >
      {{ step == 0 ? t('understand') : t('continue') }}
      <ChevronRightIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
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
import bookSetting from './final/bookSetting.vue'
import cancel from './final/cancel.vue'

const pages = computed(() => [
  Group,
  Calendar,
  data.value.group == 1 ? Ticket : data.value.group == 2 ? GroupSize : false,
  Price,
  data.value.free ? bookSetting : Total,
  data.value.free ? cancel : bookSetting,
  data.value.free ? null : cancel
])
</script>
<style lang=""></style>
