<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
    :count="store.languageCount"
    >
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <languageTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 py-2">
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
