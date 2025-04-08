<template>
  <div class="title mb-[5px]">{{ t('11.ticket_title') }}</div>
  <div class="text">{{ t('11.ticket_text') }}</div>
  <div class="input-box pr-[26px] mt-4">
    <input type="number" v-model="data.quantity" class="input-inbox flex-1" />
    <TicketIcon class="size-6" />
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { TicketIcon } from '@heroicons/vue/24/outline'

const data = defineModel()
</script>
<style lang=""></style>
