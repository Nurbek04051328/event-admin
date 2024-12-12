<template>
  <headPart backLink="users">
    <div class="flex space-x-2 overflow-auto">
      <div :class="`${user?.user?.status ? 'success-tag' : 'warning-tag'}`" v-if="user?.user?.status">
        {{ user?.user?.status ? 'Активный' : 'Не активировано' }}
      </div>
      <button @click="confirmAdult()" :class="`${user?.user?.adult == true ? 'success-tag' : 'warning-tag'}`">
        {{ user?.user?.adult == true ? "Взрослый" : "Несовершеннолетний"}}
      </button>
      <!-- @click="accessAdult(user?.user?.adult)" -->
      <!-- <div
        @click="openAccess('organizer')"
        :class="`${org.user?.organizer ? 'success-tag' : 'warning-tag'} cursor-pointer`"
      >
        {{ org.user?.organizer ? 'Проверенный организатор' : 'Не проверено' }}
      </div> -->
      <!-- <span @click="openAccess('user')" :class="organizerInfo[user.user?.organizer]?.class">
        {{ organizerInfo[user?.user?.organizer]?.title }}
      </span> -->
    </div>
  </headPart>
  <div class="p-4 flex-1 overflow-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
      <div class="col-span-3 order-first h-full overflow-auto 2xl:col-span-4 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <UserInfo :user="user?.user" :follow="user?.follow" />
      </div>
      <div class="col-span-6 flex flex-col space-y-2 h-full overflow-auto 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <UserStatistic :org="user" :allEvents="allEvents"/>
        <UserEvents :list="allEvents" />
      </div>
      <div class="col-span-3 flex flex-col h-full overflow-auto 2xl:col-span-12 2xl:h-[670px] md:col-span-12 xm-max:col-span-6">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div>
  <accessDialog 
    :title="$t('event.accessDialog.accesstitle')" 
    :btnTitle="$t('event.accessDialog.btnTitle')" 
    @adult="accessAdult" 
    @closeAdult="close()" 
    :dialog="accessAdultToggle" />
  <!-- <OrganizerAccess
    :options="{
      actions: actions.filter((act) => act.mode == mode)
    }"
    @send="handleSend"
  /> -->
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// import { actions, organizerInfo } from '@/helpers/vars'
import { usersStore } from '@/stores/data/users'

import UserStatistic from '@/components/data/dashboard/users/userStatistic.vue'
import UserInfo from '@/components/data/dashboard/users/userInfo.vue'
import UserEvents from '@/components/data/dashboard/users/userEvents.vue'
import TabList from '@/components/default/tabList.vue'
import AccessDialog from '@/components/data/dashboard/users/adultDialog.vue';

// import OrganizerAccess from '@/components/data/dashboard/organizer/organizerAccess.vue'
const store = usersStore()

const route = useRoute()
const id = ref('')
const user = ref({})
const allEvents = ref({})

// const mode = ref('')
// import { useFullStore } from '@/stores/usefull/modal'
// const usefull = useFullStore()

// const openAccess = (m) => {
//   mode.value = m
//   usefull.setToggle(true, id.value)
// }

// const handleSend = (value) => {
//   user.value = {
//     ...user.value,
//     user: {
//       ...user.value.user,
//       ...value
//     }
//   }
// }

//Comfirm Adult dialog
const accessAdultToggle = ref(false)
const confirmAdult = () => {
  accessAdultToggle.value = true
}


const accessAdult = async () => {
  if(user.value.user.adult) {
    await store.userAccess(
      {
      _id: id.value,
      action: 'minor'
      }
    )
    user.value.user.adult = false
  } else {
    await store.userAccess(
      {
      _id: id.value,
      action: 'adult'
      }
    )
    user.value.user.adult = true;
  }
  close()
}

const close = () => {
  accessAdultToggle.value = false
}

const links = [
  {
    name: 'user-logger',
    title: 'История'
  },
  {
    name: 'user-tickets',
    title: 'Билеты'
  }
]

const getData = async () => {
  if (!id.value) return false
  user.value = await store.getUser(id.value)
  allEvents.value = await store.getuserEvents(id.value)
  console.log("user", user.value);
  
}

onMounted(() => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>
