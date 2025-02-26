<template>
  <headPart backLink="organizers">
    <div class="flex space-x-2 overflow-auto">
      <button 
        @click="ChangeId()"
        class="flex items-center justify-center cursor-pointer mr-2 px-2 primary-tag"
      >
        <ChatBubbleLeftEllipsisIcon 
        class="w-5 text-[#9E55EC]" />
      </button>
      <button 
        v-if="org?.user?.status"
        @click="confirmStatus()"
        class="xm-max:text-[10px] cursor-pointer"
        :class="`${org.user.status == 'active' ? 'success-tag': 
        org.user.status == 'limited' ? 'primary-tag':
        org.user.status == 'not active' ? 'warning-tag': 'danger-tag' }`" >
        {{ org.user.status == 'active' ? 'Активный' :
          org.user.status == 'limited' ? 'Ограничен' :
          org.user.status == 'not active' ? 'Не активирован' : 'Удален/Заблокирован' }}
      </button>
      <span @click="openAccess('organizer')" :class="organizerInfo[org.user?.organizer]?.class" class="xm-max:text-[10px] cursor-pointer">
        {{ organizerInfo[org.user?.organizer]?.title }}
      </span>
    </div>
  </headPart>

  <div class="px-4 pb-4 flex-1 overflow-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
      <!-- Sidebar -->
      <div class="col-span-3 bg-white/100 rounded-[26px] shadow-sm order-first h-full overflow-auto 2xl:col-span-4 md-max:col-span-6 xm-max:col-span-6">
        <OrganizerInfo :user="org.user" :follow="org.follow" />
      </div>
      <!-- Main content -->
      <div class="col-span-6 flex flex-col space-y-2 h-full overflow-auto 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <OrganizerStatistic :org="org" :allEvents="allEvents" />
        <OrganizerEvents :list="allEvents" class="bg-white/100 rounded-[26px] shadow-sm" />
      </div>
      <!-- Tabs and router -->
      <div class="col-span-3 bg-white/100 rounded-[26px] shadow-sm px-2 flex flex-col h-full overflow-hidden 2xl:col-span-12 2xl:h-[670px] md:col-span-12 xm-max:col-span-6">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div>
  <OrganizerAccess
    :options="{
      actions: actions.filter((act) => act.mode == mode)
    }"
    @send="handleSend"
  />
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
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid'

import { actions, organizerInfo } from '@/helpers/vars'
import { organizerStore } from '@/stores/user/organizer'

import OrganizerStatistic from '@/components/data/dashboard/organizer/organizerStatistic.vue'
import OrganizerInfo from '@/components/data/dashboard/organizer/organizerInfo.vue'
import OrganizerEvents from '@/components/data/dashboard/organizer/organizerEvents.vue'
import TabList from '@/components/default/tabList.vue'
import AccessDialog from '@/components/data/dashboard/users/adultDialog.vue';
import { useRouter } from 'vue-router';
const router = useRouter();


import OrganizerAccess from '@/components/data/dashboard/organizer/organizerAccess.vue'
const store = organizerStore()
import { messageStore } from '@/stores/data/message'
const message_store = messageStore()
import { usersStore } from '@/stores/data/users'
const user_store = usersStore()
const route = useRoute()
const id = ref('')
const org = ref({})
const allEvents = ref({})

const mode = ref('')
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()

const openAccess = (m) => {
  mode.value = m
  usefull.setToggle(true, id.value)
}

const handleSend = (value) => {
  org.value = {
    ...org.value,
    user: {
      ...org.value.user,
      ...value
    }
  }
}

const links = [
  {
    name: 'organizer-wallet',
    title: 'Транзакция'
  },
  {
    name: 'organizer-logger',
    title: 'История'
  },
  {
    name: 'organizer-tickets',
    title: 'Билеты'
  }
]




//Comfirm Status dialog
const accessStatusToggle = ref(false)
const confirmStatus = () => {
  accessStatusToggle.value = true
}
const closeStatusDialog = () => {
  accessStatusToggle.value = false
}
const accessStatus = async () => {
  if(org.value.user.status == 'active') {
    await user_store.userAccess(
      {
      _id: id.value,
      action: 'limited'
      }
    )
    org.value.user.status = 'limited'
  } else {
    await user_store.userAccess(
      {
      _id: id.value,
      action: 'allow'
      }
    )
    org.value.user.status = 'active';
  }
  closeStatusDialog()
}


// Message page
const ChangeId = async () => {
  const data = await message_store.getOneChatroom(id.value)
  close()
  router.push({ name: 'showChat', params: { id: data?._id } });
}

const getData = async () => {
  if (!id.value) return false
  org.value = await store.getorganizer(id.value)
  allEvents.value = await store.getorganizerEvents(id.value)
}

onMounted(() => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>
