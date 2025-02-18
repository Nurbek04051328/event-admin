<template>
  <div class="px-[25px] py-[18px] rounded-[26px] shadow-sm bg-white">
    <div
      @click="$router.push({ name: 'activationkeys'})"
      class="text-[#483D5B] font-bold text-[20px] relative cursor-pointer"
    >
      Активационные ключи
    </div>
    <div class="flex justify-between">
      <div class="text-[#817295] text-[18px] mt-[10px] w-[55%]">
        <div class="flex items-center gap-4">
          <div class="w-[47px] h-[47px] bg-[#F3EBFC] rounded-full flex justify-center items-center">
            <component  :is="KeyIcon" class="size-7 text-[#892EEB]" aria-hidden="true" />
          </div>
          <div class="text-[#483D5B] text-[24px] font-bold">
            {{ count?.count || 0 }}
            <div class="text-[#817295] text-[13px] font-medium">Общее количество</div>
          </div>
        </div>
        <div class="relative mt-[15px] ml-[30px] py-2 border-b-[1px] border-[#F2F0F5]  flex items-center justify-between">
          <span class="absolute left-[-25px] bg-[#892EEB] w-3 h-3 rounded-full"></span> 
          Активированные 
          <div class="text-[#483D5B] text-[20px] font-bold">{{ count?.activated }}</div>
        </div>
        
        <div class="relative ml-[30px] pb-[40px] py-2 flex items-center justify-between">
          <span class="absolute left-[-25px] bg-[#CCBEF4] w-3 h-3 rounded-full"></span> 
          Не активированные
          <div class="text-[#483D5B] text-[20px] font-bold">{{ count?.notActivated }}</div>
        </div>
      </div>
      <div>
        <apexchart width="200" type="pie" :options="options" :series="series"></apexchart>
      </div>
    </div>
    
  </div>
  
</template>
<script setup>
import { computed, watchEffect , defineProps } from 'vue'
  const props = defineProps(['count'])
  // Icon import
  import { KeyIcon } from '@heroicons/vue/24/outline'
  import ApexCharts from "apexcharts";

  const series = computed(() => [
    props?.count?.activated || 0,
    props?.count?.notActivated || 0,
  ]);

  const options = computed(() => ({
    chart: {
      // id: 'vuechart-keys',
      type: 'pie',
      height: 300,
    },
    labels: ['Активированные', 'Не активированные'],
    legend: {
      show: false
    },
    colors: ['#892EEB', '#CCBEF4',],
    dataLabels: {
      enabled: true
    }
  }))

  watchEffect(() => {
    if (series.value.every((val) => val !== undefined)) {
      ApexCharts.exec('vuechart-keys', 'updateSeries', series.value);
    }
  });

</script>

