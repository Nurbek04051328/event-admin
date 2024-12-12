<template>
  <headPart backLink="workers">
    <div class="flex space-x-2 overflow-auto">
      <div :class="`${worker.status ? 'success-tag' : 'warning-tag'}`" v-if="worker?.status" class="xm-max:text-[10px]">
        {{ worker.status ? 'Активный' : 'Не активировано' }}
      </div>
    </div>
  </headPart>
  <div class="p-4 flex-1 overflow-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
      <!-- Sidebar -->
      <div class="col-span-4 order-first h-full overflow-auto 2xl:col-span-4  md-max:col-span-6 xm-max:col-span-6">
        <WorkerInfo :user="worker.data" />
      </div>
      <!-- Main content -->
      <div class="col-span-8 flex flex-col space-y-2 h-full overflow-auto 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


import { workerStore } from '@/stores/data/workers'

import WorkerInfo from '@/components/data/dashboard/worker/workerInfo.vue'
// import OrganizerStatistic from '@/components/data/dashboard/organizer/organizerStatistic.vue'
// import OrganizerEvents from '@/components/data/dashboard/organizer/organizerEvents.vue'
import TabList from '@/components/default/tabList.vue'

// import OrganizerAccess from '@/components/data/dashboard/organizer/organizerAccess.vue'
const store = workerStore()

const route = useRoute()
const id = ref('')
const worker = ref({})
const allEvents = ref({})

// const mode = ref('')
// import { useFullStore } from '@/stores/usefull/modal'
// const usefull = useFullStore()

// const openAccess = (m) => {
//   mode.value = m
//   usefull.setToggle(true, id.value)
// }

// const handleSend = (value) => {
//   org.value = {
//     ...org.value,
//     user: {
//       ...org.value.user,
//       ...value
//     }
//   }
// }

const links = [
  {
    name: 'worker-logger',
    title: 'История'
  },
  {
    name: 'worker-history',
    title: ' История мероприятие'
  }
]

const getData = async () => {
  if (!id.value) return false
  worker.value = await store.getInfoWorker(id.value)
  // allEvents.value = await store.getorganizerEvents(id.value)
  console.log("a",worker.value)
  // console.log("b",allEvents.value)
}

onMounted(() => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>