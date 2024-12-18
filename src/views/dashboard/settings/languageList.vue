<template>
  <head-part>
    <div class="mr-2 md-max:text-[14px]">
      <span class="text-lg text-gray-500 md-max:text-[14px]">Количество</span>: {{ store.languageCount }}
    </div>
  </head-part>
  <div class="p-4 flex-1 flex flex-col items-start overflow-hidden">
    <languageTable :page="page" :limit="limit" />
    <paginate
      v-if="store.languageCount > limit"
      v-model="page"
      :page-count="Math.ceil(store.languageCount / limit)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :page-class="'page-item'"
      :container-class="'pagination_next shadow'"
    />
  </div>
  <languageDialog />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import paginate from 'vuejs-paginate-next'
import languageTable from '@/components/settings/language/languageTable.vue'
import languageDialog from '@/components/settings/language/languageDialog.vue'
import { languageStore } from '@/stores/data/language'
const store = languageStore()

const page = ref(1)
const limit = ref(30)


const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getlanguages({ limit: limit.value, page: page.value })
}


onMounted(() => {
  getData()
})

</script>
<style lang=""></style>
