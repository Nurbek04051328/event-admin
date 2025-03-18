<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.adsCount"
    >
      
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <AdTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <AdDialog
        :options="{
          languages
        }"
      />
    </div>
    <div class="pl-4 pb-2">
      <paginate
        v-if="store.adsCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.adsCount / limit)"
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
import { storeToRefs } from 'pinia';
import AdTable from '@/components/data/dashboard/ad/adTable.vue'
import AdDialog from '@/components/data/dashboard/ad/adDialog.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { adsStore } from '@/stores/data/ads'
const store = adsStore()
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
  await store.getAds({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await getData()
})
</script>
<style lang=""></style>
