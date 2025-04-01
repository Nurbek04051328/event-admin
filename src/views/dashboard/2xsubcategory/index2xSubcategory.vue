<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
    :count="subcategory2x_store.subcategory2xCount"
    >
      <SubCategory2xSearch />
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <Subcategory2xTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <Subcategory2xDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="subcategory2x_store.subcategory2xCount > limit"
        v-model="page"
        :page-count="Math.ceil(subcategory2x_store.subcategory2xCount / limit)"
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
import Subcategory2xTable from '@/components/data/dashboard/2xsubcategory/subcategory2xTable.vue'
import Subcategory2xDialog from '@/components/data/dashboard/2xsubcategory/subcategory2xDialog.vue'
import SubCategory2xSearch from '@/components/data/dashboard/2xsubcategory/subcategory2xSearch.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)


import { subcategory2xStore } from '@/stores/data/2xsubcategory'

const subcategory2x_store = subcategory2xStore()


const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await language_store.getlanguages({ limit: 0 })
  await subcategory2x_store.get2xSubcategories({ limit: 0, subcategory: route.params.subcategory })
}


onMounted(async () => {
  getData()
})
</script>
<style lang=""></style>