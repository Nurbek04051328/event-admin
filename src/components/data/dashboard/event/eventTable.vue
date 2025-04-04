<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle sm:hidden">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first">№</th>
            <th scope="col" class="th">{{ $t('event.table.title') }}</th>
            <!-- <th scope="col" class="th">{{ $t('event.table.category') }}</th> -->
            <!-- <th scope="col" class="th">{{ $t('event.table.subcategory') }}</th> -->
            <th scope="col" class="th">Цена</th>
            <th scope="col" class="th">{{ $t('event.table.organizator') }}</th>

            <th scope="col" class="th">{{ $t('event.table.status') }}</th>
            <th scope="col" class="th">{{ $t('event.table.CreatedAt') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(item, index) in events"
            :key="item?._id"
            class="cursor-pointer hover:bg-gray-100"
            @click="$router.push({ name: 'eventLogger', params: { id: item._id } })"
            :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first">
              {{ (page - 1) * limit + index + 1 }}
            </td>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0 space-y-2">
              <div class="font-medium text-gray-900">{{ item?.title }}</div>
              <div class="flex gap-2">
                <span class="primary-tag" v-if="item?.fCategory?.category?.title">{{
                  item?.fCategory?.category?.title
                }}</span>
                <span class="primary-tag" v-if="item?.sCategory?.category?.title">{{
                  item?.sCategory?.category?.title
                }}</span>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div>{{ item?.entryFee?.toLocaleString() }} сум</div>
              <div></div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              {{ item.organizer?.lname }} {{ item?.organizer?.name }}
            </td>

            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-sm font-medium sm:pr-0">
              <span
                class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                :class="eventInfo[item?.status]?.class"
              >
                {{ eventInfo[item?.status]?.label }}
              </span>
            </td>
            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-sm font-medium sm:pr-0">
              {{ convertDateShort(item?.createdAt, 'full') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="hidden sm:block">
      <ul class="flex-1 grid grid-cols-12 gap-2 xs-max:grid-cols-1 overflow-auto">
        <li
          v-for="item in events"
          :key="item._id"
          class="flex flex-col col-span-4 xm:col-span-6 xs-max:col-span-12 divide-y border border-gray-300 divide-gray-200 rounded-lg bg-white text-center shadow mb-3"
        >
          <div class="flex flex-1 flex-col relative">
            <div class="absolute top-0 right-0 m-1">
              <Menu as="div" class="relative m-r-0">
                <MenuButton class="-m-1.5 flex items-center p-1.5 mx:m-0">
                  <EllipsisHorizontalIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                </MenuButton>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2.5 w-[150px] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                  >
                    <MenuItem>
                      <button
                        class="block px-3 py-1 text-sm leading-6 text-gray-900"
                        @click="$router.push({ name: 'eventLogger', params: { id: item._id } })"
                      >
                        Просмотр
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <div class="mt-2">
              <img
                class="mx-auto h-[100px] w-[100px] flex-shrink-0 rounded-full"
                v-if="item.cover?.length > 0"
                :src="`${url}/${item.cover?.at(0)}`"
                alt=""
              />
              <img
                v-else
                class="mx-auto h-[100px] w-[100px] rounded-full"
                src="@/assets/logo/logo.png"
                alt=""
              />
            </div>
            <h3 class="mt-6 text-sm font-medium text-gray-900">{{ item?.title }}</h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <dt class="sr-only">Организатор</dt>
              <dd class="text-sm text-gray-500">
                {{ item.organizer?.lname }} {{ item?.organizer?.name }}
              </dd>
              <dt class="sr-only">Начало / Конец</dt>
              <dd class="text-sm text-gray-500">
                {{ convertDateShort(item?.date?.from) }} - {{ convertDateShort(item?.date?.to) }}
              </dd>
              <dt class="sr-only">Статус</dt>
              <dd class="mt-3 space-x-2 mb-3">
                <span
                  class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="
                    item?.status == 2
                      ? 'text-red-700 ring-red-600/10'
                      : item?.status == 1
                        ? 'text-green-700 ring-green-600/20'
                        : 'text-blue-700 ring-blue-700/10'
                  "
                >
                  {{
                    item?.status == 0
                      ? $t('event.table.statusPanding')
                      : item?.status == 1
                        ? $t('event.table.statusAccess')
                        : $t('event.table.statusRefused')
                  }}
                </span>
                <!-- <span :class="`${item?.organizer == 'pending' ? 'warning-tag' : item?.organizer == 'denied'? 'danger-tag' : 'success-tag'}`">
                    {{ item?.organizer == 'pending' ? 'В ожидание' : item?.organizer == 'denied' ? 'Отказано' : 'Проверено' }}
                  </span> -->
              </dd>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
defineProps(['page', 'limit'])
const url = import.meta.env.VITE_URL
import { storeToRefs } from 'pinia'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { convertDateShort } from '@/helpers/func'
import { eventStore } from '@/stores/data/event'
import { eventInfo } from '@/helpers/vars'
const store = eventStore()
const { events } = storeToRefs(store)
</script>
<style></style>
