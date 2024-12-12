<template>
  <div class="flex-1 h-full w-full overflow-auto">
    <div class="inline-block min-w-full align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="th-first md-max:text-[13px]">№</th>
            <th scope="col" class="th md-max:text-[13px]">{{ $t('ticketPackage.table.title') }}</th>
            <!-- <th scope="col" class="th">{{ $t('ticketPackage.table.text') }}</th> -->
            <th scope="col" class="th md-max:text-[13px]">{{ $t('ticketPackage.table.quantity') }}</th>
            <th scope="col" class="th md-max:text-[13px]">{{ $t('ticketPackage.table.commissionRate') }}</th>
            <th scope="col" class="th md-max:text-[13px]">{{ $t('ticketPackage.table.language') }}</th>
            <th scope="col" class="th md-max:text-[13px]" width="150">{{ $t('worker.table.data') }}</th>
            <th scope="col" class="th-last" width="150"></th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, itemIdx) in tarifs"
            :key="item._id"
            :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
          >
            <td class="td-first md-max:text-[13px]">
              {{ itemIdx + 1 }}
            </td>
            <td class="td md-max:text-[13px]">{{ item?.title }}</td>
            <!-- <td class="td">{{ item?.description }}</td> -->
            <td class="td md-max:text-[13px]">{{ item?.quantity }}</td>
            <td class="td md-max:text-[13px]">{{ item?.commissionRate }}</td>
            <td class="td">
              <div class="flex items-start gap-2">
                <button
                  @click="edit(item._id, lang.slug)"
                  :class="`${
                    item?.translates?.some((tr) => tr.language == lang.slug)
                      ? 'success-btn'
                      : 'edit-btn'
                  } w-auto p-2 px-3 md-max:p-1 md-max:px-2`"
                  v-for="lang of options?.languages"
                  :key="lang._id"
                >
                  {{ lang.slug }}
                </button>
              </div>
            </td>
  
            <td class="td">{{ convertDate(item.createdAt, 'full') }}</td>
            <td class="td flex">
              <button
                type="button"
                class="danger-btn size-9 ml-auto md-max:size-7"
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
import { useI18n } from 'vue-i18n' 
const { t } = useI18n()
const toggle = ref(false)
// const limit = ref(30)
defineProps(['options', 'page', 'limit'])

import { tarifStore } from '@/stores/data/tarif'
import { storeToRefs } from 'pinia'
const store = tarifStore()
const { tarifs } = storeToRefs(store)

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
    await store.removeTarif(_id.value, t)
  }
  close()
}

const close = () => {
  toggle.value = false
}

</script>
<style lang=""></style>
