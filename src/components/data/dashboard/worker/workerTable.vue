<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px] md:rounded-[0px]" v-if="workers.length">
    <div class="inline-block min-w-full align-middle md:hidden">
      <table class="min-w-full divide-y divide-gray-300 bg-white">
        <thead>
          <tr>
            <th scope="col" class="th-first w-10">№</th>
            <th scope="col" class="th w-1/5">Ф.И.О</th>
            <th scope="col" class="th w-1/6 lg:w-1/4" width="90">Номер телефон</th>
            <th scope="col" class="th w-1/6 lg:w-1/4" width="90">Роль</th>
            <!-- <th scope="col" class="th w-1/6 lg:hidden" width="60">Организаторы</th>
            <th scope="col" class="th w-1/6 lg:hidden" width="60">Мероприятие</th>
            <th scope="col" class="th w-1/6 lg:hidden" width="60">Сообщение</th> -->
            <th scope="col" class="th w-1/6 lg:hidden" width="60">Последный вход</th>
            <th scope="col" class="th w-1/5" width="150">Дата рег.</th>
            <th scope="col" class="th-last w-1/6" width="150"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white overflow-auto">
          <tr v-for="(item, index) in workers" :key="item?._id" class="hover:bg-gray-100">
            <td class="td-first">{{ (page - 1) * limit + index + 1 }}</td>
            <td
              class="td cursor-pointer"
              @click="$router.push({ name: 'worker-statistic', params: { id: item?._id } })"
            >
              {{ item?.lname }} {{ item?.name }}
            </td>
            <td class="td text-gray-500">{{ item?.phone }}</td>
            <td class="td text-gray-500">{{ getRoleTitle(item?.role) }}</td>
            <!-- <td class="td text-gray-500 lg:hidden">
              {{ item?.checkedOrganizers }}
            </td>
            <td class="td text-gray-500 lg:hidden">
              {{ item?.checkedEvent }}
            </td>
            <td class="td text-gray-500 lg:hidden">
              {{ item?.messages }}
            </td> -->
            <td class="td text-gray-500 lg:hidden">
              {{ item?.lastVisit ? convertDateShort(item?.lastVisit, 'full') : '-' }}
            </td>
            <td class="td">
              {{ convertDateShort(item.createdAt, 'full') }}
            </td>
            <td class="td-last space-x-2">
              <button
                type="button"
                class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8"
                @click.stop="$router.push({ name: 'workerEdit', params: { id: item?._id } })"
              >
                <PencilIcon class="size-4" />
              </button>
              <button
                type="button"
                class="bg-[#FFE6E6] text-[#FF5558] hover:bg-[#FF5558] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8"
                @click.stop="confirmRemove(item?._id)"
              >
                <TrashIcon class="size-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="hidden md:block">
      <ul class="flex-1 grid grid-cols-12 gap-2 xs-max:grid-cols-1 overflow-hidden">
        <li
          v-for="item in workers"
          :key="item._id"
          class="flex flex-col col-span-4 sm:col-span-6 xm:col-span-12 divide-y border border-gray-300 divide-gray-200 rounded-md bg-white text-center shadow mb-3"
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
                        @click="$router.push({ name: 'worker-statistic', params: { id: item?._id } })"
                      >
                        Просмотр
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        class="block px-3 py-1 text-sm leading-6 text-gray-900"
                        @click="$router.push({ name: 'workerEdit', params: { id: item?._id } })"
                      >
                        Редактировать
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        class="block px-3 py-1 text-sm leading-6 text-gray-900"
                        @click="confirmRemove(item?._id)"
                      >
                        Delete
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <h3 class="mt-6 text-sm font-medium text-gray-900">
              {{ item?.lname }} {{ item?.name }}
            </h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <dt class="sr-only">Логин</dt>
              <dd class="text-sm text-gray-500">{{ getRoleTitle(item?.role) }}</dd>
              <dt class="sr-only">Статус</dt>
              <dd class="mt-3 space-x-2 mb-1">
                <span :class="`${item?.status ? 'success-tag' : 'warning-tag'}`">
                  {{ item?.status ? 'Активный' : 'Не активный' }}
                </span>
              </dd>
            </dl>
            <div class="flex justify-between items-center px-2 mt-1">
              <div class="text-xs text-gray-500">Последный вход:</div>
              <div class="text-xs">{{ item?.lastVisit ? convertDateShort(item?.lastVisit, 'full') : '-' }}</div>
            </div>
            <div class="flex justify-between items-center px-2 py-1">
              <div class="text-xs text-gray-500">Дата рег:</div>
              <div class="text-xs">{{ convertDateShort(item.createdAt, 'full') }}</div>
            </div>
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
  <dialogAgree
    :title="$t('worker.dialog.deletetitle')"
    :btnTitle="$t('worker.dialog.btnTitle')"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { ref } from 'vue'
import { convertDateShort } from '@/helpers/func'
import { TrashIcon, PencilIcon, PhoneIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toggle = ref(false)
defineProps(['page', 'limit'])

import { workerStore } from '@/stores/data/workers'
import { storeToRefs } from 'pinia'
const store = workerStore()
const { workers } = storeToRefs(store)


const _id = ref('')
const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
}

const roles = [
  { _id: 'moderator', title: 'Модератор' },
  { _id: 'content_manager', title: 'Контент менеджер' },
  { _id: 'accountant', title: 'Бухгалтер' }
]
const getRoleTitle = (roleId) => {
  const role = roles.find((r) => r._id === roleId)
  return role ? role.title : roleId
}


const remove = async (answer) => {
  if (answer) {
    await store.removeWorker(_id.value, t)
  }
  close()
}

const close = () => {
  toggle.value = false
}
</script>
<style lang=""></style>
