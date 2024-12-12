<template>
  <div class="grid grid-cols-4  bg-gray-50 rounded-lg p-4 md-max:grid-cols-2 md-max:p-2">
    <div
      v-for="(stat, statIdx) in stats"
      :key="stat.name"
      :class="[
        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
        'border-t border-white/5 '
      ]"
    >
      <p class="text-sm font-medium leading-6 text-gray-600 md-max:text-[15px]">{{ stat.name }}</p>
      <p class="mt-2 flex items-baseline gap-x-2 md-max:mt-0">
        <span class="text-4xl font-semibold tracking-tight  md-max:text-[15px]">{{ stat.value }}</span>
        <span v-if="stat.unit" class="text-sm text-gray-600  md-max:text-[15px]">{{ stat.unit }}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['org', 'allEvents'])
import { computed } from 'vue'
const stats = computed(() => {
  let allTickerPurchasesCount =
    props.org.statistic?.purchaseTickets > 1000000
      ? (props.org.statistic?.purchaseTickets / 1000000).toFixed(2) + ' млн'
      : props.org.statistic?.purchaseTickets > 1000
        ? (props.org.statistic?.purchaseTickets / 1000).toFixed(2) + ' тысяч'
        : props.org.statistic?.purchaseTickets + ' шт'

  let allPurchasesSum =
    props.allEvents?.events?.reduce((a, b) => a + b.counts?.ticketPurchase * b.entryFree, 0) || 0
  allPurchasesSum =
    props.org.statistic?.profit > 1000000
      ? (props.org.statistic?.profit / 1000000).toFixed(0) + ' млн. сум'
      : props.org.statistic?.profit > 1000
        ? (props.org.statistic?.profit / 1000).toFixed(0) + ' тысяч. сум'
        : props.org.statistic?.profit + ' сум'

  return [
    { name: 'Кол. мероприятия', value: props.allEvents?.count },
    {
      name: 'Проданные билеты',
      value: allTickerPurchasesCount.split(' ').at(0),
      unit: allTickerPurchasesCount.split(' ').at(1)
    },
    {
      name: 'Прибыль',
      value: allPurchasesSum.split(' ')?.at(0),
      unit: allPurchasesSum.split(' ')?.at(1)
    },
    { name: 'Успешность', value: `${props.org.statistic?.success.toFixed(1)} %` }
  ]
})
</script>
<style lang=""></style>
