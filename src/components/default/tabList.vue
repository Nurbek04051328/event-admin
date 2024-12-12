<template>
  <div class="border-b border-gray-200 w-full">
    <nav class="flex space-x-8" aria-label="Tabs">
      <router-link
        :to="{ name: tab.name }"
        v-for="tab in list"
        :key="tab.name"
        :class="[
          tab.name == route.name
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
          'whitespace-nowrap border-b-[1px] py-4 px-1 text-sm font-medium'
        ]"
        :aria-current="tab.name == route.name ? 'page' : undefined"
        >{{ tab.title }}
      </router-link>
    </nav>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

defineProps(['list'])

const route = useRoute()
</script>
<style lang=""></style>
