<template>
  <div class="p-[16px]  rounded-[26px] shadow-sm bg-white">
    <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">Статистика по (Пополнение/Вывод)</h3>
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
      id: 'vuechart-deposit',
      type: 'area',
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
    colors: ['#892EEB', '#FF5558',],
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  }
})
const series = ref([])

const getData = async () => {
  const { data } = await store.allDeposit()
  console.log("datajon",data)
  // stat.value = [ ...data ]

  // let days = data?.map((v, k) => k + 1) || []
  // options.value.xaxis = {
  //   categories: [...days]
  // }

  series.value = [
    {
      name: 'Пополнение',
      data: [...data?.deposit]
    }, {
      name: 'Вывод',
      data: [...data?.withdrawal]
    }
  ]

}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>