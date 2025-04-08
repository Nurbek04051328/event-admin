<template>
  <div class="flex-1 overflow-auto space-y-[30px] pb-8">
    <div>
      <div class="title mb-[5px]">{{ t('6.title') }}</div>
      <div class="text mb-[35px]">
        {{ t('6.text') }}
      </div>
    </div>
    <Additional v-model="data" />

    <div class="space-y-[30px]">
      <Food v-model="data" />
      <Drinks v-model="data" />
      <Ticket v-model="data" />
      <Transport v-model="data" />
      <Inventory v-model="data" />
    </div>
  </div>

  <div class="pt-[26px]">
    <button class="mt-auto btn w-full" @click="nextPage()">
      {{ t('continue') }}
      <ChevronRightIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import Additional from './provide/additional.vue'
import Food from './provide/food.vue'
import Drinks from './provide/drinks.vue'
import Ticket from './provide/ticket.vue'
import Transport from './provide/transport.vue'
import Inventory from './provide/inventory.vue'
import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

const data = defineModel()
</script>
<style lang=""></style>
