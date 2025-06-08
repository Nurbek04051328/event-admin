<template>
  <headPart backLink="users">
    <div class="flex space-x-2 overflow-auto">
      <button 
        @click="ChangeId()"
        class="flex items-center justify-center cursor-pointer mr-2 px-2 primary-tag"
      >
        <ChatBubbleLeftEllipsisIcon 
        class="w-5 text-[#9E55EC]" />
      </button>
      <button 
        v-if="user?.user?.status"
        @click="confirmStatus()"
        class="xm-max:text-[10px] cursor-pointer"
        :class="`${user.user.status == 'active' ? 'success-tag': 
        user.user.status == 'limited' ? 'primary-tag':
        user.user.status == 'not active' ? 'warning-tag': 'danger-tag' }`" >
        {{ user.user.status == 'active' ? 'Активный' :
          user.user.status == 'limited' ? 'Ограничен' :
          user.user.status == 'not active' ? 'Не активирован' : 'Удален/Заблокирован' }}
      </button>
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
  <div class="px-4 pb-4 flex-1 overflow-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
      <div class="col-span-3 bg-white/100 rounded-[26px] shadow-sm order-first h-full overflow-auto 2xl:col-span-4 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <UserInfo :user="user?.user" :follow="user?.follow" />
      </div>
      <div class="col-span-6 flex flex-col space-y-2 h-full overflow-auto 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
        <UserStatistic :org="user" :allEvents="allEvents"/>
        <UserEvents :list="allEvents" class="bg-white/100 rounded-[26px] shadow-sm" />
      </div>
      <div class="col-span-3 bg-white/100 rounded-[26px] shadow-sm px-3 flex flex-col h-full overflow-auto 2xl:col-span-12 2xl:h-[670px] md:col-span-12 xm-max:col-span-6">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div>
  <!-- Bu Alult uchun dilaog -->
  <accessDialog 
    :title="$t('event.accessDialog.accesstitle')" 
    :btnTitle="$t('event.accessDialog.btnTitle')" 
    @adult="accessAdult" 
    @closeAdult="close()" 
    :dialog="accessAdultToggle" />
  <!-- Bu Status uchun Confirm Dialog -->
  <accessDialog 
    :title="$t('event.accessDialog.accesstitle')" 
    :btnTitle="$t('event.accessDialog.btnTitle')" 
    @adult="accessStatus" 
    @closeAdult="closeStatusDialog()" 
    :dialog="accessStatusToggle" />


  
  <!-- <OrganizerAccess
    :options="{
      actions: actions.filter((act) => act.mode == mode)
    }"
    @send="handleSend"
  /> -->
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/20/solid'
// import { actions, organizerInfo } from '@/helpers/vars'
import { usersStore } from '@/stores/data/users'

import UserStatistic from '@/components/data/dashboard/users/userStatistic.vue'
import UserInfo from '@/components/data/dashboard/users/userInfo.vue'
import UserEvents from '@/components/data/dashboard/users/userEvents.vue'
import TabList from '@/components/default/tabList.vue'
import AccessDialog from '@/components/data/dashboard/users/adultDialog.vue';
import { messageStore } from '@/stores/data/message'
const message_store = messageStore()
// import OrganizerAccess from '@/components/data/dashboard/organizer/organizerAccess.vue'
const store = usersStore()
const router = useRouter();
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


//Comfirm Status dialog
const accessStatusToggle = ref(false)
const confirmStatus = () => {
  accessStatusToggle.value = true
}
const closeStatusDialog = () => {
  accessStatusToggle.value = false
}
const accessStatus = async () => {
  if(user.value.user.status == 'active') {
    await store.userAccess(
      {
      _id: id.value,
      action: 'limited'
      }
    )
    user.value.user.status = 'limited'
  } else {
    await store.userAccess(
      {
      _id: id.value,
      action: 'allow'
      }
    )
    user.value.user.status = 'active';
  }
  closeStatusDialog()
}



// Message page
const ChangeId = async () => {
  const data = await message_store.getOneChatroom(id.value)
  console.log("datadata", data);
  close()
  router.push({ name: 'showChat', params: { id: data?._id } });
}


const links = [
  {
    name: 'user-wallet',
    title: 'Транзакция'
  },
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
