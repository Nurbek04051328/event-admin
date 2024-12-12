<template>
  <div class="ring-1 w-full flex-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">
    <table class="w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first">№</th>
          <th scope="col" class="th">QR код</th>
          <th scope="col" class="th">Номер билета</th>
          <th scope="col" class="th">Покупатель</th>
          <th scope="col" class="th">Мероприятие</th>
          <th scope="col" class="th">Организатор</th>
          <th scope="col" class="th">Цена</th>
          <th scope="col" class="th">Статус</th>
          <th scope="col" class="th" width="150">Дата</th>
        </tr>
      </thead>
      <tbody class="bg-white overflow-auto">
        <tr
          v-for="(item, itemIdx) in store.bilets?.data"
          :key="item?._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td class="td">
            <div class="flex items-center">
              <div class="h-11 w-11 flex-shrink-0">
                <img
                  class="h-11 w-11 rounded-md"
                  v-if="item?.qrCode"
                  :src="`${url}/${item?.qrCode}`"
                  alt=""
                />
              </div>
            </div>
          </td>
          <td class="td">{{ item?.ticketNum}}</td>
          <td class="td">{{ item?.user?.lname }} {{ item?.user?.name }}</td>
          <td class="td">{{ item?.event?.title }}</td>
          <td class="td">{{ item?.event?.organizer?.lname }} {{ item?.event?.organizer?.name }}</td>
          <td class="td">{{ item?.entryFee }} сум</td>

          <td class="td">
            <span class="text-blue-600" v-if="item?.status==0">В процессе</span>
            <span class="text-green-600" v-if="item?.status==1">Куплено</span>
            <span class="text-red-600" v-if="item?.status==2">Отказ</span>
            <span class="text-primary-600" v-if="item?.status==3">Использовано</span>
          </td>
          <td class="td-last">{{ convertDateShort(item?.createdAt, 'full') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { convertDateShort } from '@/helpers/func'
defineProps(['page', 'limit'])
const url = import.meta.env.VITE_URL
import { biletStore } from '@/stores/data/bilet'
const store = biletStore()
</script>
<style lang=""></style>
