<template>
  <div class="ring-1 w-full flex-1 ring-gray-300 rounded-lg overflow-auto">
    <table class="min-w-full ">
      <thead>
        <tr>
          <th scope="col" class="th-first md-max:text-[13px]">№</th>
          <th scope="col" class="th md-max:text-[13px]">{{ $t('language.table.name') }}</th>
          <th scope="col" class="th md-max:text-[13px]">{{ $t('language.table.slug') }}</th>
          <th scope="col" class="th md-max:text-[13px] text-center">{{ $t('language.table.select') }}</th>
          <th scope="col" class="th md-max:text-[13px]">{{ $t('language.table.data') }}</th>
          <th scope="col" class="th-last"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(item, itemIdx) in languages"
          :key="item._id"
          class="hover:bg-gray-100 "
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first md-max:text-[13px]">
            {{ itemIdx + 1 }}
          </td>
          <td class="td md-max:text-[13px]">{{ item.title }}</td>
          <td class="td md-max:text-[13px]">{{ item.slug }}</td>
          <td class="td md-max:text-[13px] text-center">
            <defaultCheckbox
              v-model="item.isDefault"
              @click="changeIsDefault(item._id, item.isDefault)"
              class="md-max:text-base"
            />
          </td>
          <td class="td md-max:text-[13px]">{{ convertDate(item.createdAt, 'full') }}</td>
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
    :title="$t('language.dialog.deletetitle')"
    :btnTitle="$t('language.dialog.btnTitle')"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps(['page', 'limit'])
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { convertDate } from '@/helpers/func'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'

const toggle = ref(false)

import { languageStore } from '@/stores/data/language'
const store = languageStore()
const { languages } = storeToRefs(store)

const changeIsDefault = async (_id) => {
  await store.changeIsDefault(_id, t)
}

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
    await store.removelanguage(_id.value, t)
  }
  close()
}
const close = () => {
  toggle.value = false
}

</script>
<style lang=""></style>
