<template>
  <div class="grid grid-cols-12 overflow-hidden h-full gap-5 px-[20px] relative">
    <div class="col-span-3 h-full">
      <div class=" flex items-center justify-between">
        <h2 class=" text-[#645A77] text-[22px] font-bold">
          Чаты
        </h2>
        <button 
          @click="openModal"
          class="flex items-center justify-center leading-10 w-[30px] bg-[#9E55EC] rounded-full  text-white  ">
          <PlusIcon class="w-[25px] h-[30px]"/>
        </button>
      </div>
      <div class="mt-6 flex flex-col gap-[20px] h-full">
        <TabList :list="links" @tab-changed="changeTab" :active="currentTab || 'all'"/>
        <div class="relative w-full rounded-[50px] bg-white p-[16px]">
          <!-- <label for="search-field" class=""> {{ $t('header.search') }}</label> -->
          <MagnifyingGlassIcon
            class="pointer-events-none text-[#9E55EC] absolute inset-y-0  h-full w-5"
            aria-hidden="true"
          />
          <input
            id="search-field"
            class="block bg-inherit h-full w-full border-0 py-0 pl-8 pr-0 text-[#9E55EC] placeholder:text-[#B6A3D0] focus:ring-0 sm:text-sm focus:outline-none"
            :placeholder="$t('header.search')"
            type="search"
            name="search"
            v-model="searchText"
          />
        </div>
        <div class="bg-white rounded-[20px] overflow-auto flex-1">
          <AllChatroom :role="currentTab"/>
        </div>
      </div>
    </div>
    <div class="flex-1 col-span-9 overflow-hidden space-y-4 flex flex-col h-full bg-white rounded-[26px] py-[25px] w-full">
      <div class="flex-1 flex overflow-hidden flex-col space-y-4 h-full" >
        <router-view v-if="route.params.id" />
        <div v-else class="flex items-center justify-center h-full">
          <div  class="text-center text-[#483D5B]">
            <div>
              <ChatBubbleLeftRightIcon class="text-[#9E55EC]"/>
            </div>
            Выберите чат
          </div>
        </div>
      </div>
      <div class="border-t-2 z-[99] p-4 flex flex-col justify-end" v-if="route.params.id">
        <div class="relative rounded-md w-full overflow-hidden">
          <textarea
            type="textarea"
            name="price"
            id="price"
            ref="messageInput"
            v-model="message.text"
            @keydown="handleKeydown"
            :autosize="{ minRows: 2, maxRows: 5 }"
            class="block w-full rounded-[50px] py-3 pl-6 pr-12 text-[#483D5B] placeholder:text-gray-400 border focus:border-[#9E55EC] resize-none"
            placeholder="Напишите текст сообщение"
            aria-describedby="price-currency"
          />
          <!-- Smaylik Button -->
          <button
            class="absolute inset-y-3 right-14 flex items-center justify-center p-3 cursor-pointer rounded-full"
            @click="toggleEmojiPicker"
          >
            <img src="@/assets/images/smileIcon.svg" alt="">
          </button>
          <button
            class="absolute inset-y-3 right-3 flex items-center justify-center py-3 px-4 bg-[#9E55EC] text-white cursor-pointer rounded-full"
            @click="send()"
          >
            <PaperAirplaneIcon class="size-5 -rotate-45" />
          </button>
          <!-- Smaylik paneli -->
        </div>
      </div>
    </div>
    <div v-if="showEmojiPicker" class="absolute z-[9999] bottom-[120px] right-12 bg-white border shadow-md rounded-md p-2">
      <Picker :data="emojiIndex" set="twitter" @select="addEmoji" />
    </div>
  </div>
  
  <!-- <div class="grid grid-cols-12 overflow-hidden h-full">
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
  </div> -->
  <MessageDialog />
</template>
<script setup>
import { ref, watch } from 'vue'
import { PlusIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, MagnifyingGlassIcon} from '@heroicons/vue/20/solid'
import TabList from '@/components/data/dashboard/message/tabButtons.vue'
import AllChatroom from '@/components/data/dashboard/message/chatRoom.vue'
import MessageDialog from '@/components/data/dashboard/message/messageDialog.vue/'
import { messageStore } from '@/stores/data/message'
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

const message_store = messageStore()
import { useRoute } from 'vue-router';
import { useNotification } from '@/stores/usefull/notification'
const notification = useNotification()
const messageInput = ref(null)
const route = useRoute();

const message = ref({})
const searchText = ref('')

const links = [
  { name: 'AllChatroom', title: 'Все', role: 'all' },
  { name: 'OrganizerChatroom', title: 'Организаторы', role: 'organizer' },
  { name: 'UserChatroom', title: 'Пользователи', role: 'user' },
]

let emojiIndex = new EmojiIndex(data);
let showEmojiPicker = ref(false);
// const emojiInde
const addEmoji = (emoji) => {
  message.value.text = (message.value.text || "") + emoji.native;
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};





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
      showEmojiPicker.value = false
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