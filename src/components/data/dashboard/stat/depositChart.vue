<template>
  <div ref="chartRef">
    <div v-if="isIntersecting && (series[0].data.length || series[1].data.length)" class="p-[16px] rounded-[26px] shadow-sm bg-white">
      <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">
        Статистика по (Пополнение/Вывод)
      </h3>
      <apexchart height="300" width="100%" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { statisticStore } from '@/stores/data/statistic'
import { computed, watch, onMounted, ref } from 'vue'
const store = statisticStore()
import { useInView } from '@/utils/useInView'
const chartRef = ref(null)
const { isIntersecting } = useInView(chartRef)

// const { deposits } = storeToRefs(store)

const props = defineProps(['deposits'])

const options = computed(() => {
  return {
    chart: {
      id: `vuechart-deposit-${Math.random().toString(36).substring(2, 8)}`,
      type: 'area'
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    // xaxis: {
    //   categories: stat.value?.map((v, k) => k + 1) || []
    // },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    colors: ['#892EEB', '#FF5558'],
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  }
})
const series = computed(() => [
  {
    name: 'Пополнение',
    data: props?.deposits?.deposit || []
  },
  {
    name: 'Вывод',
    data: props?.deposits?.withdrawal || []
  }
])


</script>
<style lang=""></style>



<!-- <template>
  <div v-show="series[0].data.length || series[1].data.length" class="p-[16px] rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">
      Статистика по (Пополнение/Вывод)
    </h3>
    <apexchart height="300" width="100%" :options="options" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { statisticStore } from '@/stores/data/statistic'
import { computed, watch, onMounted, ref } from 'vue'
const store = statisticStore()
// const { deposits } = storeToRefs(store)

const props = defineProps(['deposits'])

const options = computed(() => {
  return {
    chart: {
      id: `vuechart-deposit-${Math.random().toString(36).substring(2, 8)}`,
      type: 'area'
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    // xaxis: {
    //   categories: stat.value?.map((v, k) => k + 1) || []
    // },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    colors: ['#892EEB', '#FF5558'],
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  }
})
const series = computed(() => [
  {
    name: 'Пополнение',
    data: props?.deposits?.deposit || []
  },
  {
    name: 'Вывод',
    data: props?.deposits?.withdrawal || []
  }
])


</script>
<style lang=""></style> -->
