<template>
  <div class="flex-1 flex flex-col overflow-auto h-[100%]">
    <div class="text-base text-[#483D5B] font-medium border-b border-gray-200 mb-3 py-2 flex justify-between items-center pr-6 pl-4">
      <span>Список мероприятие</span>
      <span class="text-sm">Количество: {{ list.count }}</span>
    </div>
    <div class="flex-1 flex flex-col overflow-auto h-[100%] px-3">
      <div v-if="list?.events?.length > 0" class="space-y-2 flex-1">
        <div
          v-for="item in list?.events"
          :key="item._id"
          class="group text-sm flex-start relative rounded-lg border border-gray-200 p-2"
        >
        <!-- top -->
          <div class="w-full grid grid-cols-6 gap-4">
            <div 
              class="h-full flex float-start items-center sm:aspect-none  col-span-2 md-max:bg-white md-max:flex md-max:justify-center md-max:pt-1">
              <router-link :to="{ name: 'eventDetail', params: { id: item._id } }">
                <img
                  :src="`${url}/${item?.cover?.at(0)}`"
                  class="object-cover object-center w-full rounded-lg"
                />
              </router-link>
            </div>
            <div class="w-full col-span-4">
              <router-link :to="{ name: 'eventDetail', params: { id: item._id } }" class="flex justify-between items-center">
                <div class="text-[#483D5B] text-[16px] font-semibold">{{ item.title }}</div>
                <!-- <div>
                  <ChevronRightIcon class="w-[20px] h-[20px] text-[#645A77]"/>
                </div> -->
              </router-link>
              <div class="flex items-center gap-[3px] mt-[20px] mb-[5px]">
                <MapPinIcon class="w-[20px] h-[20px] text-[#645A77]"/>
                <a
                  :href="`https://www.google.com/maps?q=${item.location?.latitude},${
                    item.location?.longitude
                  }`"
                  target="_blank"
                  class="text-[14px] text-[#483D5B] flex hover:text-black"
                  > {{ item.location?.address }}
                  <img src="@/assets/images/mapicon.svg" alt="map icon" class="ml-[2px]">
                </a>
              </div>
              <div class="text-[14px] text-[#483D5B] flex gap-[3px]">
                <CalendarDaysIcon class="w-[20px] h-[20px] text-[#645A77]"/>
                {{ convertDateShort(item.eventDates[0].date) }}
              </div>
              <div class="mt-[10px] text-[14px] text-[#483D5B] flex justify-between border-b border-[#ECEBEF] pb-[17px]">
                <div>
                  <span class="bg-[#F5F1FB] text-[#9E55EC] rounded-[10px] p-[3px] mr-[6px]">Тип пакета</span>
                  {{ item.ticketPackage?.title}}
                </div>
                <div class="text-[#322B3F] text-[18px] font-bold">{{ item.entryFee?.toLocaleString() || 0 }} сум</div>
              </div>
              <div class="flex justify-between">
                <div>
                  Разрешения
                  <div class="flex gap-2 mt-1">
                    <userSettings :item="item" />
                  </div>
                </div>
                <div class="ml-[-15px]">
                  Категории
                  <div class="flex gap-2 mt-1">
                    <!-- <pre>{{ item }}</pre> -->
                    <span class="text-[#9E55EC] bg-[#F9F8FC] p-[5px] rounded-[60px]">
                      {{ item?.fCategory?.title }}
                    </span>
                  </div>
                </div>
                <div>
                  
                </div>
              </div>
            </div>
          </div>
          <!-- bottom -->
          <div class="w-full grid grid-cols-6 mt-[10px] text-[#483D5B] text-[14px] gap-3">
            <div class="w-full col-span-4">
              Статистика билета
              <ul class="flex items-center gap-4 bg-[#F9F8FC] rounded-[30px] px-[7px] py-[4px]  mr-8 mt-[5px]">
                <li
                  class="text-[#EEC900]"
                >
                  <span class="inline-block rounded-full w-[7px] h-[7px] mr-1 bg-[#EEC900]"></span>
                  {{ item.counts?.ticketPending }} В обработке
                </li>
                <li
                  class="text-[#9E55EC]"
                >
                  <span class="inline-block rounded-full w-[7px] h-[7px] mr-1 bg-[#9E55EC]"></span>
                  {{ item.counts?.ticketUsed }} Использован
                </li>
                <li
                  class="text-[#05CD99]"
                >
                  <span class="inline-block rounded-full w-[7px] h-[7px] mr-1 bg-[#05CD99]"></span>
                  {{ item.counts?.ticketPurchase }} Куплен
                </li>
                <li
                  class="text-[#FF5558]"
                >
                  <span class="inline-block rounded-full w-[7px] h-[7px] mr-1 bg-[#FF5558]"></span>
                  {{ item.counts?.ticketDenied }} Отказан
                </li>
              </ul>
            </div>
            <div class="w-full col-span-2">
              Статистика возвратов
              <ul class="flex items-center gap-4 rounded-[30px] bg-[#F9F8FC] px-[7px] py-[4px] mt-[5px]">
                <li
                  class="text-[#EEC900]"
                >
                  <span class="inline-block rounded-full w-[7px] h-[7px] mr-1 bg-[#EEC900]" ></span>
                  В обработке
                </li>
                <li
                  class="text-[#05CD99]"
                >
                  <span class="inline-block rounded-full w-[7px] h-[7px] mr-1 bg-[#05CD99]" ></span>
                  Возвращены
                </li>
              </ul>
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
import { ChevronRightIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
defineProps(['list'])
const url = import.meta.env.VITE_URL
import userSettings from './userSettings.vue'
import { convertDateShort } from '@/helpers/func'
</script>
<style lang=""></style>
