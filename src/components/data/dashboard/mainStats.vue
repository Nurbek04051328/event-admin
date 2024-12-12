<template>
  <div class="gap-4">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12">
        <allStat :count="statistic_counts" />
      </div>

      <div class="overflow-hidden col-span-6 md-max:col-span-12">
        <KeyStat :count="statistic_counts" />
      </div>
      <div class="overflow-hidden col-span-6 md-max:col-span-12">
        <OrganizerStat :count="statistic_counts" />
      </div>
      <div class="overflow-hidden col-span-12 lg:col-span-12">
        <EventStat :e="statistic_counts?.event" />
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
import allStat from './stat/allStat.vue'
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
// import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { statisticStore } from '@/stores/data/statistic'

import KeyStat from './stat/keyStat.vue'
import EventStat from './stat/eventStat.vue'
import OrganizerStat from './stat/organizerStat.vue'
import EventChart from './stat/eventChart.vue'
import ProfitChart from './stat/profitChart.vue'
import CommistionChart from './stat/commistionChart.vue'
import UserChart from './stat/userChart.vue'
import OrganizerChart from './stat/organizerChart.vue'
const statistic_store = statisticStore()
const { statistic_counts } = storeToRefs(statistic_store)
</script>
