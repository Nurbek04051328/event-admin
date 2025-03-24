<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.newsCount"
    >
    <NewsSearch />
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <NewsTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <NewsDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 pb-2">
      <paginate
        v-if="store.newsCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.newsCount / limit)"
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
import NewsTable from '@/components/data/dashboard/news/newsTable.vue'
import NewsDialog from '@/components/data/dashboard/news/newsDialog.vue'
import NewsSearch from '@/components/data/dashboard/news/newsSearch.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { newsStore } from '@/stores/data/news'
const store = newsStore()


import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)


// Pagination
const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getNews({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await getData()
})
</script>
<style lang=""></style>