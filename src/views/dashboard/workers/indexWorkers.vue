<template>
  <div class="h-screen">
    <headPart>
      <div class="mr-2">
        <span class="text-lg text-gray-500">Количество</span>: {{ store.workersCount }}
      </div>
    </headPart>
    <div class="p-4 pb-0 w-full h-[78%] sm:h-[76%] xl:h-[85%]">
      <WorkerTable :page="page" :limit="limit" />
      <WorkerDialog />
    </div>
    <div class="pl-4 pb-2">
      <paginate
        v-if="store.workersCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.workersCount / limit)"
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
import WorkerTable from '@/components/data/dashboard/worker/workerTable.vue'
import WorkerDialog from '@/components/data/dashboard/worker/workerDialog.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'

import { categoryStore } from '@/stores/data/categories'
import { workerStore } from '@/stores/data/workers'
const category_store = categoryStore()
const store = workerStore()

// Pagination
const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getWorkers({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await category_store.getCategories({ limit: 0, type: true })
  await getData()
})
</script>
<style lang=""></style>
