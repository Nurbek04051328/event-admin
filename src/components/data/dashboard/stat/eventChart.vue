<template>
  <div ref="targeEventRef">
    <div v-if="isIntersecting && series.length" class="p-[16px]  rounded-[26px] shadow-sm bg-white">
      <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по билетам</h3>
      <apexchart 
        :height="chartHeight" 
        width="100%" 
        type="area" 
        :options="options" 
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<script setup>
  import { computed, onMounted, ref } from 'vue'
  // import { statisticStore } from '@/stores/data/statistic'
  // const store = statisticStore()
  import { useInView } from '@/utils/useInView'
  const targeEventRef = ref(null)
  const { isIntersecting } = useInView(targeEventRef)
  const props = defineProps(['eventChart'])


  const chartHeight = computed(() => window.innerWidth < 640 ? 200 : 300)


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
        id: `vuechart-eventChart-${Math.random().toString(36).substring(2, 8)}`,
        type: 'area',
        height: chartHeight.value,
      },
      xaxis: {
        categories: props?.eventChart?.denied?.map((v, k) => k + 1)
      },
      colors: ['#9E55EC', '#FFCE20', '#05CD99', '#FF5558' ],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    }
  })
  
  
  const series = computed(() => [
    {
      name: 'Использовано',
    data: props.eventChart?.used || []
  },
  {
    name: 'В процессе',
    data: props.eventChart?.pending || []
  },
  {
    name: 'Куплено',
      data: props.eventChart?.purchase || []
  },
  {
    name: 'Отказано',
    data: props.eventChart?.denied || []
  }
])




// const series = ref([])

// const getData = async () => {
//   // const { data } = await store.ticketStatistic()
//   // console.log("data", data)
//   stat.value = { ...data }
//   let days = data?.denied?.map((v, k) => k + 1)
//   options.value.xaxis = {
//     categories: [...days]
//   }
//   series.value.push({
//     name: 'Использовано',
//     data: stat.value.used || []
//   })
//   series.value.push({
//     name: 'В процессе',
//     data: stat.value.pending || []
//   })
//   series.value.push({
//     name: 'Куплено',
//     data: stat.value.purchase || []
//   })
//   series.value.push({
//     name: 'Отказано',
//     data: stat.value.denied || []
//   })
// }
  // onMounted(() => {
    //   getData()
  // })
</script>
