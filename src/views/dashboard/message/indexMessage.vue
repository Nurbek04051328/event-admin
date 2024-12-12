<template>
  <head-part>
    <button class="mr-4 p-2 flex items-center min-w-[100px] bg-blue-600 text-white rounded-xl" @click="openModal">
      <div>
        Создать чат
      </div>
      <ChatBubbleLeftEllipsisIcon  class="size-5 ml-2"/>
    </button>
  </head-part>
  <div class="grid grid-cols-12 overflow-hidden h-full">
    <div class="col-span-3 ml-2 overflow-auto border-r border-gray-300">
      <TabList :list="links" @tab-changed="changeTab" :active="currentTab || 'all'"/>
      <AllChatroom :role="currentTab"/>
    </div>
    <div class="flex-1 col-span-9 overflow-hidden space-y-4 flex flex-col h-full">
      <div class="flex-1 overflow-auto space-y-4 p-4 h-full" ref="scrollToBottom">
        <router-view v-if="route.params.id"/>
        <div v-else class="flex items-center justify-center h-full">
          <div  class="text-center">
            <div>
              <ChatBubbleLeftRightIcon/>
            </div>
            Пока нет чат
          </div>
        </div>
      </div>
      <div class="border-t-2 p-4 flex flex-col justify-end">
        <div class="relative rounded-md w-full overflow-hidden">
          <input
            type="text"
            name="price"
            id="price"
            class="block w-full rounded-md border-0 py-3 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Напишите текст сообщение"
            aria-describedby="price-currency"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center p-3 bg-blue-600 text-white"
          >
            <ChevronRightIcon class="size-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <MessageDialog />
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { ChevronRightIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/20/solid'
import TabList from '@/components/data/dashboard/message/tabButtons.vue'
import AllChatroom from '@/components/data/dashboard/message/chatRoom.vue'
import MessageDialog from '@/components/data/dashboard/message/messageDialog.vue/'

import { useRoute } from 'vue-router';

const route = useRoute();


const links = [
  { name: 'AllChatroom', title: 'Все', role: 'all' },
  { name: 'OrganizerChatroom', title: 'Организаторы', role: 'organizer' },
  { name: 'UserChatroom', title: 'Пользователи', role: 'user' },
]


let currentTab = ref("all"); 
const changeTab = (tabName) => {
  currentTab.value = tabName;
};


/// Modal 
import { useFullStore } from '@/stores/usefull/modal'
const store = useFullStore()

const openModal = () => {
  store.setToggle(true)
}

const scrollToBottom = ref(null)
onMounted(async () => {
  nextTick(() => {
    if (scrollToBottom.value) {
      scrollToBottom.value.scrollTop = scrollToBottom.value.scrollHeight
    }
  });
})

watch(() => route.params.id, () => {
  nextTick(() => {
    if (scrollToBottom.value) {
      scrollToBottom.value.scrollTop = scrollToBottom.value.scrollHeight
    }
  })
})
</script>
<style lang=""></style>
