<template>
  <div class="flex-1 h-full w-full overflow-auto">
    <div class="inline-block min-w-full align-middle sm:hidden">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first">№</th>
            <th scope="col" class="th">Ф.И.О</th>
            <th scope="col" class="th">Контакт</th>
            <th scope="col" class="th">Мероприятие</th>
            <th scope="col" class="th">Билети</th>
            <th scope="col" class="th">Кол-во Собщение</th>
            <th scope="col" class="th">Статус</th>
            <th scope="col" class="th">Последный вход</th>
            <th scope="col" class="th">Время регистрации</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(person, index) in store.user.data"
            :key="person._id"
            class="cursor-pointer hover:bg-gray-100"
            @click="$router.push({ name: 'user-wallet', params: { id: person._id } })"
            :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first">
              {{ (page - 1) * limit + index + 1 }}
            </td>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
              <div class="flex items-center">
                <div class="h-11 w-11 flex-shrink-0">
                  <img
                    class="h-11 w-11 rounded-full"
                    v-if="person.cover?.length > 0 || person.face?.at(0)?.length > 0"
                    :src="`${url}/${person.cover?.at(0) || person.face?.at(0)}`"
                    alt=""
                  />
                  <img class="h-11 w-11 rounded-full" v-else src="@/assets/logo/logo.png" alt="" />
                </div>
                <div class="ml-4">
                  <div class="font-medium text-gray-900">{{ person.lname }} {{ person.name }}</div>
                </div>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div class="text-gray-900">{{ person.login }}</div>
              <div class="mt-1 text-gray-500">{{ person.phone }}</div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
              {{ person?.events }}
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
              <span class="text-green-500">{{ person?.tickets?.generated }}</span> /
              <span class="text-yellow-500">{{ person?.tickets?.bought }}</span>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center">
              {{ person?.messages }}
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <span class="success-tag" v-if="person?.status == 'active'">Активный</span>
              <span class="primary-tag" v-if="person?.status == 'limited'">Ограничен</span>
              <span class="warning-tag" v-if="person?.status == 'not active'">Не активирован</span>
              <span class="danger-tag" v-if="person?.status == 'deleted'">Удален/Заблокирован</span>
            </td>
            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-sm  sm:pr-0 text-center">
              {{ person.lastVisit?  convertDateShort(person.lastVisit, 'full') : '-' }}
            </td>
            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-sm font-medium sm:pr-0">
              {{ convertDateShort(person.createdAt, 'full') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class=" hidden sm:block">
      <ul  class="flex-1 grid grid-cols-12 gap-2  xs-max:grid-cols-1 overflow-auto">
        <li
          v-for="item in store.user.data"
          :key="item._id"
          class="flex flex-col col-span-4 xm:col-span-6 xs-max:col-span-12 divide-y border border-gray-300 divide-gray-200 rounded-lg bg-white text-center shadow mb-3"
        >
          <div class="flex flex-1 flex-col relative">
            <div class="absolute top-0 right-0 m-1">
              <Menu as="div" class="relative m-r-0">
                <MenuButton class="-m-1.5 flex items-center p-1.5 mx:m-0">
                  <EllipsisHorizontalIcon class="h-6 w-6 text-gray-400" aria-hidden="true"/>
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
                        @click="$router.push({ name: 'user-logger', params: { id: item._id } })"
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
                v-if="item.cover?.length > 0 || item.face?.at(0)?.length > 0"
                :src="`${url}/${item.cover?.at(0) || item.face?.at(0)}`"
                alt=""
              />
              <img v-else class="mx-auto h-[100px] w-[100px]  rounded-full" src="@/assets/logo/logo.png" alt=""/>
            </div>
            <h3 class="mt-6 text-sm font-medium text-gray-900">{{ item?.lname }} {{ item?.name }}</h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <dt class="sr-only">Логин</dt>
              <dd class="text-sm text-gray-500">{{ item.login }}</dd>
              <dt class="sr-only">Статус</dt>
              <dd class="mt-3 space-x-2 mb-1">
                <span :class="`${item?.status ? 'success-tag' : 'warning-tag'}`">
                  {{ item?.status == "active" ? 'Активный' :
                    item?.status == "not active" ? 'Не активный' :
                    item?.status == "limited" ? 'Ограничен' :
                  'Удален/Заблокирован' }}
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
</template>
<script setup>
defineProps(['page', 'limit'])
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { PhoneIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { usersStore } from '@/stores/data/users'
const store = usersStore()






</script>
<style lang=""></style>

