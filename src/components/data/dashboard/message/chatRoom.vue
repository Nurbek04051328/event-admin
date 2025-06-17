<template>
  <ul role="list" class="divide-y divide-gray-100 w-full  overflow-auto flex-1">
    <div v-if="chatrooms.data.filter(person => person?.participants.filter(participant => participant.role === role).length > 0 || role === 'all').length === 0" class="text-center w-full mt-3">
      <p>Пока нет чат</p>
    </div>
    <li v-for="person in chatrooms.data" :key="person" class="relative flex justify-between gap-x-6 ">
      <div 
        class="relative flex justify-between gap-x-6 w-full  py-4 px-2 rounded-xl hover:bg-[#F5F0FF] group" 
        v-if="person?.participants.filter(participant => participant.role === role).length > 0 || role == 'all'"
        :class="person._id == route.params.id ? 'bg-[#F5F0FF]' : ''"
      >
        <div class="flex flex-1 gap-x-4" >
          <!-- <pre>{{ person }}</pre> -->
          <!-- <div
            class="h-12 w-12 flex-none rounded-full flex items-center justify-center text-white font-bold"
            :style="person?.img ? '' : { backgroundColor: randomColor(person.userName) }"
          >
            <img
              v-if="person?.cover.length > 0"
              class="h-12 w-12 flex-none rounded-full bg-gray-50"
              :src="`${url}/${person?.cover[0]}`"
              alt="Profile image"
            />
            <span v-else>
              {{ person?.userName.charAt(0).toUpperCase() }}
            </span>
          </div> -->
          <div class="h-12 w-12 flex-none rounded-full flex items-center justify-center bg-[#F5F0FF] group-hover:bg-white"
          :class="person._id == route.params.id ? 'bg-white' : ''"
          >
            <img src="@/assets/images/header-user.svg" alt="">
          </div>
          <div class="min-w-0 flex-auto relative">
            <router-link :to="{ name: 'showChat', params: { id: person._id } }" class="cursor-pointer">
              <p class="text-sm font-semibold leading-6 text-gray-900">
                <!-- <span class="absolute inset-x-0 bottom-0" /> -->
                {{ person?.userName }}
              </p>
              <div class="flex items-center h-4 overflow-hidden">
                <p
                v-if="auth_store.user.id== person?.lastMessage?.sender?._id"
                class="text-sm mr-1">Вы:</p>
                <p 
                class="flex text-xs leading-5 text-gray-500"
                v-if="person?.lastMessage?.text" 
                v-html="person?.lastMessage?.text?.replace(/\n/g, '<br>').slice(0,30)"
                ></p>
                
              </div>
            </router-link>
          </div>
        </div>
        <div class="flex items-center gap-x-4">
          <div class="flex flex-col items-end">
            <div 
              v-if="person?.notViewed>0"
              class="rounded-xl py-[2px] px-[6px] bg-blue-900 text-white text-sm"
            >
              {{ person?.notViewed }}
            </div>
            <div  class="mt-1 flex items-center gap-x-1.5">
              <!-- <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p class="text-xs leading-5 text-gray-500">Online</p> -->
            </div>
          </div>
          
          
        </div>
      </div>
      <!-- <div v-else class="text-center w-full mt-3">
        <p>Пока нет чат</p>
      </div> -->
    </li>
  </ul>
  
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
const props = defineProps(['role'])
import { messageStore } from '@/stores/data/message'
const store = messageStore()
const { chatrooms } = storeToRefs(store)
import { authStore } from '@/stores/user/auth';
const auth_store = authStore()
const url = import.meta.env.VITE_URL
import { useRoute } from 'vue-router';
const route = useRoute();



const getData = async () => {
  if(props.role == 'all') {
    await store.getChatrooms()
  } else {
    await store.getChatrooms({role:props.role})
  }
}

const randomColor = (name) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#C70039', '#581845', '#2ECC71'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

onMounted(async () => {
  await getData()
})
</script>
<style lang=""></style>