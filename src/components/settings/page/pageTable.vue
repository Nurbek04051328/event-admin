<template>
  <div class="ring-1 w-full ring-gray-300 sm:mx-0 rounded-lg " :class="pages.length > 0 ? 'overflow-auto' : ''">
    <table class="w-full divide-y">
      <thead>
        <tr>
          <th scope="col" class="th-first md-max:text-[13px]">№</th>
          <th scope="col" class="th md-max:text-[13px]" width="100">Фото</th>
          <th scope="col" class="th md-max:text-[13px]">Название</th>
          <th scope="col" class="th md-max:text-[13px]">Slug</th>
          <th scope="col" class="th md-max:text-[13px]">Переводы</th>
          <th scope="col" class="th md-max:text-[13px]" width="150">{{ $t('category.table.data') }}</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(item, itemIdx) in pages"
          :key="item?._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first md-max:text-[13px]">
            {{ itemIdx + 1 }}
          </td>
          <td class="td">
            <!-- {{ item?.cover }} -->
            <a :href="`${url}/${item?.cover[0]}`" target="_blank" v-if="item?.cover?.length > 0">
              <img :src="`${url}/${item?.cover[0]}`" alt="" class="w-10 rounded-md" />
            </a>
            <img
              v-else
              src="@/assets/images/not-image.png"
              alt=""
              class="w-14 rounded-md"
            />
          </td>
          <td class="td md-max:text-[13px]">{{ item?.title || $t('subcategory.table.notadd') }}</td>
          <td class="td md-max:text-[13px]">{{ item?.slug }}</td>
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

          <td class="td">{{ convertDateShort(item?.createdAt, 'full') }}</td>
          <td class="td-last">
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
  <dialogAgree
    :title="$t('category.dialog.deletetitle')"
    :btnTitle="$t('category.dialog.btnTitle')"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { convertDateShort } from '@/helpers/func'
import { TrashIcon } from '@heroicons/vue/24/outline'
const url = import.meta.env.VITE_URL

const toggle = ref(false)
// const limit = ref(30)
defineProps(['options'])

import { pageStore } from '@/stores/data/page'
import { storeToRefs } from 'pinia'
const store = pageStore()
const { pages } = storeToRefs(store)

// const getData = async () => {
//   await store.getCategories({
//     limit: limit.value
//   })
// }

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
    await store.removePage(_id.value, t)
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