<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle sm:hidden">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first">№</th>
            <th scope="col" class="th">Ф.И.О</th>
            <th scope="col" class="th text-center">Статус</th>
            <th scope="col" class="th text-center">Просмотр</th>
            <th scope="col" class="th text-center">Время регистрации</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(person, index) in store.boughtUsersNotif?.data"
            :key="person._id"
            class="cursor-pointer hover:bg-gray-100"
            @click="$router.push({ name: 'user-wallet', params: { id: person._id } })"
            :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first">
              {{ (page - 1) * limit + index + 1 }}
            </td>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
              <div class="flex flex-col">
                <div class="font-medium text-gray-900">{{ person?.user?.lname }} {{ person?.user?.name }}</div>
                <!-- <div class="mt-1 text-[13px] text-gray-500">{{ person.phone }}</div> -->
              </div>
            </td>
            <td class="td text-center">
              <span class="danger-tag" v-if="person?.sendStatus == 2">Ошибка</span>
              <span class="success-tag" v-if="person?.sendStatus == 1">Отправлено</span>
              <span class="warning-tag" v-if="person?.sendStatus == 0">Не отправлено</span>
            </td>
            <td class="td text-center">
              <span class="primary-tag" v-if="person?.viewed"><EyeIcon class="size-4" /></span>
              <span class="primary-tag" v-else><EyeSlashIcon class="size-4" /></span>
            </td>
            <td class="td text-center">
              <div>
                <div class="font-medium text-black">{{ convertDateShort(person?.createdAt, 'full') }}</div>
                <div class="mt-1 text-[13px] text-gray-500">{{ person.lastVisit ? convertDateShort(person?.lastVisit, 'full') : '-' }}</div>
              </div>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
defineProps(['page', 'limit'])
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL

import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

import { notificationStore } from '@/stores/data/notification'
const store = notificationStore()




</script>
<style lang=""></style>