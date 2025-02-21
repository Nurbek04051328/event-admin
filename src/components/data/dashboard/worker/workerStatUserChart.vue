<template>
  <div class="mt-4">
    <h3 class="text-[16px] font-bold leading-6 text-[#483D5B] w-full mb-4">Статистика по организаторам</h3>
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
      id: 'vuechart-deposit',
      type: 'bar',
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    dataLabels: {
      enabled: false
    },
    // xaxis: {
    //   categories: stat.value?.map((v, k) => k + 1) || []
    // },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '80%',
        borderRadius: 3,
        borderRadiusApplication: 'end'
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
      horizontalAlign: 'left',
      borderRadius: 3,
    }
  }
})
const series = ref([])



const getWorkerUsersStat = async () => {
  if (!id.value) return false
  const { data } = await store.getWorkerUserStat({
    _id: id.value
  })
  series.value = [
    {
      name: 'Дал права организатор',
      data: [...data?.organizer]
    },
    {
      name: 'Отправил в проверку',
      data: [...data?.pending]
    },
    {
      name: 'Забрал права организатора',
      data: [...data?.revoke]
    }
  ]
}

onMounted(() => {
  id.value = route.params.id
  getWorkerUsersStat()
})
</script>
<style lang=""></style>