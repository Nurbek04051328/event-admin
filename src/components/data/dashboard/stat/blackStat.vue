<template>
  <div
    :class="`flex  text-white rounded-lg p-4 shadow text-base justify-start space-y-2 items-start flex-col xs-max:w-full ${bg || 'bg-gray-900'}`"
  >
    <div class="truncate text-sm font-medium text-gray-200 lg:text-[13px] lg:break-words lg:max-w-24 md-max:max-w-full">{{ title }}</div>
    <div class="flex">
      <component :is="icon" class="h-6 w-6 shrink-0 mr-4" aria-hidden="true" />
      <div class="text-xl">{{ value }}</div>
    </div>
  </div>
</template>
<script setup>
defineProps(['title', 'value', 'icon', 'bg'])
</script>
<style lang=""></style>
