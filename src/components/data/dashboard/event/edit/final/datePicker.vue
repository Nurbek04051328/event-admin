<template>
  <div class="flex-1 mx-auto mt-2">
    <div class="flex justify-between items-center mb-1">
      <button @click="prevMonth" class="p-2 hover:bg-gray-100 rounded">
        <ArrowLeftIcon class="size-4" />
      </button>
      <h2 class="text-lg font-semibold">{{ currentMonth }} {{ currentYear }}</h2>
      <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded">
        <ArrowRightIcon class="size-4" />
      </button>
    </div>
    <div class="border-[1px] border-gray-200 p-2 rounded-2xl">
      <div class="grid grid-cols-7 gap-2 px-1 py-2 text-center text-sm text-gray-500">
        <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      </div>

      <!-- Сетка дней -->
      <div class="grid grid-cols-7 gap-2 text-center">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          @click="toggleDay(day)"
          :class="[
            'p-2 rounded cursor-pointer',
            isSelected(day) ? 'bg-main text-white' : 'hover:bg-gray-100 text-black'
          ]"
        >
          {{ day.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
// Реактивные данные
const currentDate = ref(new Date())
const data = defineModel() // Массив для хранения нескольких выбранных дат

// Дни недели
const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

// Вычисляемые свойства
const currentMonth = computed(() => currentDate.value.toLocaleString('en', { month: 'long' }))
const currentYear = computed(() => currentDate.value.getFullYear())

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startDay = firstDayOfMonth.getDay() || 7 // Понедельник - первый день

  const days = []
  // Заполняем пустые ячейки до начала месяца
  for (let i = 1; i < startDay; i++) {
    days.push({ day: '', isCurrentMonth: false, date: null })
  }
  // Заполняем дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i, 10)
    })
  }
  return days
})

// Методы
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const toggleDay = (day) => {
  if (!day.isCurrentMonth || !day.date) return

  const index = data.value.findIndex(
    (d) => moment(d.date).format('DD/MM/YYYY') === moment(day.date).format('DD/MM/YYYY')
  )

  if (index === -1) {
    // Если дата не выбрана, добавляем её
    data.value.push({
      date: day.date,
      status: 'open',
      time: `${new Date(day.date).getHours().toString().padStart(2, '0')}:${new Date(day.date).getMinutes().toString().padStart(2, '0')}`
    })
  } else {
    // Если дата уже выбрана, удаляем её
    data.value.splice(index, 1)
  }
}

const isSelected = (day) =>
  day.date &&
  data?.value?.some(
    (d) => moment(d.date).format('DD/MM/YYYY') === moment(day.date).format('DD/MM/YYYY')
  )

onMounted(() => {
  console.log(data.value)
})
</script>
