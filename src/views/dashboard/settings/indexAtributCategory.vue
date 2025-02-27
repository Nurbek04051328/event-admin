<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
    :count="store.atributeCategoryCount"
    >
    <AtributCategorySearch />
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <AtributCategoryTable
        :options="{
          languages
        }"
      />
      <AtributCategoryDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="store.atributeCategoryCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.atributeCategoryCount / limit)"
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
import AtributCategoryTable from '@/components/data/dashboard/atributCategory/atributCategoryTable.vue'
import AtributCategoryDialog from '@/components/data/dashboard/atributCategory/atributCategoryDialog.vue'
import AtributCategorySearch from '@/components/data/dashboard/atributCategory/atributCategorySearch.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { atributeCategoryStore } from '@/stores/data/atributCategory'
const store = atributeCategoryStore()

const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getAtributeCategories({ limit: limit.value, page: page.value })
}


onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  getData()
})
</script>
<style lang=""></style>