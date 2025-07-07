<template>
  <div ref="targetCommestionRef">
    <div v-if="isIntersecting && series.length" class="p-[16px]  rounded-[26px] shadow-sm bg-white">
      <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по комиссионным</h3>
      <apexchart height="300" width="100%" type="bar"  :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
// import { statisticStore } from '@/stores/data/statistic'
// const store = statisticStore()
  import { useInView } from '@/utils/useInView'
  const targetCommestionRef  = ref(null)
  const { isIntersecting } = useInView(targetCommestionRef)


const props = defineProps(['comissionChart'])

const stat = ref({
  denied: [],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#80c7fd',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
})

const options = computed(() => {
  return {
    colors: [ '#00E396'],
    chart: {
      id: `vuechart-comissionChart-${Math.random().toString(36).substring(2, 8)}`,
      type: 'bar',
      height: 300,
      // stacked: true,
    },
    dataLabels: {
      formatter: (val) => {
        return val
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        borderRadiusApplication: 'end'
      }
    },
    xaxis: {
      categories: props.comissionChart?.map((v, k) => k + 1) || []
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
    },
    dataLabels: {
      enabled: false, 
    },
    responsive: [
      {
        breakpoint: 1441,
        options: {
          chart: {
            height:230,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '8px',
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '8px',
              },
              formatter: (val) => {
                return `${val.toLocaleString()} сум`
              }
            }
          },
          legend: {
            fontSize: '10px'
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '6px',
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '8px',
              },
              formatter: (val) => {
                return `${val.toLocaleString()} сум`
              }
            }
          },
          legend: {
            fontSize: '10px'
          }
        }
      }
    ]
  }
})

const series = computed(() => [
  {
    name: 'Комиссия',
    group: 'profit',
    data: props.comissionChart || []
  },
])

</script>
<style lang=""></style>