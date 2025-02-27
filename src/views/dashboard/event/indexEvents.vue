<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.eventsCount"
    >
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <EventTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="store.eventsCount > limit"
        v-model="page"
        :page-count="Math.ceil(store.eventsCount / limit)"
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
import EventTable from '@/components/data/dashboard/event/eventTable.vue'
import { eventStore } from '@/stores/data/event'
const store = eventStore()

const limit = ref(30)
const page = ref(1)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getEvents({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await getData()
})
</script>
<style>

</style>
