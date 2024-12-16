<template>
  <headPart backLink="organizers">
    <div class="flex space-x-2 overflow-auto">
      <button 
        @click="ChangeId()"
        class="flex items-center justify-center cursor-pointer mr-2"
      >
        <ChatBubbleLeftEllipsisIcon 
        class="w-5 text-gray-900/80" />
      </button>
      <div :class="`${org.user.status ? 'success-tag' : 'warning-tag'}`" v-if="org?.user?.status" class="xm-max:text-[10px]">
        {{ org.user.status ? 'Активный' : 'Не активировано' }}
      </div>
      <span @click="openAccess('organizer')" :class="organizerInfo[org.user?.organizer]?.class" class="xm-max:text-[10px]">
        {{ organizerInfo[org.user?.organizer]?.title }}
      </span>
    </div>
  </headPart>
  <!-- <div class="p-4 flex-1 overflow-auto h-[100%] ">
    <div class="grid grid-cols-12 gap-4 h-[100%] ">
      <div class="col-span-3 order-first h-[100%] overflow-auto 2xl:col-span-4 ">
        <OrganizerInfo :user="org.user" :follow="org.follow" />
      </div>
      <div class="col-span-6 flex flex-col space-y-2 h-[100%] overflow-auto 2xl:col-span-8">
        <OrganizerStatistic :org="org" :allEvents="allEvents" />
        <OrganizerEvents :list="allEvents" />
      </div>
      <div class="col-span-3 flex flex-col h-[100%] overflow-auto 2xl:col-span-12 ">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div> -->
  <div class="p-4 flex-1 overflow-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
      <!-- Sidebar -->
      <div class="col-span-3 order-first h-full overflow-auto 2xl:col-span-4 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <OrganizerInfo :user="org.user" :follow="org.follow" />
      </div>
      <!-- Main content -->
      <div class="col-span-6 flex flex-col space-y-2 h-full overflow-auto 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <OrganizerStatistic :org="org" :allEvents="allEvents" />
        <OrganizerEvents :list="allEvents" />
      </div>
      <!-- Tabs and router -->
      <div class="col-span-3 flex flex-col h-full overflow-auto 2xl:col-span-12 2xl:h-[670px] md:col-span-12 xm-max:col-span-6">
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
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/20/solid'

import { actions, organizerInfo } from '@/helpers/vars'
import { organizerStore } from '@/stores/user/organizer'

import OrganizerStatistic from '@/components/data/dashboard/organizer/organizerStatistic.vue'
import OrganizerInfo from '@/components/data/dashboard/organizer/organizerInfo.vue'
import OrganizerEvents from '@/components/data/dashboard/organizer/organizerEvents.vue'
import TabList from '@/components/default/tabList.vue'
import { useRouter } from 'vue-router';
const router = useRouter();


import OrganizerAccess from '@/components/data/dashboard/organizer/organizerAccess.vue'
const store = organizerStore()
import { messageStore } from '@/stores/data/message'
const message_store = messageStore()

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
    name: 'organizer-logger',
    title: 'История'
  },
  {
    name: 'organizer-tickets',
    title: 'Билеты'
  }
]




// Message page
const ChangeId = async () => {
  const data = await message_store.getOneChatroom(id.value)
  console.log("datadata", data);
  close()
  router.push({ name: 'showChat', params: { id: data?._id } });
}

const getData = async () => {
  if (!id.value) return false
  org.value = await store.getorganizer(id.value)
  allEvents.value = await store.getorganizerEvents(id.value)
  console.log("a",org.value)
  console.log("b",allEvents.value)
}

onMounted(() => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>
