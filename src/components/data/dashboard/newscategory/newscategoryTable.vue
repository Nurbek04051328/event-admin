<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="inline-block min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first md-max:text-[13px]">№</th>
            <th scope="col" class="th-first md-max:text-[13px]">Фото</th>
            <th scope="col" class="th md-max:text-[13px]">Название</th>
            <th scope="col" class="th md-max:text-[13px]">Переводы</th>
            <th scope="col" class="th md-max:text-[13px]" width="150">Время</th>
            <th scope="col" class="th">Статус</th>
            <th scope="col" class="th-last" width="150"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, itemIdx) in newCategories"
            :key="item?._id"
            :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first md-max:text-[13px]">
              {{ (page - 1) * limit + itemIdx + 1 }}
            </td>
            <td class="td">
              <a :href="`${url}/${item?.icon[0]}`" target="_blank" v-if="item?.icon?.length > 0">
                <img :src="`${url}/${item?.icon[0]}`" alt="" class=" h-12 rounded-md" />
              </a>
              <img
                v-else
                src="../../../../assets/images/not-image.png"
                alt=""
                class="w-14 rounded-md"
              />
            </td>
            <td class="td md-max:text-[13px]">
              {{ item?.title }}
            </td>
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
            <td class="td">{{ convertDate(item?.createdAt, 'full') }}</td>
            <td class="td">
              <button
              @click="changeStatus(item?._id, item?.status)"
              :class=" item?.status == 'active' ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-3 py-1 w-[80px]' : 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-3 py-1 w-[80px]'"
              >
                {{ item?.status == 'active' ? "Актив" : "Не актив" }}
              </button>
            </td>
            <td class="td-last">
              <button
                type="button"
                class="bg-[#FFE6E6] text-[#FF5558] hover:bg-[#FF5558] hover:text-white rounded-lg flex items-center justify-center size-9 lg:size-8"
                @click="confirmRemove(item._id)"
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
import { convertDate } from '@/helpers/func'
import { TrashIcon } from '@heroicons/vue/24/outline'
const url = import.meta.env.VITE_URL
import { useI18n } from 'vue-i18n' 
const { t } = useI18n()
const toggle = ref(false)
// const limit = ref(30)
defineProps(['options', 'page', 'limit'])

import { newsCategoryStore } from '@/stores/data/newscategory'
import { storeToRefs } from 'pinia'
const store = newsCategoryStore()
const { newCategories } = storeToRefs(store)

const _id = ref('')

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const edit = (id, lang) => {
  usefull.setToggle(true, id, lang)
}


const changeStatus = async(id, status) => {
  let newStatus = status === "active" ? "inactive" : "active";
  await store.changeStatus(id,newStatus)
}



const confirmRemove = (id) => {
  _id.value = id
  toggle.value = true
}

const remove = async (answer) => {
  if (answer) {
    await store.removeNewsCategory(_id.value, t)
  }
  close()
}

const close = () => {
  toggle.value = false
}

</script>
<style lang=""></style>