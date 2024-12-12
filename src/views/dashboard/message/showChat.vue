<template>
  <!-- <pre>{{ chatMessages?.data }}</pre> -->
  <div
    :class="`flex items-start gap-2.5 ${auth_store.user.id == chat.sender._id ? 'flex-row-reverse' : ''}`"
    v-for="chat of chatMessages?.data"
    :key="chat"
    
  >
  
    <img
      class="w-8 h-8 rounded-full"
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt="Jese image"
    />
    <div
      :class="`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-bl-xl rounded-br-xl dark:bg-gray-900 ${auth_store.user.id == chat.sender._id ? 'rounded-tl-xl' : 'rounded-tr-xl'}`"
    >
      <div class="flex items-center space-x-2 rtl:space-x-reverse justify-between">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">
          {{ chat.sender?.lname }}
          {{ chat.sender?.name }}
        </span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ chat.createdAt }}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        {{ chat.text }}
      </p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick  } from 'vue'
import { storeToRefs } from 'pinia'
import { messageStore } from '@/stores/data/message'
const store = messageStore()
const { chatMessages } = storeToRefs(store)
import { useRoute } from 'vue-router';

import { authStore } from '@/stores/user/auth';
const auth_store = authStore()

const route = useRoute();
// Pagination
const page = ref(1)
const limit = ref(30)

const getData = async () => {
  console.log("aaaa");
  
  await store.getChatMessages(route.params.id,{ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await getData()
  nextTick(() => {
    const scrollContainer = document.querySelector('[ref="scrollToBottom"]');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  });
})
</script>
<style lang=""></style>
