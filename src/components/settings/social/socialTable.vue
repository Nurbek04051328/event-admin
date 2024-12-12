<template>
  <div class="ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first md-max:text-[13px]">№</th>
          <th scope="col" class="th md-max:text-[13px]" width="200">{{ $t('social.table.icon') }}</th>
          <th scope="col" class="th md-max:text-[13px]">{{ $t('social.table.name') }}</th>
          <th scope="col" class="th md-max:text-[13px]" width="150">{{ $t('social.table.data') }}</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(item, itemIdx) in socials"
          :key="item?._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">
            <!-- {{ item?.cover }} -->
            <a :href="`${url}/${item?.icon[0]}`" target="_blank" v-if="item?.icon?.length > 0">
              <img :src="`${url}/${item?.icon[0]}`" alt="" class="w-10 rounded-md" />
            </a>
            <img v-else src="@/assets/images/not-image.png" alt="" class="w-10 rounded-md" />
          </td>
          <td class="td md-max:text-[13px]">{{ item?.title || '' }}</td>
          <td class="td md-max:text-[13px]">{{ convertDate(item?.createdAt, 'full') }}</td>
          <td class="td-last">
            <div class="flex gap-2">
              <button type="button" class="edit-btn size-9 ml-auto md-max:size-7" @click="edit(item._id)">
                <PencilIcon class="size-5 md-max:size-4" />
              </button>
              <button type="button" class="danger-btn size-9 md-max:size-7" @click="confirmRemove(item._id)">
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
// const limit = ref(30)
defineProps(['options'])

import { socialStore } from '@/stores/data/social'
import { storeToRefs } from 'pinia'
const store = socialStore()
const { socials } = storeToRefs(store)

// const getData = async () => {
//   await store.getCategories({
//     limit: limit.value
//   })
// }

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

const close = () => {
  toggle.value = false
}

// onMounted(() => {
//   getData()
// })
</script>
<style lang=""></style>
