<template>
  <div class="md:h-screen md:flex md:flex-col md:overflow-auto md:pb-36">
    <div class="grid grid-cols-12 gap-5 px-[20px] relative mt-4 2xl:gap-3 ">
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
    await Promise.all([
      await store.profitStatistic()
    ])
  })
</script>
<style lang=""></style>