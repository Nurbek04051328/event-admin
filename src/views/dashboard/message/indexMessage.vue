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
      <div class="flex-1 overflow-hidden flex flex-col space-y-4 p-4 h-full" >
        <router-view v-if="route.params.id" />
        <div v-else class="flex items-center justify-center h-full">
          <div  class="text-center">
            <div>
              <ChatBubbleLeftRightIcon/>
            </div>
            Выберите чат
          </div>
        </div>
      </div>
      <div class="border-t-2 p-4 flex flex-col justify-end" v-if="route.params.id">
        <div class="relative rounded-md w-full overflow-hidden">
          <textarea
            type="textarea"
            name="price"
            id="price"
            ref="messageInput"
            v-model="message.text"
            @keydown="handleKeydown"
            :autosize="{ minRows: 2, maxRows: 5 }"
            class="block w-full rounded-md border-0 py-3 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Напишите текст сообщение"
            aria-describedby="price-currency"
          />
          <button
            class="absolute inset-y-3 right-1 flex items-center p-3 bg-blue-600 text-white cursor-pointer rounded-lg"
            @click="send()"
          >
            <PaperAirplaneIcon class="size-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <MessageDialog />
</template>
<script setup>
import { ref, watch } from 'vue'
import { ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon} from '@heroicons/vue/20/solid'
import TabList from '@/components/data/dashboard/message/tabButtons.vue'
import AllChatroom from '@/components/data/dashboard/message/chatRoom.vue'
import MessageDialog from '@/components/data/dashboard/message/messageDialog.vue/'
import { messageStore } from '@/stores/data/message'
const message_store = messageStore()
import { useRoute } from 'vue-router';
import { useNotification } from '@/stores/usefull/notification'
const notification = useNotification()
const messageInput = ref(null)
const route = useRoute();

const message = ref({})

const links = [
  { name: 'AllChatroom', title: 'Все', role: 'all' },
  { name: 'OrganizerChatroom', title: 'Организаторы', role: 'organizer' },
  { name: 'UserChatroom', title: 'Пользователи', role: 'user' },
]


let currentTab = ref("all"); 
const changeTab = (tabName) => {
  currentTab.value = tabName;
};


// Enterni bosganda sms ketishi va shift + enterda pastki qatorga tushishi
const handleKeydown = async (event) => {
  if (event.key === 'Enter' && event.shiftKey) {
    return;
  }
  if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await send();
  }
};

const send = async () => {
  let cleanedText = message.value?.text?.trim();
  if (!cleanedText) {
    notification.setNotif(true, 'Поле не должно быть пустым!', 'warning')
    return;
  }
  if(message.value.text && route.params.id) {
      message.value.room = route.params.id
      await message_store.sendMessage(message.value )
      message.value = {}
  }
}

/// Modal 
import { useFullStore } from '@/stores/usefull/modal'
const store = useFullStore()

const openModal = () => {
  store.setToggle(true)
}



watch(() => route.params.id, async () => {
  messageInput.value?.focus()
});

</script>
<style lang=""></style>
