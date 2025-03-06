<template>
  <div class="ring-1 w-full flex-1 rounded-[16px] ring-gray-300  overflow-auto">
    <table class="w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first">№</th>
          <th scope="col" class="th">Код</th>
          <th scope="col" class="th">Номер телефона</th>
          <th scope="col" class="th">Сервис</th>
          <th scope="col" class="th">Действия</th>
          <th scope="col" class="th">Статус</th>
          <th scope="col" class="th" width="150">Дата</th>
        </tr>
      </thead>
      <tbody class="bg-white overflow-auto">
        <tr
          v-for="(item, itemIdx) in store.activation.data"
          :key="item._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td class="td">{{ item?.key || '-' }}</td>
          <td class="td">{{ item?.email || item?.phone || '-' }}</td>
          <td class="td">{{ item?.service }}</td>
          <td class="td">{{ reasons[item?.reason] }}</td>

          <td class="td">
            <span class="text-green-600" v-if="item.activated">Активировано</span>
            <span class="text-ember-600" v-else>Не активировано</span>
          </td>
          <td class="td-last">{{ convertDateShort(item?.createdAt, 'full') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { convertDateShort } from '@/helpers/func'
import { reasons } from '@/helpers/vars'
defineProps(['page', 'limit'])
import { activationStore } from '@/stores/data/activation'
const store = activationStore()
</script>
<style lang=""></style>
