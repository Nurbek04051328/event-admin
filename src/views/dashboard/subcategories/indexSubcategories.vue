<template>
  <head-part>
    <div class="mr-2 md-max:text-[14px]">
      <span class="text-lg text-gray-500 md-max:text-[14px]">Количество</span>: {{ store.subcategoryCount }}
    </div>
  </head-part>
  <div class="p-4 flex-1 flex flex-col items-start overflow-hidden">
    <SubcategoryTable
      :options="{
        languages
      }"
    />
    <paginate
      v-if="store.subcategoryCount > limit"
      v-model="page"
      :page-count="Math.ceil(store.subcategoryCount / limit)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :page-class="'page-item'"
      :container-class="'pagination_next shadow'"
    />
    <SubcategoryDialog
      :options="{
        languages
      }"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import paginate from 'vuejs-paginate-next'
import SubcategoryTable from '@/components/data/dashboard/subcategory/subcategoryTable.vue'
import SubcategoryDialog from '@/components/data/dashboard/subcategory/subcategoryDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { subcategoryStore } from '@/stores/data/subcategories'
import { categoryStore } from '@/stores/data/categories'

const category_store = categoryStore()
const store = subcategoryStore()


const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await language_store.getlanguages({ limit: 0 })
  await category_store.getCategories({ limit: 0, type: true })
  await store.getSubcategories()
}


onMounted(async () => {
  getData()
})
</script>
<style lang=""></style>
