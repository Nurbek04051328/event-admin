<template>
  <div class="p-4">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-4 space-y-2">
        <div>
          <swiper
            v-if="event?.cover?.length"
            :slides-per-view="1"
            :loop="true"
            class="rounded-lg overflow-hidden"
          >
            <swiper-slide v-for="cover of event.cover.filter((c) => c)" :key="cover">
              <img :src="`${url}/${cover}`" alt="" class="w-full h-80 object-cover" />
            </swiper-slide>
          </swiper>
          <img
            v-else
            class="max-w-80 m-auto rounded-lg block object-cover 2xl:w-72 md-max:w-52 xm-max:w-52"
            src="@/assets/logo/logo.png"
            alt=""
          />
        </div>
        <div class="border-b-[1px] pb-2">
          <div class="text-xs text-gray-500 2xl:text-[12px]">
            {{ $t('event.table.organizator') }}
          </div>
          <div class="text-[14px] font-medium text-gray-800 flex items-center mt-2">
            <img
              v-if="event?.organizer?.cover.length > 0"
              :src="`${url}/${event?.organizer?.cover[0]}`"
              class="w-12 h-12 mr-2 rounded-full object-cover"
              alt=""
            />
            <img v-else src="@/assets/images/not-user.jpg" alt="" class="w-12 rounded-md" />
            <div>
              <h2>{{ event?.organizer?.lname }} {{ event?.organizer?.name }}</h2>
              <h5 class="text-[11px]">{{ event?.organizer?.phone }}</h5>
            </div>
          </div>
        </div>
        <div class="border-b-[1px] pb-2">
          <div class="text-xs text-gray-500">{{ $t('event.table.CreatedAt') }}</div>
          <div class="text-base font-medium text-gray-800">
            {{ convertDateShort(event?.createdAt, 'full') }}
          </div>
        </div>
        <div class="border-b-[1px] pb-2">
          <div class="text-xs text-gray-500">Адрес</div>
          <div class="text-base font-medium text-gray-800">
            {{ event?.location?.address }}
          </div>
          <div class="w-full h-48 mt-3">
            <iframe
              :src="mapUrl"
              width="100%"
              height="400"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="col-span-8">
        <div class="space-y-2">
          <div class="border-b-[1px] pb-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">{{ $t('event.table.title') }}</div>
            <div class="text-base font-medium text-gray-800">
              {{ event?.title }}
            </div>
          </div>
          <div class="border-b-[1px] pb-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">{{ $t('event.table.text') }}</div>
            <div class="text-base font-medium text-gray-800">
              {{ event?.description }}
            </div>
          </div>

          <div class="border-b-[1px] pb-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">Категория</div>
            <!-- <pre>{{ event }}</pre> -->
            <div class="text-base font-medium text-gray-800 mt-1 flex flex-wrap gap-1">
              <span
                class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border bg-[#F5F0FF] text-[#9E55EC] border-[#9E55EC]' 2xl:text-[12px] space-x-1"
                v-if="event?.fCategory?.category?.title"
              >
                <span v-if="event?.fCategory?.category?.title">{{
                  event?.fCategory?.category?.title
                }}</span>
                <span v-if="event?.fCategory?.subcategory?.title">
                  - {{ event?.fCategory?.subcategory?.title }}</span
                >
              </span>
              <span
                class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border bg-[#F5F0FF] text-[#9E55EC] border-[#9E55EC]' 2xl:text-[12px] space-x-1"
                v-if="event?.sCategory?.category?.title"
              >
                <span v-if="event?.sCategory?.category?.title">{{
                  event?.sCategory?.category?.title
                }}</span>
                <span v-if="event?.sCategory?.subcategory?.title">
                  - {{ event?.sCategory?.subcategory?.title }}</span
                >
              </span>
            </div>
          </div>
          <div class="border-b-[1px] pb-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">Атрибуты</div>
            <!-- <pre>{{ event }}</pre> -->
            <div class="text-sm font-medium text-gray-800 mt-1 space-y-2">
              <div
                class="flex items-center justify-between"
                v-for="atr of event?.attributes"
                :key="atr?._id"
              >
                <div>{{ atr.category?.title }}</div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="val of atr.values"
                    class="ring-1 ring-inset ring-gray-300 py-1 px-2"
                    :key="val._id"
                    >{{ val?.title }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="border-b-[1px] pb-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">Настройки бронирования</div>
            <!-- <pre>{{ event }}</pre> -->
            <div class="text-sm font-medium text-gray-800 mt-1 space-y-2">
              <div class="flex items-center justify-between">
                <div>Крайний срок для первого гостя</div>
                <div class="flex flex-wrap gap-2">
                  <span class="ring-1 ring-inset ring-gray-300 py-1 px-2">
                    {{ addGuests?.find((a) => a._id == event.booking?.firstGuest)?.title }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>Крайний срок добавления гостей</div>
                <div class="flex flex-wrap gap-2">
                  <span class="ring-1 ring-inset ring-gray-300 py-1 px-2">
                    {{ addGuests?.find((a) => a._id == event.booking?.addingGuests)?.title }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="border-b-[1px] pb-2">
            <div class="text-xs text-gray-500 2xl:text-[12px]">Опции</div>
            <!-- <pre>{{ event }}</pre> -->
            <div class="text-sm font-medium text-gray-800 mt-1 space-y-2">
              <div
                class="flex items-center justify-between"
                v-for="atr of event?.provideAttributes"
                :key="atr?._id"
              >
                <div>{{ atr.category?.title }}</div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="val of atr.values"
                    class="ring-1 ring-inset ring-gray-300 py-1 px-2"
                    :key="val._id"
                    >{{ val?.title }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL
defineProps(['event'])

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const latitude = 41.2995 // Toshkent koordinatalari
const longitude = 69.2401
// const mapUrl = `https://yandex.ru/maps/?ll=${longitude},${latitude}&z=14&l=map&mode=search`;
const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`

//Можно использовать для различных преобразований

const addGuests = computed(() => {
  let hours = [...Array(6)].map((a, v) => {
    return {
      _id: (v + 1) * 3,
      title: t('show.deadline_hours_select', { hour: (v + 1) * 3 })
    }
  })
  let days = [...Array(4)].map((a, v) => {
    return {
      _id: v + 25,
      title: t('show.deadline_days_select', { day: v + 2 })
    }
  })
  console.log(hours)
  return [
    {
      _id: 1,
      title: t('show.deadline_hour_select')
    },
    ...hours,
    {
      _id: 24,
      title: t('show.deadline_day_select')
    },
    ...days
  ]
})
</script>
<style>
iframe {
  border-radius: 8px;
}
</style>
