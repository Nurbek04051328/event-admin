<template>
  <div class="gap-4">
    <div class="grid grid-cols-12 gap-3">
      <!-- <pre>{{ statistic_counts }}</pre> -->
      <div class="col-span-12">
        <allStat :count="statistic_counts" />
      </div>
      <!-- <div class="overflow-hidden col-span-6 md-max:col-span-12">
        <KeyStat :count="statistic_counts" />
      </div>
      <div class="overflow-hidden col-span-6 md-max:col-span-12">
        <OrganizerStat :count="statistic_counts" />
      </div> -->
      <div class="overflow-hidden mt-4 col-span-6 lg:col-span-12">
        <EventStat :e="statistic_counts?.event" />
      </div>
      <div class="overflow-hidden mt-4 col-span-6 md-max:col-span-12">
        <OrganizerStat :count="statistic_counts.user" />
        <KeyStat :count="statistic_counts.activationKeys" class="mt-2" />
      </div>
      <div class="overflow-hidden col-span-12 lg:col-span-12">
        <EventChart />
      </div>
      <div class="overflow-hidden col-span-6 lg:col-span-12">
        <ProfitChart />
      </div>
      <div class="overflow-hidden col-span-6 lg:col-span-12">
        <CommistionChart />
      </div>
      <div class="overflow-hidden col-span-6 lg:col-span-12">
        <UserChart />
      </div>
      <div class="overflow-hidden col-span-6 lg:col-span-12">
        <OrganizerChart />
      </div>
    </div>
  </div>
</template>
<script setup>
// Paketlar import
  import { storeToRefs } from 'pinia'

  // Componenta import
  import allStat from './stat/allStat.vue'
  import KeyStat from './stat/keyStat.vue'
  import OrganizerStat from './stat/organizerStat.vue'
  import EventStat from './stat/eventStat.vue'
  import EventChart from './stat/eventChart.vue'
  import ProfitChart from './stat/profitChart.vue'
  import CommistionChart from './stat/commistionChart.vue'
  import UserChart from './stat/userChart.vue'
  import OrganizerChart from './stat/organizerChart.vue'

// Store import
  import { statisticStore } from '@/stores/data/statistic'
  const statistic_store = statisticStore()
  const { statistic_counts } = storeToRefs(statistic_store)

</script>
<style lang="scss" scoped>
  
</style>
