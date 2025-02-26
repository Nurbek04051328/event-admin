<template>
  <div class="grid grid-cols-2 gap-3 md-max:grid-cols-2 md-max:p-2">
    <div
      v-for="(stat, statIdx) in stats"
      :key="stat.name"
      :class="[
        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
        'border-t border-white/5 '
      ]"
      class=' bg-white/100 rounded-[26px] shadow-sm px-4 py-2'
    >
      <p class="text-[13px] font-medium leading-6 text-gray-600">{{ stat.name }}</p>
      <p class="flex items-baseline gap-x-2">
        <span class="text-3xl font-semibold tracking-tight">{{ stat.value || 0 }} </span>
        <span v-if="stat.unit" class="text-sm text-gray-600">{{ stat.unit }}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['org'])
import { computed } from 'vue'
const stats = computed(() => {

  return [
    { name: 'Кол. проданных билетов', value: props.org?.bougth || 0,  unit: "шт" },
    {
      name: 'Отказанные билеты',
      value: props.org?.denied || 0,
      unit: "шт"
    },
    {
      name: 'Ожиданные билеты',
      value: props.org?.pending || 0,
      unit: "шт"
    },
    { name: 'Исползованные билеты', value: props.org?.used || 0, unit: "шт" }
  ]
})
</script>
<style lang=""></style>