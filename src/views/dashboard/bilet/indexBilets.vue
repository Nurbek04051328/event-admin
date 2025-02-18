<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.bilets.count"
    >
      <BiletSearch />
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <BiletTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="store.bilets.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.bilets.count / limit)"
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
import { ref, onMounted } from 'vue'
import paginate from 'vuejs-paginate-next'
import BiletTable from '@/components/data/dashboard/bilet/biletTable.vue'
import BiletSearch from '@/components/data/dashboard/bilet/biletSearch.vue'

const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getBilets({ limit: limit.value, page: page.value })
}

import { biletStore } from '@/stores/data/bilet'
const store = biletStore()

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
