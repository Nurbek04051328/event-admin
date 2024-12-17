<template>
  <div class="flex items-center pb-1 border-b border-gray-200">
    <div class="mr-2">
      <img
        v-if="selectChatRoom?.cover?.length > 0"
        class="w-8 h-8 rounded-full"
        :src="`${url}/${selectChatRoom?.cover[0]}`"
        alt="Jese image"
      />
      <div
        v-else
        class="h-8 w-8 flex-none rounded-full flex items-center justify-center text-white"
        :style="{ backgroundColor: randomColor(selectChatRoom?.userName) }"
      >
        {{ selectChatRoom?.userName?.charAt(0).toUpperCase() }}
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div>{{ selectChatRoom?.userName }}</div>
      <div class="text-sm">
        {{
          selectChatRoom?.participants?.find((participant) => participant.role === 'organizer')
            ? 'Организатор'
            : selectChatRoom?.participants?.find((participant) => participant.role === 'user')
              ? 'Пользовател'
              : selectChatRoom?.participants?.find(
                    (participant) => participant.role === 'moderator'
                  )
                ? 'Модератор'
                : 'Неизвестно'
        }}
      </div>
    </div>
    <!-- {{ selectChatRoom?.participants }} -->
  </div>
  <div
    v-if="chatMessages?.data?.length > 0"
    ref="scrollToBottom"
    class="overflow-auto space-y-3"
    @scroll="handleScroll"
  >
    <div
      :class="`flex items-start gap-2.5 ${auth_store.user?.id == chat?.sender._id ? 'flex-row-reverse' : ''}`"
      v-for="chat of chatMessages?.data"
      :key="chat"
    >
      <ChatItem :chat="chat" />
    </div>
  </div>
  <div v-else class="text-center flex items-center justify-center">
    <span>Пока чат нет</span>
  </div>
</template>
<script setup>
const url = import.meta.env.VITE_URL
import { onMounted, ref, watch } from 'vue'

import { storeToRefs } from 'pinia'

import { messageStore } from '@/stores/data/message'
const store = messageStore()
const { chatMessages, selectChatRoom } = storeToRefs(store)
import { useRoute } from 'vue-router'

import { authStore } from '@/stores/user/auth'
import ChatItem from '@/components/data/dashboard/message/chatItem.vue'
const auth_store = authStore()
const scrollToBottom = ref()
const route = useRoute()
// Pagination
const page = ref(1)
const limit = ref(20)

watch(chatMessages.value, () => {
  scrollToDown()
})

// Scrolni pastga tushirish
const scrollToDown = () => {
  setTimeout(() => {
    scrollToBottom.value?.lastElementChild?.scrollIntoView({
      behavior: 'smooth'
    })
  }, 100)
}

// Scrol tepaga borganda malumot olish
const handleScroll = async () => {
  const scrollContainer = scrollToBottom.value
  if (scrollContainer.scrollTop === 0) {
    page.value += 1
    await getData()
  }
  // if (
  //   scrollContainer.scrollTop + scrollContainer.clientHeight >=
  //   scrollContainer.scrollHeight
  // ) {
  //   if (page.value > 0) {
  //     page.value -= 1;
  //     await getData();
  //   }
  // }
}

const getData = async () => {
  await store.getChatMessages(route.params.id, { limit: limit.value, page: page.value })
  scrollToDown()
}

const randomColor = (name) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#C70039', '#581845', '#2ECC71']
  const index = name?.charCodeAt(0) % colors?.length
  return colors[index]
}

watch(
  () => route.params.id,
  async () => {
    await store.selectChat(route.params.id)
    await getData()
  }
)

onMounted(async () => {
  await getData()
})
</script>
<style lang=""></style>
