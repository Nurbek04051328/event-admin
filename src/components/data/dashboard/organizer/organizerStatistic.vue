<template>
  <div class="grid grid-cols-3 gap-4 mb-2 xm:grid-cols-2">
    <!-- <pre>{{org.statistic}}</pre> -->
    <div
      v-for="(stat, statIdx) in stats"
      :key="stat.name"
      :class="[
        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
        'border-t border-white/5 '
      ]"
      class=' bg-white/100 rounded-[26px] shadow-sm px-4 py-2'
    >
      <p class="text-[13px] font-medium leading-6 text-gray-600 xm:text-[12px]">{{ stat.name }}</p>
      <p class="flex items-baseline gap-x-2 md-max:mt-0">
        <span class="text-4xl font-semibold tracking-tight  xm:text-[18px]">{{ stat.value }}</span>
        <span v-if="stat.unit" class="text-sm text-gray-600  xm:text-[18px]">{{ stat.unit }}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['org', 'allEvents'])
import { computed } from 'vue'


const stats = computed(() => {
  const profits = props.org?.statistic?.expenses ?? 0;
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
  let allExpencesSum =
    props.org.statistic?.expense || 0
  allExpencesSum =
    profits > 1000000
      ? (profits / 1000000).toFixed(2) + ' млн. сум'
      : profits > 1000
        ? (profits / 1000).toFixed(2) + ' тысяч. сум'
        : profits + ' сум'

  return [
    { name: 'Кол. мероприятия', value: props.allEvents?.count },
    { name: 'Отказанные билеты', value: props.org?.statistic?.deniedTickets },
    { 
      name: 'Затраты', 
      value: allExpencesSum.split(' ').at(0) || 0,
      unit: allExpencesSum.split(' ').at(1)
    },
    {
      name: 'Проданные билеты',
      value: allTickerPurchasesCount.split(' ').at(0) || 0,
      unit: allTickerPurchasesCount.split(' ').at(1)
    },
    {
      name: 'Прибыль',
      value: allPurchasesSum.split(' ')?.at(0) || 0,
      unit: allPurchasesSum.split(' ')?.at(1)
    },
    { name: 'Успешность', value: `${props.org?.statistic?.success?.toFixed(1) || 0} %` ||  0  }
  ]
})
</script>
<style lang=""></style>
