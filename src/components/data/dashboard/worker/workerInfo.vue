<template>
  <div class="p-4 2xl:p-2 ">
    <div class="space-y-1 divide-y">
      <div class="py-2">
        <div class="text-xs text-[#B6A3D0] 2xl:text-[12px]">Ф.И.О</div>
        <div class="text-base font-medium text-[#483D5B] 2xl:text-[14px]">
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
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Доступы</div>
        <div class="grid grid-cols-2 gap-4 mt-3">
          <!-- Organizer Section -->
          <div v-if="user?.access?.organizer.length>0">
            <div class="text-base font-semibold mb-2">Организаторы:</div>
            <ul class="text-[14px] space-y-1">
              <li v-for="item in accessOptions.organizer" :key="item.value" class="flex items-center">
                <component 
                  :is="user?.access?.organizer.includes(item.value) ? CheckIcon : XMarkIcon" class="h-5 w-5 mr-2" aria-hidden="true" 
                  :class="user?.access?.organizer.includes(item.value) ? 'text-[#119A21]' : 'text-[#FF5558]'" />
                <span :class="user?.access?.organizer.includes(item.value) ? 'text-gray-600 font-medium' : 'text-gray-500'">
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </div>
          <!-- User Section -->
          <div v-if="user?.access?.user.length>0">
            <div class="text-base font-semibold mb-2">Пользователи:</div>
            <ul class="text-[14px] space-y-1">
              <li v-for="item in accessOptions.user" :key="item.value" class="flex items-center">
                <component 
                  :is="user?.access?.user.includes(item.value) ? CheckIcon : XMarkIcon" class="h-5 w-5 mr-2" aria-hidden="true" 
                  :class="user?.access?.user.includes(item.value) ? 'text-[#119A21]' : 'text-[#FF5558]'" />
                <span :class="user?.access?.user.includes(item.value) ? 'text-gray-600 font-medium' : 'text-gray-500'">
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </div>
          <div v-if="user?.access?.event.length>0">
            <div class="text-base font-semibold mb-2">Пользователи:</div>
            <ul class="text-[14px] space-y-1">
              <li v-for="item in accessOptions.event" :key="item.value" class="flex items-center">
                <component 
                  :is="user?.access?.event.includes(item.value) ? CheckIcon : XMarkIcon" class="h-5 w-5 mr-2" aria-hidden="true" 
                  :class="user?.access?.event.includes(item.value) ? 'text-[#119A21]' : 'text-[#FF5558]'" />
                <span :class="user?.access?.event.includes(item.value) ? 'text-gray-600 font-medium' : 'text-gray-500'">
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { convertDateShort } from '@/helpers/func'
// Icon import
import {
    CheckIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
defineProps(['user'])


const accessOptions = {
  organizer: [
    { value: 'show', label: 'Просмотр' },
    { value: 'status', label: 'Менять статус' },
    { value: 'metric', label: 'Персональные данные' },
    { value: 'chat', label: 'Чат' },
  ],
  user: [
    { value: 'show', label: 'Просмотр' },
    { value: 'status', label: 'Менять статус' },
    { value: 'metric', label: 'Персональные данные' },
    { value: 'chat', label: 'Чат' },
  ],
  event: [
    { value: 'show', label: 'Просмотр' },
    { value: 'status', label: 'Менять статус' },
  ],
}

</script>
<style lang=""></style>