<template>
  <div class="grid grid-cols-12 overflow-hidden h-full gap-5 px-[20px] relative mt-4">
    <div class="overflow-hidden col-span-12 lg:col-span-12">
      <PurchaseStat :purchases="purchases"/>
    </div>
    <div  class="overflow-hidden col-span-6 lg:col-span-12">
      <ProfitChart :profitChart="profComissionChart?.income"/>
    </div>
    <div class="overflow-hidden col-span-6 lg:col-span-12">
      <CommistionChart :comissionChart="profComissionChart?.commission" />
    </div>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import ProfitChart from '@/components/data/dashboard/stat/profitChart.vue'
  import CommistionChart from '@/components/data/dashboard/stat/commistionChart.vue'
  import PurchaseStat from '@/components/data/dashboard/stat/purchaseChart.vue'
  import { statisticStore } from '@/stores/data/statistic'
  const store = statisticStore()
  const { purchases, profComissionChart } = storeToRefs(store)



  onMounted(async () => {
    await store.allDeposit()
    await store.profitStatistic()
  })
</script>
<style lang=""></style>