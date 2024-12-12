<template>
  <h3 class="text-base font-semibold leading-6 text-gray-900 w-full">Организаторы</h3>
  <dd
    class="ont-semibold tracking-tight items-center h-[60%] text-white grid grid-cols-4 gap-4 md-max:justify-between xs-max:mt-4 mt-2 xs-max:flex-col xs-max:w-full lg:gap-2 xm-max:grid-cols-2"
  >
    <blackStat
      title="Все"
      :icon="UserGroupIcon"
      :value="
        count?.user?.organizerSuccess + count?.user?.organizerPending + count?.user?.organizerDenied
      "
      bg="bg-blue-950"
    />
    <blackStat
      title="Успешно проверено"
      bg="bg-green-950"
      :icon="CheckIcon"
      :value="count?.user?.organizerSuccess"
    />
    <blackStat
      title="В ожидании"
      bg="bg-amber-800"
      :icon="ClockIcon"
      :value="count?.user?.organizerPending"
    />
    <blackStat
      title="Проверку не прошли"
      :icon="XMarkIcon"
      :value="count?.user?.organizerDenied"
      bg="bg-red-950"
    />
  </dd>
</template>
<script setup>
defineProps(['count'])
import blackStat from './blackStat.vue'
import { UserGroupIcon } from '@heroicons/vue/20/solid'
import { XMarkIcon, CheckIcon, ClockIcon } from '@heroicons/vue/24/outline'
</script>
<style lang=""></style>
