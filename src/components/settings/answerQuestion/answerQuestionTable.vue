<template>
  <div class="ring-1 w-full ring-gray-300 sm:mx-0 rounded-lg " :class="answerQuestions.length > 0 ? 'overflow-auto' : ''">
    <table class="w-full divide-y">
      <thead>
        <tr>
          <th scope="col" class="th-first md-max:text-[13px]">№</th>
          <th scope="col" class="th md-max:text-[13px]">Вопрос</th>
          <th scope="col" class="th md-max:text-[13px]">Ответ</th>
          <th scope="col" class="th md-max:text-[13px]">Переводы</th>
          <th scope="col" class="th md-max:text-[13px]" width="150">Дата</th>
          <th scope="col" class="th">Статус</th>
          <th scope="col" class="th-last" width="150"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-if="answerQuestions.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">
            Пока данных нет
          </td>
        </tr>
        <tr
          v-for="(item, itemIdx) in answerQuestions"
          :key="item?._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first md-max:text-[13px]">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td class="td md-max:text-[13px]">{{ item?.question || $t('subcategory.table.notadd') }}</td>
          <td class="td md-max:text-[13px] relative group max-w-[300px]">
            <div
              class="line-clamp-1 overflow-hidden text-ellipsis"
              v-html="item?.answer || $t('subcategory.table.notadd')"
            ></div>

            <!-- Tooltip (hover qilinganda chiqadi) -->
            <!-- <div
              class="absolute z-99 hidden group-hover:block bg-white shadow-md border p-3 text-sm max-w-[400px] w-max top-full mt-1 break-words whitespace-normal"
              v-html="item?.answer"
            ></div> -->
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
    :title="$t('category.dialog.deletetitle')"
    :btnTitle="$t('category.dialog.btnTitle')"
    @answer="remove"
    :dialog="toggle"
  />
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { convertDateShort } from '@/helpers/func'
import { TrashIcon } from '@heroicons/vue/24/outline'
const url = import.meta.env.VITE_URL

const toggle = ref(false)

defineProps(['options', 'page', 'limit'])

import { answerQuestionStore } from '@/stores/data/answerQuestion'
const answerQuestion_store = answerQuestionStore()
const { answerQuestions } = storeToRefs(answerQuestion_store)


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
  await answerQuestion_store.changeStatus(id,newStatus)
}

const remove = async (answer) => {
  if (answer) {
    await answerQuestion_store.removeAnswerQuestion(_id.value, t)
  }
  close()
}

const close = () => {
  toggle.value = false
}


</script>
<style lang=""></style>