<template>
  <div class="gap-4">
    <LoadingSpinner v-if="loadingStore.loading"/>
    <div v-else class="grid grid-cols-12 gap-4">
      <!-- <pre>{{ statistic_counts }}</pre> -->
      <div class="col-span-12">
        <allStat :count="statistic_counts" />
      </div>
      <!-- <div class="overflow-hidden col-span-6 lg:col-span-12">
        <DepositStat  :deposits="deposits"/>
      </div> -->
      <!-- <div class="overflow-hidden col-span-6 lg:col-span-12">
        <PurchaseStat :purchases="purchases"/>
      </div> -->
      <div class="overflow-hidden col-span-4 md:col-span-6 xm:col-span-12">
        <UserStat
          
          :count="store.statistic_counts?.user || {}"
          name="users"
          title="Пользователи"
        />
      </div>
      <div class="overflow-hidden col-span-4 md:col-span-6 xm:col-span-12">
        <UserStat
          
          :count="store.statistic_counts?.organizer || {}"
          name="organizers"
          title="Организаторы"
        />
      </div>
      <div class="overflow-hidden col-span-4 md:col-span-12">
        <KeyStat :count="statistic_counts.activationKeys" />
      </div>
      <div class="overflow-hidden col-span-12 lg:col-span-12">
        <EventStat :e="statistic_counts?.event" />
      </div>
      <div class="overflow-hidden col-span-12 lg:col-span-12">
        <EventChart :eventChart="eventChart" />
      </div>
      <!-- <div v-if="ready" class="overflow-hidden col-span-6 lg:col-span-12">
        <ProfitChart :profitChart="profComissionChart?.income"/>
      </div>
      <div v-if="ready" class="overflow-hidden col-span-6 lg:col-span-12">
        <CommistionChart :comissionChart="profComissionChart?.commission" />
      </div> -->
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
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  // Componenta import
  import allStat from './stat/allStat.vue'
  import KeyStat from './stat/keyStat.vue'
  // import OrganizerStat from './stat/organizerStat.vue'
  import EventStat from './stat/eventStat.vue'
  import EventChart from './stat/eventChart.vue'
  import UserChart from './stat/userChart.vue'
  import OrganizerChart from './stat/organizerChart.vue'
  import UserStat from './stat/userStat.vue'
  // import ProfitChart from './stat/profitChart.vue'
  // import CommistionChart from './stat/commistionChart.vue'
  // import DepositStat from './stat/depositChart.vue'
  // import PurchaseStat from './stat/purchaseChart.vue'
  import LoadingSpinner from '@/components/default/loadingSpinner.vue'

  // Store import
  import { useLoadingStore } from '@/stores/usefull/loading'
  import { statisticStore } from '@/stores/data/statistic'
  const store = statisticStore()
  const loadingStore = useLoadingStore()
  const { statistic_counts, eventChart } = storeToRefs(store)

// import { statisticStore } from '@/stores/data/statistic'
// const statistic_store = statisticStore()

  onMounted(async () => {
    await Promise.all([
      store.getStatistics(),
      store.ticketStatistic(),
      // store.allDeposit(),
      // store.profitStatistic()
    ])
  })

</script>
<style lang="scss" scoped></style>
