<template>
  <div class="border-b border-gray-200 w-full">
    <nav class="flex justify-around" aria-label="Tabs">
      <router-link
        :to="{ name: tab.name }"
        v-for="tab in list"
        :key="tab.name"
        :class="[
          tab.name == route.name
            ? 'border-[#9E55EC] text-[#9E55EC]'
            : 'border-transparent text-[#B6A3D0] hover:border-gray-300 hover:text-[#b984f1]',
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
