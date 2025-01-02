<template>
  <head-part>
    <div class="mr-2 md-max:text-[14px]">
      <span class="text-lg text-gray-500 md-max:text-[14px]">Количество</span>: {{ page_store.pagesCount }}
    </div>
  </head-part>
  <PagesTable
    :options="{
      languages
    }"
  />
  <PagesDialog
    :options="{
      languages
    }"
  />
</template>
<script setup>
import { storeToRefs } from 'pinia'
import PagesTable from '@/components/settings/page/pageTable.vue'
import PagesDialog from '@/components/settings/page/pageDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { pageStore } from '@/stores/data/page'
import { onMounted } from 'vue'
const page_store = pageStore()

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await page_store.getPages()
})
</script>
<style lang=""></style>
