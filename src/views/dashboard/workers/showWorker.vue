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


import { workerStore } from '@/stores/data/workers'
const store = workerStore()

import { usersStore } from '@/stores/data/users'
const user_store = usersStore()

import WorkerInfo from '@/components/data/dashboard/worker/workerInfo.vue'
import TabList from '@/components/default/tabList.vue'
import AccessDialog from '@/components/data/dashboard/users/adultDialog.vue';


const route = useRoute()
const id = ref('')
const worker = ref({})


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
    await user_store.userAccess(
      {
      _id: id.value,
      action: 'limited'
      }
    )
    worker.value.data.status = 'limited'
  } else {
    await user_store.userAccess(
      {
      _id: id.value,
      action: 'allow'
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