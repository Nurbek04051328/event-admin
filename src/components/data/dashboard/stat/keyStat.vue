<template>
  <div class="px-[25px] py-[18px] rounded-[13px] shadow-sm bg-white h-full">
    <div class="flex justify-between h-full">
      <div class="text-[#817295] text-[18px] mt-[10px] w-[55%] space-y-2">
        <router-link
          :to="{ name: 'activationkeys' }"
          class="text-[#483D5B] font-bold text-[20px] relative cursor-pointer"
        >
          Активационные ключи
        </router-link>
        <div class="flex items-center gap-4">
          <div class="w-[47px] h-[47px] bg-[#F3EBFC] rounded-full flex justify-center items-center">
            <component :is="KeyIcon" class="size-7 text-[#892EEB]" aria-hidden="true" />
          </div>
          <div class="text-[#483D5B] text-[24px] font-bold">
            {{ count?.count || 0 }}
          </div>
        </div>
        <div class="divide-y-[1px] text-base">
          <router-link
            v-for="item of list"
            :key="item.class"
            :to="{ name: 'activationkeys', query: { status: item.status } }"
            class="py-2 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <div :class="['w-3 h-3 rounded-full', `bg-[${item.class}]`]"></div>
              <div>{{ item.title }}</div>
            </div>
            <div class="text-[#483D5B] text-[20px] font-bold">{{ item.value }}</div>
          </router-link>
        </div>
      </div>
      <div class="flex items-center">
        <apexchart width="200" type="pie" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, watchEffect, defineProps } from 'vue'
const props = defineProps(['count'])
// Icon import
import { KeyIcon } from '@heroicons/vue/24/outline'
import ApexCharts from 'apexcharts'

const series = computed(() => [props?.count?.activated || 0, props?.count?.notActivated || 0])

const list = computed(() => [
  {
    class: '#05CD99',
    title: 'Активированные',
    value: props.count?.activated || 0,
    status: 'active'
  },
  {
    class: '#9ca3af',
    title: 'Не активированные',
    value: props.count?.notActivated || 0,
    status: 'not active'
  }
])

const options = computed(() => ({
  chart: {
    // id: 'vuechart-keys',
    type: 'pie',
    height: 300
  },
  labels: list.value.map((t) => t.title) || [],
  legend: {
    show: false
  },
  colors: list.value.map((t) => t.class) || [],
  dataLabels: {
    enabled: true
  }
}))

watchEffect(() => {
  if (series.value.every((val) => val !== undefined)) {
    ApexCharts.exec('vuechart-keys', 'updateSeries', series.value)
  }
})
</script>
