<template>
  <div class="ring-1 w-full ring-gray-300 rounded-lg sm:mx-0" :class="socials.length > 0 ? 'overflow-auto' : ''">
    <table class="min-w-full divide-y">
      <thead>
        <tr>
          <th scope="col" class="th-first md-max:text-[13px]">№</th>
          <th scope="col" class="th md-max:text-[13px]" width="150">{{ $t('social.table.icon') }}</th>
          <th scope="col" class="th md-max:text-[13px]">{{ $t('social.table.name') }}</th>
          <th scope="col" class="th md-max:text-[13px]" width="150">{{ $t('social.table.data') }}</th>
          <th scope="col" class="th">Статус</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-if="socials.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">
            Нет данных
          </td>
        </tr>
        <tr
          v-for="(item, itemIdx) in socials"
          :key="item?._id"
          class="hover:bg-gray-100"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td class="td">
            <a :href="`${url}/${item?.icon[0]}`" target="_blank" v-if="item?.icon?.length > 0">
              <img :src="`${url}/${item?.icon[0]}`" alt="" class="w-10 rounded-md" />
            </a>
            <img v-else src="@/assets/images/not-image.png" alt="" class="w-10 rounded-md" />
          </td>
          <td class="td md-max:text-[13px]">{{ item?.title || '' }}</td>
          <td class="td md-max:text-[13px]">{{ convertDate(item?.createdAt, 'full') }}</td>
          <td class="td">
            <button
              @click="changeStatus(item?._id, item?.status)"
              :class=" item?.status == true ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-3 py-1 w-[80px]' : 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-3 py-1 w-[80px]'"
            >
              {{ item?.status == true ? "Актив" : "Не актив" }}
            </button>
          </td>
          <td class="td-last">
            <div class="flex gap-2">
              <button type="button" class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8" @click="edit(item._id)">
                <PencilIcon class="size-5 md-max:size-4" />
              </button>
              <button type="button" class="bg-[#FFE6E6] text-[#FF5558] hover:bg-[#FF5558] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8" @click="confirmRemove(item._id)">
                <TrashIcon class="size-5 md-max:size-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialogAgree
    :title="$t('social.dialog.deletetitle')"
    :btnTitle="$t('social.dialog.btnTitle')"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { convertDate } from '@/helpers/func'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'
const url = import.meta.env.VITE_URL

const toggle = ref(false)

defineProps(['options', 'page', 'limit'])

import { socialStore } from '@/stores/data/social'
import { storeToRefs } from 'pinia'
const store = socialStore()
const { socials } = storeToRefs(store)



import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const edit = (id) => {
  usefull.setToggle(true, id)
}

const _id = ref('')

const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
}

const remove = async (answer) => {
  if (answer) {
    await store.removeSocial(_id.value, t)
  }
  close()
}

const changeStatus = async(id, status) => {
  let newStatus = status === true ? false : true;
  await store.changeStatus(id,newStatus)
}

const close = () => {
  toggle.value = false
}


</script>
<style lang=""></style>
