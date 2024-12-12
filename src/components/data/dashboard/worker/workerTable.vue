<template>
  <div class="flex-1 h-full w-full overflow-auto">
    <div class="inline-block min-w-full align-middle sm:hidden">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first w-10">№</th>
            <th scope="col" class="th w-1/5">{{ $t('worker.table.name') }}</th>
            <th scope="col" class="th w-1/6 lg:w-1/4" width="90">{{ $t('worker.table.phone') }}</th>
            <th scope="col" class="th w-1/5">{{ $t('worker.table.login') }}</th>
            <th scope="col" class="th w-1/6 lg:hidden" width="60">{{ $t('worker.table.role') }}</th>
            <th scope="col" class="th w-1/5" width="150">{{ $t('worker.table.data') }}</th>
            <th scope="col" class="th-last w-1/6" width="150"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white overflow-auto">
          <tr
            v-for="(item, index) in workers"
            :key="item?._id"
            class=" hover:bg-gray-100"
            :class="index % 2 === 0 ? undefined : 'bg-gray-50'"
            
          >
            <td class="td-first">{{ (page - 1) * limit + index + 1 }}</td>
            <td class="whitespace-nowrap text-sm">{{ item?.lname }} {{ item?.name }}</td>
            <td class="whitespace-nowrap  text-sm text-gray-500">{{ item?.phone }}</td>
            <td class="whitespace-nowrap text-sm text-gray-500">{{ item?.login }}</td>
            <td class="whitespace-nowrap  text-sm text-gray-500 lg:hidden">{{ item?.role }}</td>
            <td class="relative whitespace-nowrap  text-sm font-medium">{{ convertDateShort(item.createdAt, 'full') }}</td>
            <td class="td-last flex gap-2">
              <button type="button" class="add-btn rounded size-9 lg:size-8" @click="$router.push({ name: 'worker-logger', params: { id: item?._id } })">
                <EyeIcon class="size-4" />
              </button>
              <button type="button" class="edit-btn size-9 lg:size-8" @click="edit(item?._id)">
                <PencilIcon class="size-4" />
              </button>
              <button type="button" class="danger-btn size-9 lg:size-8" @click="confirmRemove(item?._id)">
                <TrashIcon class="size-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class=" hidden sm:block">
      <ul  class="flex-1 grid grid-cols-12 gap-2  xs-max:grid-cols-1 overflow-auto">
        <li
          v-for="item in workers"
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
                        @click="$router.push({ name: 'worker-logger', params: { id: item?._id } })"
                      >
                        Просмотр
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button  
                        class="block px-3 py-1 text-sm leading-6 text-gray-900"
                        @click="edit(item?._id)"
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
            <h3 class="mt-6 text-sm font-medium text-gray-900">{{ item?.lname }} {{ item?.name }}</h3>
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <dt class="sr-only">Логин</dt>
              <dd class="text-sm text-gray-500">{{ item.login }}</dd>
              <dt class="sr-only">Статус</dt>
              <dd class="mt-3 space-x-2 mb-1">
                <span :class="`${item?.status ? 'success-tag' : 'warning-tag'}`">
                  {{ item?.status ? 'Активный' : 'Не активный' }}
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
import { EyeIcon } from '@heroicons/vue/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toggle = ref(false)
defineProps(['page', 'limit'])

import { workerStore } from '@/stores/data/workers'
import { storeToRefs } from 'pinia'
const store = workerStore()
const { workers } = storeToRefs(store)



import { useFullStore } from '@/stores/usefull/modal'

const usefull = useFullStore()
const edit = (id, lang) => {
  usefull.setToggle(true, id, lang)
}

const _id = ref('')
const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
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
