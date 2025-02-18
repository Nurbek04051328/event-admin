<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="activation_store.activation.count"
    >
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <ActivationTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 py-2">
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
