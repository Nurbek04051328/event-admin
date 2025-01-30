<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.tarifsCount"
    >
      
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <TarifTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <tarifDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 pb-2">
      <paginate
        v-if="store.tarifsCount > limit"
        v-model="page"
        :page-count="Math.round(store.tarifsCount / limit)"
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
// import { storeToRefs } from 'pinia';
import TarifTable from '@/components/data/dashboard/tarif/tarifTable.vue'
import TarifDialog from '@/components/data/dashboard/tarif/tarifDialog.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { languageStore } from '@/stores/data/language'
import { tarifStore } from '@/stores/data/tarif'
const language_store = languageStore()
const store = tarifStore()
const { languages } = storeToRefs(language_store)


// Pagination
const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getTarifs({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await store.getTarifs()
  await language_store.getlanguages({ limit: 0 })
  await getData()
})
</script>
<style lang=""></style>
