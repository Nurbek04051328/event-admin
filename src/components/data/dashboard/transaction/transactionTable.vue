<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first md-max:text-[13px]">№</th>
            <th scope="col" class="th md-max:text-[13px]">Ф.И.О</th>
            <!-- <th scope="col" class="th">{{ $t('ticketPackage.table.text') }}</th> -->
            <th scope="col" class="th md-max:text-[13px]">Цены (сум)</th>
            <th scope="col" class="th md-max:text-[13px]">Транзакция</th>
            <th scope="col" class="th md-max:text-[13px]" width="150">Время</th>
          </tr>
        </thead>
        <tbody v-if="store.transactions.length > 0" class="bg-white">
          <tr
            v-for="(item, itemIdx) in store.transactions"
            :key="item._id"
            :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first md-max:text-[13px]">
              {{ (page - 1) * limit + itemIdx + 1 }}
            </td>
            <td class="td md-max:text-[13px]">{{ item?.user?.lname }} {{ item?.user?.name }}</td>
            <td class="td md-max:text-[13px] font-bold">{{ item?.amount?.toLocaleString() }} сум</td>
            <td class="">
              <span  :class="walletActions.find((a) => a.mode == item?.type)?.class"> {{ walletActions.find((a) => a.mode == item?.type)?.label }}</span>
            </td>
  
            <td class="td-last flex">{{ convertDate(item.createdAt, 'full') }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center text-gray-500 py-4">
              Нет данных
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { convertDate } from '@/helpers/func'

defineProps(['page', 'limit'])
import { walletActions } from '@/helpers/vars'
import { transactionStore } from '@/stores/data/transaction'

const store = transactionStore()


</script>
<style lang=""></style>
