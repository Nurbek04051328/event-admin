<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first md-max:text-[13px]">№</th>
            <th scope="col" class="th md-max:text-[13px]">Название</th>
            <th scope="col" class="th md-max:text-[13px]">Пакет</th>
            <th scope="col" class="th md-max:text-[13px]">Организатор</th>
            <th scope="col" class="th md-max:text-[13px]">Мероприятие</th>
            <th scope="col" class="th md-max:text-[13px]">Статус</th>
            <th scope="col" class="th-last" width="150">Дата создание</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, itemIdx) in store.boughtNotif.data"
            :key="item?._id"
            class="hover:bg-gray-100"
            :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first md-max:text-[13px]">
              {{ itemIdx + 1 }}
            </td>
            <td class="td md-max:text-[13px] cursor-pointer"
              @click="$router.push({ name: 'notifUserBought', params: { id: item?._id } })"
            >
              {{ item.title }}
            </td>
            <td class="td md-max:text-[13px] font-bold">
              {{ item?.package?.title }}
            </td>
            <td class="td">{{ item?.creator?.lname }} {{ item?.creator?.name }}</td>
            <td class="td md-max:text-[13px] font-bold">
              {{ item?.event?.title }}
            </td>
            <td class="td">
              <button
                @click="openStatusModal(item?._id)"
                :title="item?.status === 'denied' ? item?.desc : ''"
                :class="item?.status == 'approve'
                  ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-3 py-1 w-[80px]'
                  : item?.status == 'checking'
                    ? 'bg-[#FFECD9] text-[#FF7E00] rounded-lg px-3 py-1 w-[100px]'
                    : 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-3 py-1 w-[80px]'"
              >
                {{ item?.status == 'approve'
                  ? 'Актив'
                  : item?.status == 'checking'
                    ? 'В ожидание'
                    : 'Не актив' }}
              </button>
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
  <NotifBoughtStatusModal 
    :visible="showModal"
    :id="selectedId"
    @close="showModal = false"
    @saved="showModal = false"
  />
</template>
<script setup>
defineProps(['options', 'page', 'limit'])
import { ref } from 'vue'
import { notificationStore } from '@/stores/data/notification'
const store = notificationStore()
import NotifBoughtStatusModal from '@/components/data/dashboard/notification/bought/notificationStatusModal.vue'
import { notifType } from '@/helpers/vars'
import moment from 'moment'
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()


const showModal = ref(false)
const selectedId = ref(null)

const openStatusModal = (id) => {
  console.log("id", id);
  
  selectedId.value = id
  showModal.value = true
}


</script>
<style lang=""></style>
