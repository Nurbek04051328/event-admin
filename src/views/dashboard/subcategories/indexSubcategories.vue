<template>
  <head-part />

    <SubcategoryTable
      :options="{
        languages
      }"
    />
    <SubcategoryDialog
      :options="{
        languages
      }"
    />
</template>
<script setup>
import { storeToRefs } from 'pinia'
import SubcategoryTable from '@/components/data/dashboard/subcategory/subcategoryTable.vue'
import SubcategoryDialog from '@/components/data/dashboard/subcategory/subcategoryDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { subcategoryStore } from '@/stores/data/subcategories'
import { categoryStore } from '@/stores/data/categories'
import { onMounted } from 'vue'
const category_store = categoryStore()
const store = subcategoryStore()

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await category_store.getCategories({ limit: 0, type: true })
  await store.getSubcategories()
})
</script>
<style lang=""></style>
