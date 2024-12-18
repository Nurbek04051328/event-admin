<template>
  <div class="border border-gray-300 rounded-lg p-4 2xl:p-2 ">
    <div class="space-y-1 divide-y">
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Ф.И.О</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.lname }}
          {{ user?.name }}
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Логин</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.login }}
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Роль</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.login }}
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Номер телефон</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ user?.phone }}
        </div>
      </div>
      <div class="py-2" v-if="user?.categories?.length > 0">
        <div class="text-xs text-gray-500 2xl:text-[12px]"> Категория</div>
        <div class="mt-2 flex gap-2">
          <div class="text-base font-medium text-gray-800" v-for="e in user?.categories" :key="e._id">
            <div 
              class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset text-blue-700 ring-blue-700/10' 2xl:text-[12px]"
            >
              {{ e.title }}
          </div>
        </div>
        </div>
      </div>
      <div class="py-2" v-if="user?.subcategories?.length > 0">
        <div class="text-xs text-gray-500 2xl:text-[12px]"> Подкатегория</div>
        <div class="mt-2 flex gap-2">
          <div class="text-base font-medium text-gray-800" v-for="e in user?.subcategoriescategories" :key="e._id">
            <div 
              class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset text-blue-700 ring-blue-700/10' 2xl:text-[12px]"
            >
              {{ e.title }}
          </div>
        </div>
        </div>
      </div>
      <div class="py-2 flex justify-between">
        <div>
          <div class="text-xs text-gray-500 2xl:text-[12px]">Кол-во Организеер</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ user?.checkedOrganizers }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-500 2xl:text-[12px]">Кол-во Мероприятие</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ user?.checkedEvent }}
          </div>
        </div>
      </div>
      <div class="py-2 flex justify-between">
        <div>
          <div class="text-xs text-gray-500 2xl:text-[12px]">Кол-во Собщение</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ user?.messages }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-500 2xl:text-[12px]">Последный вход</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ user?.lastVisit? convertDateShort(user?.lastVisit, 'full') : '-' }}
          </div>
        </div>
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Дата регистрации</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
          {{ convertDateShort(user?.createdAt, 'full') }}
        </div>
      </div>
      <!-- <div class="flex">
        <div class="py-2 flex-1 text-center">
          <div class="text-xs text-gray-500 2xl:text-[12px]">Подписчики</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ follow?.followers || 0 }}
          </div>
        </div>
        <div class="py-2 flex-1 text-center">
          <div class="text-xs text-gray-500 2xl:text-[12px]">Подписан</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ follow?.followings || 0 }}
          </div>
        </div>
        <div class="py-2 flex-1 text-center">
          <div class="text-xs text-gray-500 2xl:text-[12px]">Посты</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[14px]">
            {{ follow?.posts || 0 }}
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { convertDateShort } from '@/helpers/func'

defineProps(['user'])

</script>
<style lang=""></style>