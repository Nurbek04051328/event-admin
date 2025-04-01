<template>
  <div
    class="ring-1 w-full ring-gray-300 rounded-lg sm:mx-0 overflow-hidden"
    :class="regions.length > 0 ? 'overflow-auto' : ''"
  >
    <table class="w-full divide-y">
      <thead>
        <tr>
          <th scope="col" class="th-first md-max:text-[13px]">№</th>
          <th scope="col" class="th md-max:text-[13px]">Название</th>
          <th scope="col" class="th md-max:text-[13px]">Координаты</th>
          <th scope="col" class="th md-max:text-[13px]">Переводы</th>
          <th scope="col" class="th md-max:text-[13px]" width="150">Дата</th>
          <th scope="col" class="th">Статус</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-if="regions.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">
            Нет данных
          </td>
        </tr>
        <tr
          v-for="(item, itemIdx) in regions"
          :key="item?._id"
          class="hover:bg-gray-100"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first md-max:text-[13px]">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td
            class="td md-max:text-[13px] cursor-pointer"
            @click="$router.push({ name: 'subregion', params: { id: item?._id } })"
          >
            {{ item?.title || $t('subregion.table.notadd') }}
          </td>
          <td class="td">{{ item?.cordinates.lat }} - {{ item?.cordinates.long }}</td>
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
    :title="$t('region.dialog.deletetitle')"
    :btnTitle="$t('region.dialog.btnTitle')"
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

const toggle = ref(false)

defineProps(['options', 'page', 'limit'])

import { regionStore } from '@/stores/data/regions'
import { storeToRefs } from 'pinia'
const store = regionStore()
const { regions } = storeToRefs(store)



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

const changeStatus = async(id, status) => {
  let newStatus = status === "active" ? "inactive" : "active";
  await store.changeStatus(id,newStatus)
}

const remove = async (answer) => {
  if (answer) {
    await store.removeRegion(_id.value, t)
  }
  close()
}

const close = () => {
  toggle.value = false
}


</script>
<style lang=""></style>
