<template>
  <div class="px-[25px] py-[18px] rounded-[13px] shadow-sm bg-white space-y-4">
    <div  class="flex justify-between items-center">
      <div class="text-[#817295] text-[18px] w-full space-y-2">
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
            v-for="(item, index) of list"
            :key="index"
            :to="{ name, query: { status: item.status } }"
            class="py-2 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <div :class="['w-3 h-3 rounded-full', `${item.bg}`]"></div>
              <div>{{ item.title }}</div>
            </div>
            <div class="text-[#483D5B] text-[20px] font-bold">{{ item.value }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps(['count', 'title', 'name'])
// Icon import
import { UserGroupIcon } from '@heroicons/vue/24/outline'



const list = computed(() => [
  {
    class: '#16a34a',
    bg: 'bg-green-600',
    title: 'Активированные',
    value: props.count?.activated || 0,
    status: 'active'
  },
  {
    class: '#6b7280',
    bg: 'bg-gray-500',
    title: 'Не активированные',
    value: props.count?.notActivated || 0,
    status: 'not active'
  },
  {
    class: '#f59e0b',
    bg: 'bg-amber-500',
    title: 'Ограниченные',
    value: props.count?.limited || 0,
    status: 'limited'
  },
  {
    class: '#dc2626',
    bg: 'bg-red-600',
    title: 'Удаленные',
    value: props.count?.deleted || 0,
    status: 'deleted'
  }
])


</script>
