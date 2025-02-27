<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
    :count="store.atributsCount"
    >
      <AtributSearch />
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <AtributTable
        :options="{
          languages
        }"
      />
      <AtributDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="store.atributsCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.atributsCount / limit)"
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
import { onMounted, ref } from 'vue'
import paginate from 'vuejs-paginate-next'
import AtributTable from '@/components/data/dashboard/atribut/atributTable.vue'
import AtributDialog from '@/components/data/dashboard/atribut/atributDialog.vue'
import AtributSearch from '@/components/data/dashboard/atribut/atributSearch.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { atributStore } from '@/stores/data/atribut'


const store = atributStore()


const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await language_store.getlanguages({ limit: 0 })
  await store.getAtributes({attributeCategory: route.params.id})
}


onMounted(async () => {
  getData()
})
</script>
<style lang=""></style>