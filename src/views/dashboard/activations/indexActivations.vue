<template>
  <headPart>
    <div class="mr-2 md-max:text-[14px]">
      <span class="text-lg text-gray-500 md-max:text-[14px]">Количество</span>: {{ activation_store.activation.count }}
    </div>
  </headPart>
  <div class="p-4 flex-1 flex flex-col items-start overflow-hidden">
    <ActivationTable :page="page" :limit="limit" />
    <paginate
      v-if="activation_store.activation.count > limit"
      v-model="page"
      :page-count="Math.round(activation_store.activation.count / limit)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :page-class="'page-item'"
      :container-class="'pagination_next shadow'"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import paginate from 'vuejs-paginate-next'
import ActivationTable from '@/components/data/dashboard/activation/activationTable.vue'

const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await activation_store.getActivations({ limit: limit.value, page: page.value })
}

import { activationStore } from '@/stores/data/activation'
const activation_store = activationStore()

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
