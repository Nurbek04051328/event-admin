<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart :count="store.organizer.count">
      <OrganizerSearch v-model="search" @searching="getData" />
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <OrganizerTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 pb-2">
      <paginate
        v-if="store.organizer.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.organizer.count / limit)"
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
import OrganizerTable from '@/components/data/dashboard/organizer/organizerTable.vue'
import OrganizerSearch from '@/components/data/dashboard/organizer/organizerSearch.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'

import { organizerStore } from '@/stores/user/organizer'
const store = organizerStore()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// Pagination
const page = ref(1)
const limit = ref(30)
const search = ref({})

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  const filtered = Object.fromEntries(
    Object.entries(search.value).filter(([_, v]) => v !== '')
  )
  
  router.push({ name: route.name, query: { ...filtered } })
  await store.getorganizers({ limit: limit.value, page: page.value, ...filtered })
}

onMounted(async () => {
  await getData()
})
</script>
<style lang=""></style>
