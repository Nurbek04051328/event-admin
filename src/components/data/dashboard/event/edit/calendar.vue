<template>
  <div>
    <div class="title mb-[5px]">Дата мероприятия</div>    
	<div class="flex">
		<DatePicker v-model="data.eventDates" />
		<SetDates v-model="data" />
		
	</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DatePicker from './final/datePicker.vue'
import SetDates from './final/setDates.vue'
const { t } = useI18n()

const dates = ref([])

const data = defineModel()
</script>
