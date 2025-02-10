<template>
  <div class=" p-4 2xl:p-2">
    <img
    v-if="user?.face?.length > 0"
      :src="`${url}/${user?.face?.at(0)}`"
      alt=""
      class="w-full mt-4 max-w-80 m-auto rounded-[26px] block aspect-square object-cover 2xl:w-72 md-max:w-64 xm-max:w-56"
    />
    <img 
      v-else 
      class="max-w-80 mt-4 m-auto rounded-[26px] block aspect-square object-cover w-72 md-max:w-64" 
      src="@/assets/logo/logo.png" alt=""/>
    <div class="space-y-1 divide-y mt-1 px-4">
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Ф.И.О</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.lname }}
          {{ user?.name }}
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Имя пользователя</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.nickName }}
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Номер телефон</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.phone }}
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Дата регистрации</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ convertDateShort(user?.createdAt, 'full') }}
        </div>
      </div>
      <div class="flex">
        <div class="py-2 flex-1 text-center">
          <div class="text-xs text-gray-500 2xl:text-[12px]">Подписчики</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ follow?.followers || 0 }}
          </div>
        </div>
        <div class="py-2 flex-1 text-center ">
          <div class="text-xs text-gray-500 2xl:text-[12px]">Подписан</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ follow?.followings || 0 }}
          </div>
        </div>
        <div class="py-2 flex-1 text-center ">
          <div class="text-xs text-gray-500 2xl:text-[12px]">Посты</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ follow?.posts || 0 }}
          </div>
        </div>
      </div>
      <div class="py-2 space-y-1">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Паспорт файлы</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          <button
            @click="download(pass)"
            v-for="(pass, index) of user?.passport"
            :key="index"
            class="add-btn mr-2"
          >
            <DocumentIcon class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { convertDateShort } from '@/helpers/func'
import { DocumentIcon } from '@heroicons/vue/20/solid'
const url = import.meta.env.VITE_URL
defineProps(['user', 'follow'])

import { download } from '@/helpers/func'
</script>
<style lang=""></style>
