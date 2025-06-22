<template>
  <div class="px-[25px] py-[18px] rounded-[13px] shadow-sm bg-white h-full">
    <div class="flex justify-between h-full">
      <div class="text-[#817295] text-[18px] mt-[10px] w-full space-y-2">
        <router-link
          :to="{ name: 'activationkeys' }"
          class="text-[#483D5B] font-bold text-[20px] relative cursor-pointer lg:text-[16px]"
        >
          Активационные ключи
        </router-link>
        <div class="flex items-center gap-4">
          <div class="w-[47px] h-[47px] bg-[#F3EBFC] rounded-full flex justify-center items-center lg:h-[30px] lg:w-[30px]">
            <component :is="KeyIcon" class="size-7 text-[#892EEB] lg:size-5" aria-hidden="true" />
          </div>
          <div class="text-[#483D5B] text-[24px] font-bold lg:text-[16px]">
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
              <div :class="['w-3 h-3 rounded-full lg:w-2 lg:h-2', `${item.bg}`]"></div>
              <div>{{ item.title }}</div>
            </div>
            <div class="text-[#483D5B] text-[20px] font-bold lg:text-[16px]">{{ item.value }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps(['count'])
// Icon import
import { KeyIcon } from '@heroicons/vue/24/outline'


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
  }
])



</script>
