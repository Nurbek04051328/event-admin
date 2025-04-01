<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part :count="store.regionCount"> </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <RegionTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <RegionDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="store.regionCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.regionCount / limit)"
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
import RegionTable from '@/components/data/dashboard/region/regionTable.vue'
import RegionDialog from '@/components/data/dashboard/region/regionDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { regionStore } from '@/stores/data/regions'
const store = regionStore()

const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getRegions({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  getData()
})
</script>
<style lang=""></style>
