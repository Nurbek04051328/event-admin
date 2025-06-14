<template>
  <div class="grid grid-cols-4  bg-white/100 rounded-[26px] shadow-sm p-4 md-max:grid-cols-2 md-max:p-2 mb-2">
    <!-- <pre>{{ org.statistic }}</pre> -->
    <div
      v-for="(stat, statIdx) in stats"
      :key="stat.name"
      :class="[
        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
        'border-t border-white/5 '
      ]"
    >
      <p class="text-[13px] font-medium leading-6 text-gray-600 md-max:text-[15px]">{{ stat.name }}</p>
      <p class="mt-2 flex items-baseline gap-x-2 md-max:mt-0">
        <span class="text-[22px] font-semibold tracking-tight md-max:text-[15px]">{{ stat.value || 0 }} </span>
        <span v-if="stat.unit" class="text-sm text-gray-600 md-max:text-[15px]">{{ stat.unit }}</span>
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['org'])
import { computed } from 'vue'
const stats = computed(() => {
  const tickets = props.org?.statistic?.purchaseTickets ?? 0;
  const profits = props.org?.statistic?.profit ?? 0;
  let allTickerPurchasesCount =
  tickets > 1000000
      ? (tickets / 1000000).toFixed(2) + ' млн'
      : tickets > 1000
        ? (tickets / 1000).toFixed(2) + ' тысяч'
        : tickets + ' шт'

  let allPurchasesSum =
    props.org.organizerEvents?.reduce((a, b) => a + b.counts?.ticketPurchase * b.entryFree, 0) || 0
  allPurchasesSum =
  profits > 1000000
      ? (profits / 1000000).toFixed(2) + ' млн. сум'
      : profits > 1000
        ? (profits / 1000).toFixed(2) + ' тысяч. сум'
        : profits + ' сум'

  return [
    { name: 'Кол. мероприятия', value: props.org?.statistic?.eventCount },
    // { name: 'Генерированные', value: props.org?.statistic?.generatedTickets },
    {
      name: 'Купленные билеты',
      value: allTickerPurchasesCount.split(' ').at(0) || 0,
      unit: allTickerPurchasesCount.split(' ').at(1) || 0
    },
    {
      name: 'Расходь',
      value: allPurchasesSum.split(' ')?.at(0) || 0,
      unit: allPurchasesSum.split(' ')?.at(1) || 0
    },
    { name: 'Успешность', value: `${props.org.statistic?.success.toFixed(1) || 0} %` }
  ]
})
</script>
<style lang=""></style>