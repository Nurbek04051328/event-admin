<template>
  <div class="px-[25px] py-[18px] rounded-[26px] shadow-sm bg-white">
    <div
      @click="$router.push({ name: 'organizers'})"
      class="text-[#483D5B] font-bold text-[20px] relative cursor-pointer"
    >
      Организаторы
      <!-- <span class="absolute bg-[#FAF4FE] py-[2px] px-[15px] rounded-2xl text-[15px] text-[#B6A3D0] top-[-10px]">{{ count?.organizerSuccess + count?.organizerPending + count?.organizerDenied || 0 }}</span> -->
    </div>
    <!-- <pre>{{ count }}</pre> -->
    <div class="flex justify-between">
      <div class="text-[#817295] text-[18px] mt-[10px] w-[50%]">
        <div class="flex items-center gap-4">
          <div class="w-[47px] h-[47px] bg-[#F3EBFC] rounded-full flex justify-center items-center">
            <component  :is="UsersIcon" class="size-7 text-[#892EEB]" aria-hidden="true" />
          </div>
          <div class="text-[#483D5B] text-[24px] font-bold">
            {{ count?.organizerSuccess + count?.organizerPending + count?.organizerDenied || 0 }}
            <div class="text-[#817295] text-[13px] font-medium">Общее количество</div>
          </div>
        </div>
        <div class="relative text-[18px] ml-[30px] border-b-[1px] py-2 border-[#F2F0F5] flex items-center justify-between">
          <span class="absolute left-[-25px]  bg-[#05CD99] w-3 h-3 rounded-full"></span> 
          Успешно проверено 
          <div class="text-[#483D5B] text-[20px] font-bold">{{ count?.organizerSuccess }}</div>
        </div>
        <div class="relative text-[18px] ml-[30px] border-b-[1px] py-2 border-[#F2F0F5] flex items-center justify-between">
          <span class="absolute left-[-25px] bg-[#9E55EC] w-3 h-3 rounded-full"></span> 
          В ожидании 
          <div class="text-[#483D5B] text-[20px] font-bold">{{ count?.organizerPending }}</div>
        </div>
        <div class="relative text-[18px] ml-[30px] py-2 flex items-center justify-between">
          <span class="absolute left-[-25px] bg-[#FF5558] w-3 h-3 rounded-full"></span> 
          Не одобрено 
          <div class="text-[#483D5B] text-[20px] font-bold">{{ count?.organizerDenied }}</div>
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
  import { UsersIcon } from '@heroicons/vue/24/outline'
  import ApexCharts from "apexcharts";
// import VueApexCharts from "vue3-apexcharts";
  const props = defineProps(['count'])

  const series = computed(() => [
    props?.count?.organizerSuccess || 0,
    props?.count?.organizerPending || 0,
    props?.count?.organizerDenied || 0,
]);

  const options = computed(() => ({
    chart: {
      id: 'vuechart-organizers',
      type: 'pie',
      height: 300,
    },
    labels: ['Успешно проверено', 'В ожидании', 'Проверку не прошли'],
    legend: {
      show: false
    },
    // plotOptions: {
    //   pie: {
    //     donut: {
    //       size: '65%',
    //       labels: {
    //         show: true,
    //         total: {
    //           show: true,
    //           fontSize: '14px',
    //           label: 'Общ. кол-во',
    //           fontWeight: 500,
    //           color: '#A4A4A4',
    //         }
    //       }
    //     }
    //   }
    // },
    colors: ['#05CD99', '#9E55EC',  '#FF5558'],
    dataLabels: {
      enabled: true
    }
    // dataLabels: {
    //   enabled: false,
    //   formatter: (val) => `${Math.round(val)}`
    // }
  }))



  watchEffect(() => {
  if (series.value.every((val) => val !== undefined)) {
    ApexCharts.exec('vuechart-organizers', 'updateSeries', series.value);
  }
});
// Icon import
  // import { XMarkIcon, CheckIcon, ClockIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
</script>

