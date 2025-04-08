<template>
  <div>
    <div class="title mb-[5px]">{{ t('11.event_title') }}</div>
    <div class="text">{{ t('11.event_text') }}</div>
  </div>
  <DatePicker v-model="data.eventDates" />
  <SetDates v-model="data" />
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DatePicker from './datePicker.vue'
import SetDates from './setDates.vue'
const { t } = useI18n()

const dates = ref([])

const data = defineModel()
</script>
