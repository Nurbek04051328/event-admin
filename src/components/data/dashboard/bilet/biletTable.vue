<template>
  <div class="ring-1 w-full flex-1 ring-gray-300 sm:mx-0 rounded-[16px] h-[100%] overflow-hidden">
    <div class="h-[100%] overflow-auto">
      <table class="w-full divide-y divide-gray-300">
        <thead class="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th scope="col" class="th-first">№</th>
            <th scope="col" class="th">QR код</th>
            <th scope="col" class="th text-center">Номер билета</th>
            <th scope="col" class="th">Покупатель</th>
            <th scope="col" class="th">Мероприятие</th>
            <th scope="col" class="th">Организатор</th>
            <th scope="col" class="th">Цена</th>
            <th scope="col" class="th">Статус</th>
            <th scope="col" class="th" width="150">Дата</th>
          </tr>
        </thead>
        <tbody class="bg-white">
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
                    class="h-11 w-11 rounded-md cursor-pointer"
                    v-if="item?.qrCode"
                    :src="`${url}/${item?.qrCode}`"
                    alt="qr-code-image"
                    @click="openLightbox(item?.qrCode)"
                  />
                </div>
              </div>
            </td>
            <td class="td text-center">{{ item?.ticketNum}}</td>
            <td 
              class="td cursor-pointer"
              @click="$router.push({ name: 'user-wallet', params: { id: item?.user?._id } })"
            >
              {{ item?.user?.lname }} {{ item?.user?.name }}
            </td>
            <td 
              class="td cursor-pointer"
              @click="$router.push({ name: 'eventLogger', params: { id: item?.event?._id } })"
            >
              {{ item?.event?.title }}
            </td>
            <td 
              class="td cursor-pointer"
              @click="$router.push({ name: 'organizer-wallet', params: { id: item?.event?.organizer?._id } })"
            >
              {{ item?.event?.organizer?.lname }} {{ item?.event?.organizer?.name }}
            </td>
            <td class="td">{{ item?.entryFee == 0? 'Бесплатно' : `${item?.entryFee.toLocaleString()} сум` }} </td>
  
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
  </div>
  <VueEasyLightbox
    :visible="visible"
    :imgs="[currentImage]"
    @hide="closeLightbox"
  />
</template>
<script setup>
defineProps(['page', 'limit'])
import { ref } from 'vue';
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL
import { biletStore } from '@/stores/data/bilet'
const store = biletStore()
import VueEasyLightbox from 'vue-easy-lightbox';

// Lightbox holati
const visible = ref(false);
const currentImage = ref('');

// Lightboxni ochish funksiyasi
const openLightbox = (imageUrl) => {
  currentImage.value = `${url}/${imageUrl}`;
  visible.value = true;
};

// Lightboxni yopish funksiyasi
const closeLightbox = () => {
  visible.value = false;
  currentImage.value = '';
};

</script>
<style lang=""></style>
