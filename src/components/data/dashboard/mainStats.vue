<template>
  <div class="gap-4">
    <div class="grid grid-cols-12 gap-4">
      <!-- <pre>{{ statistic_counts }}</pre> -->
      <div class="col-span-12">
        <allStat :count="statistic_counts" />
      </div>
      <div class="overflow-hidden col-span-6 lg:col-span-12">
        <DepositStat />
      </div>
      <div class="overflow-hidden col-span-6 lg:col-span-12">
        <PurchaseStat />
      </div>
      <div class="overflow-hidden col-span-4 md-max:col-span-12">
        <UserStat
          
          :count="store.statistic_counts?.user || {}"
          name="users"
          title="Пользователи"
        />
      </div>
      <div class="overflow-hidden col-span-4 md-max:col-span-12">
        <UserStat
          
          :count="store.statistic_counts?.organizer || {}"
          name="organizers"
          title="Организаторы"
        />
      </div>
      <div class="overflow-hidden col-span-4 md-max:col-span-12">
        <KeyStat :count="statistic_counts.activationKeys" />
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
// Paketlar import
import { storeToRefs } from 'pinia'

// Componenta import
import allStat from './stat/allStat.vue'
import KeyStat from './stat/keyStat.vue'
// import OrganizerStat from './stat/organizerStat.vue'
import EventStat from './stat/eventStat.vue'
import EventChart from './stat/eventChart.vue'
import ProfitChart from './stat/profitChart.vue'
import CommistionChart from './stat/commistionChart.vue'
import UserChart from './stat/userChart.vue'
import OrganizerChart from './stat/organizerChart.vue'
import UserStat from './stat/userStat.vue'
import DepositStat from './stat/depositChart.vue'
import PurchaseStat from './stat/purchaseChart.vue'

// Store import
import { statisticStore } from '@/stores/data/statistic'
const store = statisticStore()
const { statistic_counts } = storeToRefs(store)
</script>
<style lang="scss" scoped></style>
