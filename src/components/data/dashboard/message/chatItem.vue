<template>
  <img
    v-if="chat?.sender?.cover?.length > 0"
    class="w-8 h-8 rounded-full"
    :src="`${url}/${chat?.sender?.cover[0]}`"
  />
  <div
    v-else
    class="h-8 w-8 flex-none rounded-full flex items-center justify-center"
    :style="{ backgroundColor: randomColor(chat?.sender?.name) }"
  >
    {{ chat?.sender?.name?.charAt(0).toUpperCase() }}
  </div>
  <div :class="`flex flex-col w-full max-w-[320px] leading-1.5 gap-1`">
    <div class="flex items-center space-x-2 rtl:space-x-reverse justify-between">
      <span class="text-base font-semibold text-gray-900">
        {{ chat?.sender?.lname }}
        {{ chat?.sender?.name }}
        {{ chat?.sender?.role== 'moderator'? '(moderator)' :  chat?.sender?.role== 'admin'? '(admin)':''}}
      </span>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{
        convertDateShort(chat?.createdAt, 'full')
      }}</span>
    </div>
    <p
      :class="`p-4  text-wrap  break-words whitespace-normal rounded-bl-xl rounded-br-xl dark:bg-gray-900 text-sm font-normal py-2.5 text-gray-700 dark:text-white ${auth_store.user?.id == chat?.sender._id ? 'rounded-tl-xl' : 'rounded-tr-xl'}`"
      v-if="chat.text"
      v-html="chat?.text.replace(/\n/g, '<br>')"
    ></p>
    <span
      v-if="auth_store.user.id === chat.sender._id"
      class="text-sm font-normal text-gray-500 dark:text-gray-400 flex items-center space-x-1 relative"
    >
      <CheckIcon v-bind:class="chat.viewed ? 'text-green-500' : 'text-gray-500'" class="w-4 h-4" />
      <CheckIcon v-if="chat.viewed" class="w-4 h-4 text-green-500 absolute left-1 top-0" />
    </span>
  </div>
</template>
<script setup>
defineProps(['chat'])
const url = import.meta.env.VITE_URL
import { CheckIcon } from '@heroicons/vue/20/solid'
import { convertDateShort } from '@/helpers/func'

import { authStore } from '@/stores/user/auth'
const auth_store = authStore()

const randomColor = (name) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#C70039', '#581845', '#2ECC71']
  const index = name?.charCodeAt(0) % colors?.length
  return colors[index]
}
</script>
<style lang=""></style>
