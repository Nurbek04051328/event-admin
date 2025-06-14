<template>
  <div v-show="series[0].data.length || series[1].data.length" class="p-[16px] rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">
      Статистика по (Покупка/Возврат)
    </h3>
    <apexchart height="300" width="100%" :options="options" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { statisticStore } from '@/stores/data/statistic'
import { computed, onMounted, ref } from 'vue'
const store = statisticStore()
// const { purchases } = storeToRefs(store)
const props = defineProps(['purchases'])


const options = computed(() => {
  return {
    chart: {
      id: `vuechart-purchase-${Math.random().toString(36).substring(2, 8)}`,
      type: 'area',
      height: 300
      // stacked: true,
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    colors: ['#05CD99', '#FFCE20'],
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  }
})


const series = computed(() => [
  {
      name: 'Покупка',
      data: props?.purchases?.purchase || []
    },
    {
      name: 'Возврат',
      data: props?.purchases?.refound || []
    }
])
</script>
<style lang=""></style>
