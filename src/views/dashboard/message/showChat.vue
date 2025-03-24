<template>
  <div class="flex items-center border-b border-gray-200 px-4 pb-3">
    <div class="mr-2">
      <div class="flex items-center justify-center rounded-full w-10 h-10 bg-[#F5F0FF]">
        <img class="w-6 h-6" src="@/assets/images/header-user.svg" alt="">
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div class="text-[#483D5B] text-[20px] font-semibold">{{ selectChatRoom?.userName }}</div>
      <div class="text-base font-medium text-gray-400">
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
  </div>

  <div
    v-if="mergedMessages.length > 0"
    ref="scrollToBottom"
    class="overflow-auto space-y-3 relative"
    @scroll="handleScroll"
  >
    <div v-if="isLoading" class="text-center py-2">
      <span>Loading...</span>
    </div>
    <div
      :class="`flex items-start mr-2 pt-4 gap-2.5 ${auth_store.user?.id == chat?.sender._id ? 'flex-row-reverse' : ''}`"
      v-for="chat of mergedMessages"
      :key="chat._id"
    >
      <ChatItem :chat="chat" />
    </div>
  </div>
  <div v-else class="text-center flex items-center justify-center">
    <span>Пока чат нет</span>
  </div>
</template>

<script setup>
// Vue core imports
import { 
  ref, 
  onMounted, 
  onUnmounted, 
  watch, 
  nextTick,
  computed 
} from 'vue'

// Vue Router
import { useRoute } from 'vue-router'

// Pinia imports
import { storeToRefs } from 'pinia'
import { messageStore } from '@/stores/data/message'
import { authStore } from '@/stores/user/auth'

// Components
import ChatItem from '@/components/data/dashboard/message/chatItem.vue'



// Store initialization
const store = messageStore()
const auth_store = authStore()
const route = useRoute()

// Store refs
const { chatMessages, selectChatRoom } = storeToRefs(store)

// Component refs
const scrollToBottom = ref(null)
const limit = ref(20)
const page = ref(1)
const previousScrollHeight = ref(0)
const isFetching = ref(false)
const isInitialLoad = ref(true)
const isLoading = ref(false)
const allMessages = ref([])

// Computed property for merged messages
const mergedMessages = computed(() => {
  return allMessages.value.slice().sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
})

// Scroll to bottom function with proper timing
const scrollToDown = (behavior = 'smooth') => {
  if (!scrollToBottom.value?.lastElementChild) return
  
  setTimeout(() => {
    if (scrollToBottom.value?.lastElementChild) {
      scrollToBottom.value.lastElementChild.scrollIntoView({
        behavior,
        block: 'end'
      })
    }
  }, 100)
}

// Merge new messages with existing ones
const mergeMessages = (newMessages) => {
  const messageMap = new Map()
  
  // Add existing messages to map
  allMessages.value.forEach(msg => {
    messageMap.set(msg._id, msg)
  })
  
  // Add or update new messages
  newMessages.forEach(msg => {
    if (!messageMap.has(msg._id)) {
      messageMap.set(msg._id, msg)
    }
  })
  
  // Convert map back to array
  allMessages.value = Array.from(messageMap.values())
}

// Enhanced getData function with proper scroll position handling
const getData = async (changePage = false, isScrollingDownwards = false) => {
  if (isFetching.value) return
  
  isFetching.value = true
  isLoading.value = true

  try {
    if (changePage) {
      console.log("changepage", changePage, isScrollingDownwards);
      
      if (isScrollingDownwards && page.value > 1) {
        page.value -= 1
      } else if (!isScrollingDownwards) {
        previousScrollHeight.value = scrollToBottom.value?.scrollHeight || 0
        page.value += 1
      }
    }

    console.log(page.value, limit.value);
    
    const response = await store.getChatMessages(route.params.id, { 
      limit: limit.value, 
      page: page.value 
    })

    // Merge new messages with existing ones
    if (response?.data) {
      if (isInitialLoad.value) {
        allMessages.value = response.data
      } else {
        mergeMessages(response.data)
      }
    }

    // Wait for DOM update
    await nextTick()

    // Handle scroll position after data load
    if (isInitialLoad.value) {
      isInitialLoad.value = false
      scrollToDown('smooth')
    } else if (changePage && !isScrollingDownwards && scrollToBottom.value) {
      const newScrollHeight = scrollToBottom.value.scrollHeight || 0
      const scrollPosition = newScrollHeight - previousScrollHeight.value
      if (scrollPosition > 0) {
        scrollToBottom.value.scrollTop = scrollPosition
      }
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
  } finally {
    isFetching.value = false
    isLoading.value = false
  }
}

// Enhanced scroll handler with debouncing
let scrollTimeout = null
const handleScroll = () => {
  if (scrollTimeout || isFetching.value) return
  
  scrollTimeout = setTimeout(async () => {
    const container = scrollToBottom.value
    if (!container) return

    const isAtTop = container.scrollTop <= 10
    const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 20

    if (isAtTop) {
      await getData(true, false)
    } else if (isNearBottom && page.value > 1) {
      await getData(true, true)
    }
    
    scrollTimeout = null
  }, 200)
}

// Watch for new messages to be added
watch(() => chatMessages.value?.data, (newMessages) => {
  if (newMessages && newMessages.length > 0) {
    mergeMessages(newMessages)
    if (isInitialLoad.value) {
      scrollToDown('auto')
    }
    scrollToDown('smooth')
  }
}, { deep: true })

// Watch for route changes
watch(() => route.params.id, async (newId, oldId) => {
  if (newId === oldId) return
  
  isInitialLoad.value = true
  limit.value = 20
  page.value = 1
  allMessages.value = []
  
  await store.selectChat(newId)
  await getData()
}, { immediate: true })

// Helper function for avatar colors
const randomColor = (name) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#C70039', '#581845', '#2ECC71']
  const index = name?.charCodeAt(0) % colors?.length
  return colors[index]
}

// Clean up on unmount
onUnmounted(() => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})

// Initial load
onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.overflow-auto {
  max-height: calc(100vh - 200px);
  min-height: 300px;
}

</style>





























<!-- <template>
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


const handleScroll = async () => {
  const scrollContainer = scrollToBottom.value
  if (scrollContainer.scrollTop === 0) {
    page.value += 1
    await getData()
  }

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
<style lang=""></style> -->
