<template>
  <div class="p-4 overflow-auto">
    <mainStats />
  </div>
</template>
<script setup>
import mainStats from '@/components/data/dashboard/mainStats.vue'
// import { onMounted } from 'vue'
// import { statisticStore } from '@/stores/data/statistic'
// const statistic_store = statisticStore()

// onMounted(async () => {
//   await statistic_store.getStatistics()
//   await statistic_store.allDeposit()
// })
</script>
