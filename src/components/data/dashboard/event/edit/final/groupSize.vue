<template>
  <div>
    <div class="title mb-[5px]">{{ t('11.group_title') }}</div>
    <div class="text">{{ t('11.group_text') }}</div>
  </div>
  <div>
    <div class="subtitle mb-[18px]">{{ t('11.group_max') }}</div>
    <div class="text-event-700 mb-2">{{ t('11.group_title') }}</div>
    <customSelect
      v-model="data.size.open"
      :options="
        [...Array(30)].map((a, v) => {
          return {
            _id: v + 1,
            title: v + 1,
          }
        })
      "
      :updown="true"
      option_title="title"
      :default="5"
      name="opengroup"
      :placeholder="t('selectPlaceholder')"
    />

    <div class="text mt-[10px]">{{ t('11.group_max_text') }}</div>
  </div>
  <div>
    <div class="subtitle mb-[18px]">{{ t('11.group_close_title') }}</div>
    <div class="text-event-700 mb-2">{{ t('11.group_title') }}</div>
    <customSelect
      v-model="data.size.closed"
      :options="
        [...Array(30)].map((a, v) => {
          return {
            _id: v + 1,
            title: v + 1,
          }
        })
      "
      :updown="true"
      option_title="title"
      name="closedgroup"
      :default="20"
      :placeholder="t('selectPlaceholder')"
    />

    <div class="text mt-[10px]">{{ t('11.group_close_text') }}</div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import customSelect from '../layout/customSelect.vue'
const data = defineModel()
</script>
<style lang=""></style>
