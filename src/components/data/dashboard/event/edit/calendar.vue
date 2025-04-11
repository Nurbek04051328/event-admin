<template>
  <div>
    <div class="font-semibold mb-[5px]">Дата мероприятия</div>
    <div class="flex gap-4">
      <div class="flex-1 space-y-4">
        <DatePicker v-model="data.eventDates" />

        <div class="space-y-2">
          <div class="font-semibold">{{ t('3.how_long') }}</div>

          <CustomSelect
            v-model="data.duration"
            :options="
              [...Array(32)].map((a, v) => {
                return {
                  _id: ((v + 1) / 2).toFixed(1),
                  title: `${((v + 1) / 2).toFixed(1)} ${t('hour')}`
                }
              })
            "
            option_title="title"
            name="hour"
            :placeholder="t('selectPlaceholder')"
          />
        </div>
      </div>
      <div class="flex-1">
        <SetDates v-model="data" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DatePicker from './final/datePicker.vue'
import SetDates from './final/setDates.vue'
import CustomSelect from './layout/customSelect.vue'
const { t } = useI18n()

const dates = ref([])

const data = defineModel()
</script>
