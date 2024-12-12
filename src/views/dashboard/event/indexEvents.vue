<template>
  <div class="h-screen">
    <headPart>
      <div class="mr-2">
        <span class="text-lg text-gray-500 xm:text-base">Количество</span>: {{ store.eventsCount }}
      </div>
    </headPart>
    <div class="p-4 pb-0 w-full h-[78%] sm:h-[76%] xl:h-[85%]">
      <EventTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 pb-2">
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
.pagination_next {
  display: inline-flex;
  position: relative;
  margin-top: 20px;
  z-index: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #0000000d;
}

.pagination_next > * {
  display: inline-flex;
  align-items: center;
  color: rgba(17, 24, 39, 1);
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  background-color: white;
}

.pagination_next li a {
  padding: 9px 16px;
  cursor: pointer;
  border-left: 1px solid rgba(229, 231, 235, 1);
}

.pagination_next > .page-item:not(:last-child) {
  margin-right: -1px;
}

.pagination_next > *:hover {
  background-color: #f9fafb;
}

.pagination_next > *:focus {
  z-index: 20;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.pagination_next > .disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination_next .active {
  background-color: #2563eb;
  color: white;
}
</style>
