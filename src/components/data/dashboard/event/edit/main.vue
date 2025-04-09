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
      <div class="font-semibold">На каких языках будет мероприятие</div>
      <div class="relative grid grid-cols-2 gap-4">
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
          <div class="font-semibold">Категория</div>
          <customSelect
            :options="category_store.categories"
            name="fcategory"
            v-model="data.fCategory.category"
            @change="getfSubcategories"
            option_title="title"
          />
        </div>
        <div class="col-span-1">
          <div class="font-semibold">Подкатегория</div>
          <customSelect
            :options="subcategory_store.subcategories"
            name="fsubcategory"
            v-model="data.fCategory.subcategory"
            @change="getf2xSubcategories"
            option_title="title"
          />
        </div>
        <div class="col-span-1">
          <div class="font-semibold">Подподкатегория</div>
          <customSelect
            :options="sub2x_store.subcategories2x"
            name="f2xsubcategory"
            v-model="data.fCategory.x2Subcategory"
            option_title="title"
          />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1">
          <div class="font-semibold">Дополнительная категория</div>
          <customSelect
            :options="category_store.categories"
            name="scategory"
            v-model="data.sCategory.category"
            option_title="title"
            @change="getsSubcategories"
          />
        </div>
        <div class="col-span-1">
          <div class="font-semibold">Под категория</div>
          <customSelect
            :options="subcategory_store.sSubcategories"
            name="category"
            @change="gets2xSubcategories"
            v-model="data.sCategory.subcategory"
            option_title="title"
          />
        </div>
        <div class="col-span-1">
          <div class="font-semibold">Подподкатегория</div>
          <customSelect
            :options="sub2x_store.sSubcategories2x"
            name="f2xsubcategory"
            v-model="data.sCategory.x2Subcategory"
            option_title="title"
          />
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <div class="font-semibold">Как будет проводится это мероприятие?</div>
      <div class="flex gap-6">
        <input
          type="radio"
          name="spend"
          v-model="data.spend"
          value="myself"
          class="hidden"
          id="myself"
        />
        <label class="flex gap-[10px] items-center" for="myself">
          <div
            :class="{
              checked: data.spend == 'myself',
              unchecked: data.spend != 'myself'
            }"
          ></div>
          <div>Сам организатор</div>
        </label>
        <input
          type="radio"
          name="spend"
          v-model="data.spend"
          value="team"
          class="hidden"
          id="team"
        />
        <label class="flex gap-[10px] items-center" for="team">
          <div
            :class="{
              checked: data.spend == 'team',
              unchecked: data.spend != 'team'
            }"
          ></div>
          <div>Есть команда, которая помогает встречать гостей</div>
        </label>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">Уникальные навыки используется на мероприятии</div>
      <defaultTextarea v-model="data.uniqueEventSkill" name="uniquie" :rows="5" />
    </div>
  </div>
</template>
<script setup>
import customSelect from './layout/customSelect.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { mainStore } from '@/stores/data/default'
import { storeToRefs } from 'pinia'
const main = mainStore()
const { regions } = storeToRefs(main)

import { languages } from '@/helpers/vars'

const languageRemove = (index) => {
  if (index == 0 && data.value.languages?.length == 1) {
    data.value.languages[index] = ''
    return
  }
  data.value.languages.splice(index, 1)
}

import { categoryStore } from '@/stores/data/categories'
const category_store = categoryStore()

import { subcategoryStore } from '@/stores/data/subcategories'
const subcategory_store = subcategoryStore()
const getfSubcategories = async () => {
  if (data.value.fCategory.category)
    await subcategory_store.getSubcategories({
      limit: 0,
      category: data.value.fCategory.category
    })
}
const getsSubcategories = async () => {
  if (data.value.sCategory.category)
    await subcategory_store.getSubcategories(
      {
        limit: 0,
        category: data.value.sCategory.category
      },
      true
    )
}

import { subcategory2xStore } from '@/stores/data/2xsubcategory'
const sub2x_store = subcategory2xStore()
const getf2xSubcategories = async () => {
  if (data.value.fCategory.subcategory)
    await sub2x_store.get2xSubcategories({
      limit: 0,
      subcategory: data.value.fCategory.subcategory
    })
}
const gets2xSubcategories = async () => {
  if (data.value.sCategory.subcategory)
    await sub2x_store.get2xSubcategories(
      {
        limit: 0,
        subcategory: data.value.sCategory.subcategory
      },
      true
    )
}

const data = defineModel()
const addLanguage = () => {
  if (data.value.languages?.at(-1)) data.value.languages.push('')
}
</script>
<style lang=""></style>
