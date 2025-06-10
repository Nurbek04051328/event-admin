<template>
  <div v-if="series.length" class="p-[16px]  rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по организаторам</h3>
    <apexchart height="300" width="100%"  :options="options" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { statisticStore } from '@/stores/data/statistic'
import { computed, onMounted, ref } from 'vue'
const store = statisticStore()

const stat = ref([])

const options = computed(() => {
  return {
    
    chart: {
      id: `vuechart-organizer-${Math.random().toString(36).substring(2, 8)}`,
      type: 'bar',
      height: 300,
      // stacked: true,
    },
    xaxis: {
      categories: stat.value?.map((v, k) => k + 1) || []
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        borderRadiusApplication: 'end'
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
  const { data } = await store.userStatistic({role:'organizer'})
  stat.value = [ ...data ]

  series.value.push({
    name: 'Поступление',
    data: data    || []
  })
  

}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>