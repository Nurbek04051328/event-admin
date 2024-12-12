<template>
  <h3 class="text-base font-semibold leading-6 text-gray-900 w-full">Статистика по билетом</h3>
  <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
</template>
<script setup>
import { statisticStore } from '@/stores/data/statistic'
import { computed, onMounted, ref } from 'vue'
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
<style lang=""></style>
