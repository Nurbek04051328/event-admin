<template>
  <div class="p-[16px]  rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по билетам</h3>
    <apexchart height="300" width="100%" type="area" :options="options" :series="series"></apexchart>
  </div>
</template>
<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { statisticStore } from '@/stores/data/statistic'
  const store = statisticStore()

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
        id: 'vuechart-tickets',
        type: 'area',
        height: 400,
      },
      xaxis: {
        categories: stat.value.denied?.map((v, k) => k + 1)
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    }
  })
  const series = ref([])

  const getData = async () => {
    const { data } = await store.ticketStatistic()
    console.log(data)
    stat.value = { ...data }
    let days = data?.denied?.map((v, k) => k + 1)
    options.value.xaxis = {
      categories: [...days]
    }
    series.value.push({
      name: 'Отказано',
      data: stat.value.denied || []
    })
    series.value.push({
      name: 'В процессе',
      data: stat.value.pending || []
    })
    series.value.push({
      name: 'Куплено',
      data: stat.value.purchase || []
    })
    series.value.push({
      name: 'Использовано',
      data: stat.value.used || []
    })
  }

  onMounted(() => {
    getData()
  })
</script>
