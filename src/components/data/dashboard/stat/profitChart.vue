<template>
  <div class="p-4 bg-white rounded-2xl shadow-sm w-full">
    <h3 class="text-[18px] font-bold text-[#483D5B] mb-4">Статистика по продажам</h3>
    <div class="flex items-end space-x-1 h-[300px] border-t border-l border-gray-200 relative">
      <div
        v-for="(value, index) in normalizedData"
        :key="index"
        class="flex-1 flex flex-col items-center"
      >
        <div
          class="w-full bg-[#892EEB] transition-all"
          :style="{ height: `${value}px` }"
        ></div>
        <span class="text-xs text-gray-500 mt-1">{{ index + 1 }}</span>
      </div>

      <!-- Y-axis numbers (simplified) -->
      <div class="absolute left-[-40px] top-0 h-full flex flex-col justify-between">
        <span v-for="n in 5" :key="n" class="text-xs text-gray-400">
          {{ Math.round(maxValue - (maxValue / 5) * (n - 1)).toLocaleString() }} сум
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profitChart: {
    type: Array,
    required: true
  }
})

const maxValue = computed(() => Math.max(...props.profitChart, 1))
const chartHeight = 250 // px

const normalizedData = computed(() =>
  props.profitChart.map(value =>
    Math.round((value / maxValue.value) * chartHeight)
  )
)
</script>



<!-- <template>
  <div>{{ props.profitChart }}</div>
  <div ref="targetProfitRef">
    <div v-if="isIntersecting && series.length" class="p-[16px]  rounded-[26px] shadow-sm bg-white">
      <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по продажам</h3>
      <apexchart height="300" width="100%" type="bar"  :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>
<script setup>

  import { computed, onMounted, ref } from 'vue'
  // import { statisticStore } from '@/stores/data/statistic'
  // const store = statisticStore()
  import { useInView } from '@/utils/useInView'
  const targetProfitRef  = ref(null)
  const { isIntersecting } = useInView(targetProfitRef)

  const props = defineProps(['profitChart'])

  const stat = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 39, 10, 40, 39, 80, 40]
      }
    ]
  })

  const options = computed(() => {
    return {
      chart: {
        id: `vuechart-profitChart-${Math.random().toString(36).substring(2, 8)}`,
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          borderRadiusApplication: 'end'
        }
      },
      xaxis: {
        categories: props.profitChart?.map((v, k) => k + 1) || []
      },
      yaxis: {
        labels: {
          formatter: (val) => {
            return `${val.toLocaleString()} сум`
          }
        }
      },
      colors: ['#892EEB'],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    }
  })

  const series = computed(() => [
    {
      name: 'Поступление',
      group: 'profit',
      data: props.profitChart || []
    },
  ])

</script> -->
