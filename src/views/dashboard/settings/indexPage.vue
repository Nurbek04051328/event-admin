<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
      :count="page_store.pagesCount"
    >
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <PagesTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <PagesDialog
        :options="{
          languages
        }"
      />
    </div>
  </div>
  
</template>
<script setup>
import { storeToRefs } from 'pinia'
import PagesTable from '@/components/settings/page/pageTable.vue'
import PagesDialog from '@/components/settings/page/pageDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)


const page = ref(1)
const limit = ref(30)

import { pageStore } from '@/stores/data/page'
import { onMounted, ref } from 'vue'
const page_store = pageStore()

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await page_store.getPages({limit: limit.value, page: page.value})
})
</script>
<style lang=""></style>
