<template>
  <div class="p-[16px] rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">
      Статистика по (Покупка/Возврат)
    </h3>
    <apexchart height="300" width="100%" :options="options" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { statisticStore } from '@/stores/data/statistic'
import { computed, onMounted, ref } from 'vue'
const store = statisticStore()


const options = computed(() => {
  return {
    chart: {
      id: 'vuechart-deposit',
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
const series = ref([])

const getData = async () => {
  const { data } = await store.allDeposit()
  series.value = [
    {
      name: 'Покупка',
      data: data?.purchase || []
    },
    {
      name: 'Возврат',
      data: data?.refound || []
    }
  ]
}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
