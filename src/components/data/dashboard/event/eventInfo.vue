<template>
  <div class="p-4 2xl:p-2">
    <div class="grid grid-cols-12">
      <div class="col-span-4">
        <img
          v-if="event?.cover?.length"
          :src="`${url}/${event?.cover[0]}`"
          alt=""
          class="w-64 max-w-50 m-auto rounded-lg block  object-cover 2xl:w-72 md-max:w-64 xm-max:w-56"
        />
        <img 
          v-else 
          class=" max-w-80 m-auto rounded-lg block object-cover 2xl:w-72 md-max:w-52 xm-max:w-52 "  
          src="@/assets/logo/logo.png" 
          alt="" 
        />
        <div class="flex gap-3 mb-3">
          <div v-for="(e, index) in event?.cover?.slice(1)" :key="index" class="flex">
            <img
              :src="`${url}/${e}`"
              alt=""
              class="w-10 h-auto rounded-md mt-1"
            />
          </div>
        </div>
      </div>
      <div class="col-span-8">
        <div class="space-y-1 divide-y">
          <div class="py-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">{{ $t('event.table.title') }}</div>
            <div class="text-base font-medium text-gray-800">
              {{ event?.title }}
            </div>
          </div>
          <div class="py-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">{{ $t('event.table.text') }}</div>
            <div class="text-base font-medium text-gray-800">
              {{ event?.description }}
            </div>
          </div>
          <div class="py-2 flex justify-between">
            <div>
              <div class="text-xs text-gray-500 2xl:text-[12px]">{{ $t('event.table.organizator') }}</div>
              <div class="text-[14px] font-medium text-gray-800 flex items-center mt-2">
  
                <img v-if="event?.organizer?.cover.length>0" :src="`${url}/${event?.organizer?.cover[0]}`" class="w-12 h-12 mr-2 rounded-full" alt="">
                <img v-else src="@/assets/images/not-user.jpg" alt="" class="w-12 rounded-md">
                <div>
                  <h2>{{ event?.organizer?.lname }} {{ event?.organizer?.name }}</h2>
                  <h5 class="text-[11px]">{{ event?.organizer?.phone }}</h5>
                </div>
              </div>
            </div>
            <div>
              <div class="text-xs text-gray-500 2xl:text-[12px]">Стоимость билета</div>
              <div class="text-[22px] font-medium text-gray-800 2xl:text-[12px]">
                {{ event?.entryFee.toLocaleString() }} сум
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="space-y-1 divide-y">
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]"> Категория</div>
        <!-- <pre>{{ event }}</pre> -->
        <div class="text-base font-medium text-gray-800 mt-1">
          <span 
            class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border bg-[#F5F0FF] text-[#9E55EC] border-[#9E55EC]' 2xl:text-[12px]"
          >
            {{ event?.fCategory?.title }}
          </span>
        </div>
      </div>
      <div class="py-2 flex justify-between">
        <div>
          <div class="text-xs text-gray-500 2xl:text-[12px]">Количество билетов</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[12px]">
            {{ event?.ticketPackage?.quantity }}
          </div>
        </div>
        <!-- <div>
          <div class="text-xs text-gray-500 2xl:text-[12px]">Стоимость билета</div>
          <div class="text-base font-medium text-gray-800 2xl:text-[12px]">
            {{ event?.entryFee.toLocaleString() }} сум
          </div>
        </div> -->
      </div>
      <div class="py-2">
        <div class="text-xs text-gray-500 2xl:text-[12px]">{{ $t('event.table.CreatedAt') }}</div>
        <div class="text-base font-medium text-gray-800 2xl:text-[12px]">
          {{ convertDateShort(event?.createdAt, 'full') }}
        </div>
      </div>
      <!-- <div class="py-2 space-y-1">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Адрес</div>
        <div class="text-xs font-medium text-gray-800 2xl:text-[12px]">
          {{ event?.location?.address }}
          <div class="w-full h-48 mt-3">
            <div id="map"  class="map size-full"></div>
          </div>
        </div>
      </div> -->
      <div class="py-2 space-y-1">
        <div class="text-xs text-gray-500 2xl:text-[12px]">Адрес</div>
        <div class="text-xs font-medium text-gray-800 2xl:text-[12px]">
          {{ event?.location?.address }}
          <div class="w-full h-48 mt-3">
            <iframe
              :src="mapUrl"
              width="100%"
              height="400"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script setup>
// import { onMounted } from 'vue'
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL
defineProps(['event'])
import { useI18n } from 'vue-i18n'
const { t } = useI18n()



const latitude = 41.2995; // Toshkent koordinatalari
const longitude = 69.2401;
// const mapUrl = `https://yandex.ru/maps/?ll=${longitude},${latitude}&z=14&l=map&mode=search`;
const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;


//Можно использовать для различных преобразований



</script>
<style>
iframe {
  border-radius: 8px;
}
</style>