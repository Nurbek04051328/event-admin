<template>
  <div class="space-y-4 flex-1">
    <div v-for="(date, index) of data?.eventDates" :key="index" class="flex items-center gap-2">
      <div
        class="ring-[1px] ring-gray-300 ring-inset rounded-md bg-white py-1.5 px-4 outline-1 -outline-offset-1 outline-gray-300 shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
      >
        {{ moment(date?.date).format('DD/MM/YYYY') }}
      </div>

      <input
        class="w-20 text-center focus:outline-none ring-[1px] ring-gray-300 ring-inset rounded-md bg-white p-2 py-1.5 outline-1 -outline-offset-1 outline-gray-300"
        v-model="date.time"
        v-maska="'##:##'"
        placeholder="HH:MM"
        @blur="validateTime(index)"
      />
      <DefaultSelect v-model="date.status" :options="dateStatus" option_title="title" />

      <button class="ml-auto size-6" @click="removeDate(index)">
        <XMarkIcon class="size-5" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'
import { ref } from 'vue'
import { vMaska } from 'maska/vue'
import DefaultSelect from '../layout/defaultSelect.vue'
import { dateStatus } from '@/helpers/vars'
const data = defineModel()

const handleChange = (index) => {}

const removeDate = (index) => {
  data.value.eventDates.splice(index, 1)
}

const validateTime = (index) => {
  console.log(data.value.eventDates[index])
  const [hours, minutes] = data.value.eventDates[index].time.split(':')
  const h = parseInt(hours || '0', 10)
  const m = parseInt(minutes || '0', 10)
  let res = ''
  if (data.value.eventDates[index].time?.length !== 5 || h > 23 || m > 59) {
    data.value.eventDates[index].time = '10:00'
  } else {
    // Дополняем нули, если нужно
    data.value.eventDates[index].time =
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }
  console.log(res)
}
</script>
<style lang=""></style>
