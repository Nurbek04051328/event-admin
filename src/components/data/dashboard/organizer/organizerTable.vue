<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px] sm:rounded-[0px]" v-if="store.organizer.data.length">
    <div class="inline-block min-w-full align-middle sm:hidden">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first">№</th>
            <th scope="col" class="th">Ф.И.О</th>
            <th scope="col" class="th">Мероприятие</th>
            <th scope="col" class="th">Билеты</th>
            <th scope="col" class="th text-center">Кол-во Собщение</th>
            <th scope="col" class="th text-center">Проверка</th>
            <th scope="col" class="th text-center">Время регистрации</th>
            <th scope="col" class="th text-center">Статус</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(person, index) in store.organizer.data"
            :key="person._id"
            class="cursor-pointer hover:bg-gray-100"
            @click="$router.push({ name: 'organizer-wallet', params: { id: person._id } })"
            :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first">
              {{ (page - 1) * limit + index + 1 }}
            </td>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
              <div class="flex flex-col">
                <div class="font-medium text-gray-900">{{ person.lname }} {{ person.name }}</div>
                <div class="mt-1 text-[13px] text-gray-500">{{ person.phone }}</div>
              </div>
            </td>
            <td class="td">
              <span class="text-green-500">{{ person?.events?.successEvent }}</span> /
              <span class="text-red-500">{{ person?.events?.deniedEvent }}</span> /
              <span>{{ person?.events?.eventCount }}</span>
            </td>
            <td class="td">
              <span class="text-green-500">{{ person?.tickets?.generate }}</span> /
              <span class="text-yellow-500">{{ person?.tickets?.bought }}</span> -
              <span>{{ person?.tickets?.available }}</span>
            </td>
            <td class="td text-center">
              {{ person?.message }}
            </td>
            <td class="td text-center">
              <span class="warning-tag" v-if="person.organizer == 'pending'"><ClockIcon class="size-4" /></span>
              <span class="danger-tag" v-if="person.organizer == 'denied'"><XMarkIcon class="size-4" /></span>
              <span class="success-tag" v-if="person.organizer == 'success'"><CheckIcon class="size-4" /></span>
            </td>
            <td class="td text-center">
              <div>
                <div class="font-medium text-black">{{ convertDateShort(person.createdAt, 'full') }}</div>
                <div class="mt-1 text-[13px] text-gray-500">{{ person.lastVisit ? convertDateShort(person.lastVisit, 'full') : '-' }}</div>
              </div>
              
            </td>
            <td class="td text-center">
              <span class="success-tag" v-if="person?.status == 'active'">Активный</span>
              <span class="primary-tag" v-if="person?.status == 'limited'">Ограничен</span>
              <span class="warning-tag" v-if="person?.status == 'not active'">Не активирован</span>
              <span class="danger-tag" v-if="person?.status == 'deleted'">Удален/Заблокирован</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="hidden sm:block">
      <ul class="flex-1 grid grid-cols-12 gap-2 xs-max:grid-cols-1 overflow-auto">
        <li
          v-for="item in store.organizer.data"
          :key="item._id"
          class="flex flex-col col-span-4  xm:col-span-6 xs:col-span-12 divide-y border border-gray-300 divide-gray-200 rounded-lg bg-white shadow mb-3"
        >
          <div class="flex flex-1 flex-col relative px-2">
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
                        @click="
                          $router.push({ name: 'organizer-wallet', params: { id: item._id } })
                        "
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
                class="mx-auto h-[100px] w-[100px] flex-shrink-0 rounded-full object-cover"
                v-if="item.cover?.length > 0 || item.face?.at(0)?.length > 0"
                :src="`${url}/${item.cover?.at(0) || item.face?.at(0)}`"
                alt=""
              />
              <img
                v-else
                class="mx-auto h-[100px] w-[100px] rounded-full"
                src="@/assets/logo/logo.png"
                alt=""
              />
            </div>
            <h3 class="mt-6 text-sm font-medium text-gray-900">
              {{ item?.lname }} {{ item?.name }}
            </h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <dt class="sr-only">Логин</dt>
              <dd class="text-sm text-gray-500">{{ item.login }}</dd>
              <dd class="text-sm text-gray-300">{{ item.email }}</dd>
              <dt class="sr-only">Статус</dt>
              <dd class="mt-3 space-x-2 mb-1 flex items-center justify-between xm:text-[8px]">
                <span 
                  class="xm:text-[10px]"
                  :class="`${item?.status == 'active' ? 'success-tag' :
                  item?.status == 'limited' ? 'primary-tag' :
                  item?.status == 'not active' ? 'warning-tag' : 'danger-tag'}`">
                  {{ item?.status == 'active' ? 'Активный' : 
                    item?.status == 'limited' ? 'Ограниченный' :
                    item?.status == 'not active' ? 'Не активирован' : 'Удален' }}
                </span>
                <span
                  class="xm:text-[10px]"
                  :class="`${item?.organizer == 'pending' ? 'warning-tag' : item?.organizer == 'denied' ? 'danger-tag' : 'success-tag'}`"
                >
                  {{
                    item?.organizer == 'pending'
                      ? 'В ожидание'
                      : item?.organizer == 'denied'
                        ? 'Отказано'
                        : 'Проверено'
                  }}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="-ml-px flex w-0 flex-1">
                <a
                  :href="`tel:${item?.phone}`"
                  class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ item?.phone }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <div class="p-4 text-center text-gray-500 text-sm">Пока нет данных</div>
  </div>
</template>
<script setup>
defineProps(['page', 'limit'])
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { PhoneIcon, EllipsisHorizontalIcon, XMarkIcon, ClockIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { organizerStore } from '@/stores/user/organizer'
const store = organizerStore()
</script>
<style lang=""></style>
