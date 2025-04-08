<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <div class="font-semibold">Название мероприятия</div>
      <defaultInput v-model="data.title" name="title" />
    </div>
    <div class="space-y-2">
      <div class="font-semibold">Описание мероприятия</div>
      <defaultTextarea v-model="data.description" name="text" :rows="5" />
    </div>
    <div class="space-y-2">
      <div class="font-semibold">Регион</div>
      <customSelect :options="regions" name="region" v-model="data.region" option_title="title" />
    </div>

    <div class="space-y-2">
      <div class="font-semibold">На каких языках будет мероприятие</div>
      <div class="space-y-4 relative">
        <customSelect
          v-for="(language, index) of data.languages"
          :key="index"
          :options="languages"
          :placeholder="t('selectPlaceholder')"
          name="language"
          v-model="data.languages[index]"
          option_title="title"
          :clean="true"
          @clear="languageRemove(index)"
        />
      </div>
      <button
        class="text-third mt-[10px]"
        @click="addLanguage"
        v-if="data.languages?.length < languages.length"
      >
        + <span class="underline underline-offset-2">{{ t('1.add') }}</span>
      </button>
    </div>

    <div class="space-y-2">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1">
          <div class="font-semibold">Категорию</div>
          <customSelect
            :options="categories"
            name="category"
            v-model="data.fCategory.category"
            option_title="title"
            @change="chooseCategory(data.fCategory.category)"
          />
        </div>
        <div class="col-span-1">
          <div class="font-semibold">Под категория</div>
          <customSelect
            :options="categories"
            name="category"
            v-model="data.fCategory.category"
            option_title="title"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import defaultCheckbox from './layout/defaultCheckbox.vue'
import customSelect from './layout/customSelect.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { mainStore } from '@/stores/data/default'
import { storeToRefs } from 'pinia'
const main = mainStore()
const { regions } = storeToRefs(main)

import { languages } from '@/helpers/vars'

import apiClient from '@/helpers/api'

const languageRemove = (index) => {
  if (index == 0 && data.value.languages?.length == 1) {
    data.value.languages[index] = ''
    return
  }
  data.value.languages.splice(index, 1)
}

const categories = ref([])
const subcategories = ref([])
const sSubcategories = ref([])
const childcategories = ref([])
const sChildcategories = ref([])

const getCategories = async () => {
  const res = await apiClient.get('api/default/all-category-info', {
    params: {
      limit: 0
    }
  })
  console.log(res.data)
  categories.value = [...res.data]
}

const data = defineModel()
const addLanguage = () => {
  if (data.value.languages?.at(-1)) data.value.languages.push('')
}

onMounted(() => {
  getCategories()
})
</script>
<style lang=""></style>
