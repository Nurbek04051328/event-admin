<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first md-max:text-[13px]">№</th>
            <th scope="col" class="th md-max:text-[13px]">Название</th>
            <th scope="col" class="th md-max:text-[13px]">Slug</th>
            <th scope="col" class="th md-max:text-[13px]">Цены (сум)</th>
            <th scope="col" class="th md-max:text-[13px]">Переводы</th>
            <th scope="col" class="th">Статус</th>
            <th scope="col" class="th-last" width="150"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, itemIdx) in notifications"
            :key="item?._id"
            :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first md-max:text-[13px]">
              {{ itemIdx + 1 }}
            </td>
            <td class="td md-max:text-[13px]">
              {{ notifType.find((n) => n._id == item?.type)?.title }}
            </td>
            <td class="td">{{ item?.slug }}</td>
            <td class="td md-max:text-[13px] font-bold">{{ item?.price?.toLocaleString() }} сум</td>
            <td class="td md-max:text-[13px]">
              <div class="flex items-start gap-2">
                <button
                  @click="edit(item?._id, lang.slug)"
                  :class="`${
                    item?.translates?.some((tr) => tr.language == lang.slug)
                      ? 'bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8'
                      : 'bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8'
                  } w-auto p-2 px-3 md-max:p-1 md-max:px-2`"
                  v-for="lang of options?.languages"
                  :key="lang._id"
                >
                  {{ lang.slug }}
                </button>
              </div>
            </td>
            <td class="td">
              <button
                @click="changeStatus(item?._id, item?.status)"
                :class="
                  item?.status == 'active'
                    ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-3 py-1 w-[80px]'
                    : 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-3 py-1 w-[80px]'
                "
              >
                {{ item?.status == 'active' ? 'Актив' : 'Не актив' }}
              </button>
            </td>
            <td class="td-last space-x-4">
              <button class="edit-btn size-9" @click="edit(item?._id)">
                <PencilIcon class="size-4" />
              </button>
              <button
                type="button"
                class="bg-[#FFE6E6] text-[#FF5558] hover:bg-[#FF5558] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8"
                @click="confirmRemove(item?._id)"
              >
                <TrashIcon class="size-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <dialogAgree
    :title="$t('ticketPackage.dialog.deletetitle')"
    :btnTitle="$t('ticketPackage.dialog.btnTitle')"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { ref } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toggle = ref(false)
defineProps(['options', 'page', 'limit'])

import { notificationStore } from '@/stores/data/notification'
import { storeToRefs } from 'pinia'
const store = notificationStore()
const { notifications } = storeToRefs(store)

const _id = ref('')

import { useFullStore } from '@/stores/usefull/modal'
import { notifType } from '@/helpers/vars'
import { PencilIcon } from '@heroicons/vue/20/solid'
const usefull = useFullStore()
const edit = (id, lang) => {
  usefull.setToggle(true, id, lang)
}

const changeStatus = async (id, status) => {
  let newStatus = status === 'active' ? 'inactive' : 'active'
  await store.changeStatus(id, newStatus)
}

const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
}

const remove = async (answer) => {
  if (answer) {
    await store.removeNotification(_id.value, t)
  }
  close()
}

const close = () => {
  toggle.value = false
}
</script>
<style lang=""></style>
