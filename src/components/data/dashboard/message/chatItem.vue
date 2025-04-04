<template>
  <div class="px-4 flex items-center gap-2">
    <div
      v-if="auth_store.user?.id !== chat?.sender._id"
      class="flex items-center justify-center rounded-full w-10 h-10 bg-[#F5F0FF]"
    >
      <img class="w-6 h-6" src="@/assets/images/header-user.svg" alt="" />
    </div>
    <div :class="`flex flex-col max-w-[550px] leading-1.5 gap-1`">
      <div
        class="flex items-center space-x-2 justify-between"
        v-if="auth_store.user?.id !== chat?.sender._id"
      >
        <span class="text-base font-semibold text-gray-900">
          {{ chat?.sender?.lname }}
          {{ chat?.sender?.name }}
          {{
            chat?.sender?.role == 'moderator'
              ? '(moderator)'
              : chat?.sender?.role == 'admin'
                ? '(admin)'
                : ''
          }}
        </span>
      </div>
      <div
        :class="`${auth_store.user?.id == chat?.sender._id ? 'rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] bg-[#9E55EC] text-white' : 'rounded-tr-[20px] rounded-br-[20px] rounded-tl-[20px] bg-[#F5F0FF] text-[#4C435C]'}`"
      >
        <p
          :class="`p-4 text-wrap break-words whitespace-normal text-[16px] font-medium`"
          v-if="chat.text"
        >
          {{ chat?.text.replace(/\n/g, '<br />') }}
        </p>
      </div>
      <div class="flex justify-between items-center px-6 pb-2">
        <span
          v-if="auth_store.user.id === chat.sender._id"
          class="text-sm font-normal text-gray-500 dark:text-gray-400 flex items-center space-x-1 relative"
        >
          <CheckIcon
            v-bind:class="chat.viewed ? 'text-green-500' : 'text-gray-500'"
            class="w-4 h-4"
          />
          <CheckIcon v-if="chat.viewed" class="w-4 h-4 text-green-500 absolute left-1 top-0" />
        </span>
        <div class="flex justify-end ml-auto">
          <span class="text-sm font-normal text-gray-500">
            {{ convertDateShort(chat?.createdAt, 'full') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps(['chat'])

import { CheckIcon } from '@heroicons/vue/20/solid'
import { convertDateShort } from '@/helpers/func'

import { authStore } from '@/stores/user/auth'
const auth_store = authStore()
</script>
<style lang=""></style>
