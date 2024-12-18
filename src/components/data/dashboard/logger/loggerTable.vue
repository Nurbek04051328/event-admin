<template>
  <div class="ring-1 w-full flex-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">
    <table class="w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first">№</th>
          <th scope="col" class="th">Ф И О</th>
          <th scope="col" class="th">Роль</th>
          <th scope="col" class="th" width="150">Вход</th>
        </tr>
      </thead>
      <tbody class="bg-white overflow-auto">
        <tr
          v-for="(item, itemIdx) in store.routeLoggers?.data"
          :key="item?._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td class="td">{{ item?.user?.lname}} {{ item?.user?.name}}</td>
          <td class="td">{{ item?.role }}</td>
          <td class="td-last">{{ convertDateShort(item?.createdAt, 'full') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { convertDateShort } from '@/helpers/func'
defineProps(['page', 'limit'])
import { loggerStore } from '@/stores/user/logger'
const store = loggerStore()
</script>
<style lang=""></style>
