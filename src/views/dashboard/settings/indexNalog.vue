<template>
  <head-part>
    <div class="mr-2 md-max:text-[14px]">
      <span class="text-lg text-gray-500 md-max:text-[14px]">Количество</span>: {{ tax_store.taxesCount }}
    </div>
  </head-part>
  <div class="p-4 flex-1 flex flex-col items-start overflow-hidden">
    <TaxesTable
      :options="{
        languages
      }"
    />
  </div>
  <paginate
    v-if="tax_store.taxesCount > limit"
    v-model="page"
    :page-count="Math.ceil(tax_store.taxesCount / limit)"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Пред'"
    :next-text="'След'"
    :page-class="'page-item'"
    :container-class="'pagination_next shadow'"
  />
  <TaxesDialog
    :options="{
      languages
    }"
  />
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import paginate from 'vuejs-paginate-next'
import TaxesTable from '@/components/settings/nalog/nalogTable.vue'
import TaxesDialog from '@/components/settings/nalog/nalogDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { taxStore } from '@/stores/data/nalog'
const tax_store = taxStore()

const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await tax_store.getTaxes({ limit: limit.value, page: page.value })
}


onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  getData()
})
</script>
<style lang=""></style>