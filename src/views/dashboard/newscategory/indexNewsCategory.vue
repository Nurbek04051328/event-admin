<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
    :count="newscategory_store.newCategoryCount"
    >
    <CategorySearch />
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <CategoryTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <CategoryDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="newscategory_store.newCategoryCount > limit"
        v-model="page"
        :page-count="Math.ceil(newscategory_store.newCategoryCount / limit)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Пред'"
        :next-text="'След'"
        :page-class="'page-item'"
        :container-class="'pagination_next shadow'"
      />
    </div>
  </div>
  
  
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import paginate from 'vuejs-paginate-next'
import CategoryTable from '@/components/data/dashboard/newscategory/newscategoryTable.vue'
import CategoryDialog from '@/components/data/dashboard/newscategory/newscategoryDialog.vue'
import CategorySearch from '@/components/data/dashboard/newscategory/newscategorySearch.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { newsCategoryStore } from '@/stores/data/newscategory'
const newscategory_store = newsCategoryStore()

const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await newscategory_store.getNewsCategories({ limit: limit.value, page: page.value })
}


onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  getData()
})
</script>
<style lang=""></style>
