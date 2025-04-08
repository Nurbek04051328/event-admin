<template>
  <div class="px-[25px] py-[18px] rounded-[13px] shadow-sm bg-white space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-[#817295] text-[18px] w-[55%] space-y-2">
        <router-link
          :to="{ name }"
          class="block text-[#483D5B] font-bold text-[20px] relative cursor-pointer"
        >
          {{ title }}
        </router-link>
        <router-link :to="{ name }" class="flex items-center gap-4">
          <div class="w-[47px] h-[47px] bg-[#F3EBFC] rounded-full flex justify-center items-center">
            <component :is="UserGroupIcon" class="size-7 text-[#892EEB]" aria-hidden="true" />
          </div>
          <div class="text-[#483D5B] text-[24px] font-bold">
            {{ count?.count || 0 }}
          </div>
        </router-link>
        <div class="divide-y-[1px] text-base">
          <router-link
            v-for="item of list"
            :key="item.class"
            :to="{ name, query: { status: item.status } }"
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
      <apexchart width="200" type="pie" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>
<script setup>
import { computed, watchEffect, defineProps } from 'vue'
const props = defineProps(['count', 'title', 'name'])
// Icon import
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import ApexCharts from 'apexcharts'

// const series = computed(() => [props?.count?.activated || 0, props?.count?.notActivated || 0])
const series = computed(() => list.value.map((t) => t.value) || [])

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
  },
  {
    class: '#fbbf24',
    title: 'Ограниченные',
    value: props.count?.limited || 0,
    status: 'limited'
  },
  {
    class: '#FF5558',
    title: 'Удаленные',
    value: props.count?.deleted || 0,
    status: 'deleted'
  }
])

const options = computed(() => ({
  chart: {
    id: `${props.name}-vuechart-users`,
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
    ApexCharts.exec('vuechart-users', 'updateSeries', series.value)
  }
})
</script>
