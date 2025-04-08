<template>
  <div>
    <div class="title mb-[5px]">{{ t('11.book_settings') }}</div>
    <div class="text">{{ t('11.book_settings_text') }}</div>
  </div>
  <div>
    <div class="subtitle">{{ t('11.deadline_title') }}</div>
    <div class="text">{{ t('11.deadline_text') }}</div>
    <customSelect
      :options="addGuests"
      option_title="title"
      name="deadline_add"
      v-model="data.booking.addingGuests"
    />
  </div>
  <div>
    <div class="subtitle">{{ t('11.deadline_first_title') }}</div>
    <div class="text">{{ t('11.deadline_first_text') }}</div>
    <customSelect
      :options="addGuests"
      option_title="title"
      name="deadline_add"
      v-model="data.booking.firstGuest"
    />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import customSelect from '../layout/customSelect.vue'
const { t } = useI18n()

const addGuests = computed(() => {
  let hours = [...Array(6)].map((a, v) => {
    return {
      _id: (v + 1) * 3,
      title: t('11.deadline_hours_select', { hour: (v + 1) * 3 }),
    }
  })
  let days = [...Array(4)].map((a, v) => {
    return {
      _id: v + 25,
      title: t('11.deadline_days_select', { day: v + 2 }),
    }
  })
  console.log(hours)
  return [
    {
      _id: 1,
      title: t('11.deadline_hour_select'),
    },
    ...hours,
    {
      _id: 24,
      title: t('11.deadline_day_select'),
    },
    ...days,
  ]
})

const data = defineModel()
</script>
