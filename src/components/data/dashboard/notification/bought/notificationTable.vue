<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first md-max:text-[13px]">№</th>
            <th scope="col" class="th md-max:text-[13px]">Название</th>
            <th scope="col" class="th md-max:text-[13px]">Организатор</th>
            <th scope="col" class="th md-max:text-[13px]">Мероприятие</th>
            <th scope="col" class="th md-max:text-[13px]">Пакет</th>
            <th scope="col" class="th-last" width="150">Дата создание</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, itemIdx) in store.boughtNotif.data"
            :key="item?._id"
            :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first md-max:text-[13px]">
              {{ itemIdx + 1 }}
            </td>
            <td class="td md-max:text-[13px]">
              {{ item.title }}
            </td>
            <td class="td">{{ item?.creator?.lname }} {{ item?.creator?.name }}</td>
            <td class="td md-max:text-[13px] font-bold">
              {{ item?.event?.title }}
            </td>
            <td class="td md-max:text-[13px] font-bold">
              {{ item?.package?.title }}
            </td>
            <td class="td md-max:text-[13px]">
              <div class="flex items-start gap-2">
                {{ moment(item?.createdAt).format('DD.MM.YYYY HH:mm') }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
defineProps(['options', 'page', 'limit'])

import { notificationStore } from '@/stores/data/notification'
const store = notificationStore()

import { notifType } from '@/helpers/vars'
import moment from 'moment'
</script>
<style lang=""></style>
