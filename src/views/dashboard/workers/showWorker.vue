<template>
  <headPart backLink="workers">
    <div class="flex space-x-2 overflow-auto">
      <button 
        v-if="worker?.data?.status"
        @click="confirmStatus()"
        class="xm-max:text-[10px] cursor-pointer"
        :class="`${worker?.data?.status == 'active' ? 'success-tag': 
        worker?.data?.status == 'limited' ? 'primary-tag':
        worker?.data?.status == 'not active' ? 'warning-tag': 'danger-tag' }`" >
        {{ worker?.data?.status == 'active' ? 'Активный' :
          worker?.data?.status == 'limited' ? 'Ограничен' :
          worker?.data?.status == 'not active' ? 'Не активирован' : 'Удален/Заблокирован' }}
      </button>
    </div>
  </headPart>
  <div class="p-4 flex-1 overflow-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
      
      <div class="col-span-4 bg-white/100 rounded-[26px] shadow-sm order-first h-full overflow-auto 2xl:col-span-4  md-max:col-span-6 xm-max:col-span-6">
        <WorkerInfo :user="worker.data" />
      </div>
      
      <div class="col-span-8 bg-white/100 rounded-[26px] shadow-sm px-3 flex flex-col space-y-2 h-full overflow-hidden 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <TabList :list="links" />
        <router-view/>
      </div>
    </div>
  </div>
  <accessDialog 
    :title="$t('event.accessDialog.accesstitle')" 
    :btnTitle="$t('event.accessDialog.btnTitle')" 
    @adult="accessStatus" 
    @closeAdult="closeStatusDialog()" 
    :dialog="accessStatusToggle" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import paginate from 'vuejs-paginate-next'

import { workerStore } from '@/stores/data/workers'
const store = workerStore()

// import { loggerStore } from '@/stores/user/logger'
// const logger_store = loggerStore()



// const clickCallback = async (value) => {
//   page.value = value
//   await logger_store.userLogger({
//     limit: limit.value,
//     page: page.value,
//     actionFrom: id.value
//   })
// }


import WorkerInfo from '@/components/data/dashboard/worker/workerInfo.vue'
import TabList from '@/components/default/tabList.vue'
import AccessDialog from '@/components/data/dashboard/users/adultDialog.vue';


const route = useRoute()
const id = ref('')
const worker = ref({})


const links = [
  {
    name: 'worker-statistic',
    title: 'Статистика'
  },
  {
    name: 'worker-logger',
    title: 'История'
  },
  {
    name: 'worker-history',
    title: ' История мероприятий'
  }
]

const getData = async () => {
  if (!id.value) return false
  worker.value = await store.getInfoWorker(id.value)
}


//Comfirm Status dialog
const accessStatusToggle = ref(false)
const confirmStatus = () => {
  accessStatusToggle.value = true
}
const closeStatusDialog = () => {
  accessStatusToggle.value = false
}
const accessStatus = async () => {
  if(worker.value.data.status == 'active') {
    await store.changeStatusWorker(
      {
      id: id.value,
      status: 'limited'
      }
    )
    worker.value.data.status = 'limited'
  } else {
    await store.changeStatusWorker(
      {
      id: id.value,
      status: 'active'
      }
    )
    worker.value.data.status = 'active';
  }
  closeStatusDialog()
}




onMounted(() => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>