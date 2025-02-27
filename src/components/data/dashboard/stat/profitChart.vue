<template>
  <div class="p-[16px]  rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по продажам</h3>
    <apexchart height="300" width="100%" type="bar"  :options="options" :series="series"></apexchart>
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
        id: 'vuechart-profit',
        type: 'bar',
        height: 300,
        // stacked: true,
      },
      // dataLabels: {
      //   formatter: (val) => {
      //     return val
      //   }
      // },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          borderRadiusApplication: 'end'
        }
      },
      xaxis: {
        categories: stat.value?.income?.map((v, k) => k + 1) || []
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
  const series = ref([])

  const getData = async () => {
    const { data } = await store.profitStatistic()
    stat.value = { ...data }
    let days = data?.income?.map((v, k) => k + 1) || []
    options.value.xaxis = {
      categories: [...days]
    }
    series.value.push({
      name: 'Поступление',
      group: 'profit',
      data: stat.value?.income || []
    })
  }

  onMounted(() => {
    getData()
  })
</script>
