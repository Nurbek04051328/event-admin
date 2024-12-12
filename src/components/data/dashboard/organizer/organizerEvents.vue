<template>
  <div class="flex-1 flex flex-col overflow-auto h-[100%]">
    <div class="text-base font-medium border-b border-gray-200 mb-3 pb-2 flex justify-between items-center">
      <span>Список мероприятие</span>
      <span class="text-sm">Количество: {{ list.count }}</span>
    </div>
    <div class="flex-1 flex flex-col overflow-auto h-[100%]">
      <div v-if="list?.events?.length > 0" class="space-y-2 flex-1 ">
        <div
          v-for="item in list?.events"
          :key="item._id"
          class="group text-sm relative grid grid-cols-6 rounded-lg border border-gray-200 bg-white md-max:flex md-max:flex-col "
        >
          <div 
            class="bg-gray-200 sm:aspect-none group-hover:opacity-75 xl:col-span-2 md-max:bg-white md-max:flex md-max:justify-center md-max:pt-1">
            <router-link :to="{ name: 'eventDetail', params: { id: item._id } }">
              <img
                :src="`${url}/${item?.cover?.at(0)}`"
                class="object-cover object-center w-full aspect-square md-max:w-auto md-max:h-[150px]"
              />
            </router-link>
          </div>
          <div class="col-span-5 flex flex-col gap-2 p-4 xl:col-span-4 ">
            <div class="flex">
              <h3 class="text-sm flex-1 text-gray-900 font-bold xm-max:text-[13px]">
                <router-link :to="{ name: 'eventDetail', params: { id: item._id } }">
                  {{ item.title }}
                </router-link>
              </h3>
              <div class="space-x-2">
                <a
                  :href="`https://www.google.com/maps?q=${item.location?.latitude},${
                    item.location?.longitude
                  }`"
                  target="_blank"
                  class="text-xs underline text-blue-400"
                  >В карте</a
                >
                <span class="warning-tag xm-max:text-[11px]" v-if="item.status == 0">Не проверено</span>
                <span class="success-tag xm-max:text-[11px]" v-if="item.status == 1">Одобрено</span>
                <span class="danger-tag xm-max:text-[11px]" v-if="item.status == 2">Отказано</span>
              </div>
            </div>
            <div class="flex flex-wrap items-end w-full gap-4 2xl:grid 2xl:grid-cols-12">
              <div class="2xl:col-span-4 md-max:col-span-6">
                <div class="text-xs ">Категория</div>
                <div class="space-x-2 font-bold text-sm xm-max:text-[13px]">
                  <span v-for="cat of item.categories" :key="cat._id">
                    {{ cat.title }}
                  </span>
                </div>
              </div>
              <div class="2xl:col-span-4 md-max:col-span-6">
                <div class="text-xs">Подкатегория</div>
                <div class="space-x-2 font-bold text-sm xm-max:text-[13px]">
                  <span v-for="cat of item.subcategories" :key="cat._id">
                    {{ cat.title }}
                  </span>
                </div>
              </div>
              <div class="2xl:col-span-4 md-max:col-span-12">
                <div class="text-xs">Тип пакет</div>
                <div class="space-x-2 font-bold text-sm xm-max:text-[13px]">
                  {{ item.ticketPackage?.title }} / {{ item.ticketPackage?.quantity }} /
                  {{ item.ticketPackage?.comissionRate || 0 }} %
                </div>
              </div>
              <div class="ml-auto 2xl:col-span-6 2xl:text-center 2xl:m-auto">
                <div class="text-xs">Стат.билетов</div>
                <div class="space-x-2 font-bold text-sm flex">
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      В обработке
                    </div>
                    <span class="warning-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketPending }}
                    </span>
                  </div>
  
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Куплен
                    </div>
                    <span class="success-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketPurchase }}
                    </span>
                  </div>
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                    Использован
                    </div>
                    <span class="primary-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketUsed }}
                    </span>
                  </div>
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Отказан
                    </div>
                    <span class="danger-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketDenied }}
                    </span>
                  </div>
                  
                </div>
              </div>
              <div class="2xl:col-span-6 2xl:text-center 2xl:m-auto">
                <div class="text-xs">Стат. возвратов</div>
                <div class="space-x-2 font-bold text-sm flex">
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Средства успешно возвращены
                    </div>
                    <span class="primary-tag xm-max:text-[11px]">
                      {{ item.counts?.refoundTrue }}
                    </span>
                  </div>
  
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Средства в обработке
                    </div>
                    <span class="warning-tag xm-max:text-[11px]">
                      {{ item.counts?.refoundFalse }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <p class="text-sm text-gray-500">{{ product.description }}</p> -->
            <div class="flex gap-4 mt-auto xl:grid xl:grid-cols-6">
              <div v-if="item.entryFee > 0" class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-3">
                <BanknotesIcon class="size-4" />
                {{ item.entryFee?.toLocaleString() || 'Bepul' }} сум
              </div>
              <div v-else class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-3 xm-max:text-[13px]">
                <BanknotesIcon class="size-4" />
                Бесплатно
              </div>
              <div
                v-if="item.location?.address"
                class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-3 xl:text-[12px]"
              >
                <MapIcon class="size-4" />
                {{ item.location?.address }}
              </div>
              <div v-if="item.when" class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-2 md-max:col-span-4 xm-max:text-[13px]">
                <CalendarDaysIcon class="size-4" />
                {{ convertDateShort(item.when) }}
              </div>
  
              <div class="flex gap-2 ml-auto xl:col-span-4">
                <organizerSettings :item="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="space-y-2 flex-1 ">
        <div class="text-center mt-14"> 
          Пока нет мероприятие
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { BanknotesIcon, CalendarDaysIcon, MapIcon } from '@heroicons/vue/20/solid'
defineProps(['list'])
const url = import.meta.env.VITE_URL
import organizerSettings from './organizerSettings.vue'
import { convertDateShort } from '@/helpers/func'
</script>
<style lang=""></style>
