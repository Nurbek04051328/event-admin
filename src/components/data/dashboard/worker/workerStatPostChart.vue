<template>
  <div class=" text-sm flex flex-col overflow-hidden">
    <h3 class="text-[16px] font-bold leading-6 text-[#483D5B] w-full mb-4">Статистика по постам</h3>
    <apexchart height="250" width="100%"  :options="options" :series="series"></apexchart>
  </div>
  
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref('')
// const stat= ref([])

import { workerStore } from '@/stores/data/workers'

const store = workerStore()



const options = computed(() => {
  return {
    
    chart: {
      id: 'vuechart-employee-news',
      type: 'area',
      toolbar: {
        show: window.innerWidth > 768, // faqat desktopda ko‘rsatadi
      },
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
    colors: ['#05CD99', '#FFCE20', '#FF5558'],
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
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
const series = ref([])



const getWorkerNewsStat = async () => {
  if (!id.value) return false
  const { data } = await store.getWorkerPostStat({
    _id: id.value
  })
  console.log("resNews", data);
  // const res1 = await store.getWorkerPostStat({
  //   _id: id.value
  // })
  // console.log("resPost", res.data);
  
  series.value = [
    {
      name: 'Активный',
      data: [...data?.activeStats]
    },
    {
      name: 'На расмотрение',
      data: [...data?.pendingStats]
    },
    {
      name: 'Удалено',
      data: [...data?.deniedStats]
    }
  ]
}

onMounted(() => {
  id.value = route.params.id
  getWorkerNewsStat()
})
</script>
<style lang=""></style>