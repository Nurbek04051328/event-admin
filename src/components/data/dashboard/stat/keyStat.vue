<template>
  <h3 class="text-base font-semibold leading-6 text-gray-900 w-full">Активационные ключи</h3>
  <dd
    class="font-semibold mt-2 tracking-tight items-center h-[60%] text-white grid grid-cols-3 gap-4 md-max:justify-between xs-max:mt-4 xs-max:flex-col xs-max:w-full xs:grid-cols-1"
  >
    <blackStat
      title="Все"
      :icon="FolderIcon"
      :value="count?.activationKeys?.count"
      bg="bg-blue-950"
    />
    <blackStat
      title="Активировано"
      :icon="FolderPlusIcon"
      :value="count?.activationKeys?.activated"
      bg="bg-green-950"
    />
    <blackStat
      title="Не активировано"
      :icon="FolderMinusIcon"
      bg="bg-amber-800"
      :value="count?.activationKeys?.notActivated"
    />
  </dd>
</template>
<script setup>
defineProps(['count'])

import blackStat from './blackStat.vue'
import { FolderIcon, FolderPlusIcon, FolderMinusIcon } from '@heroicons/vue/24/outline'
</script>
<style lang=""></style>
