<template>
  <headPart>
    <div class="flex items-center xm-max:flex-col xm-max:items-end">
      <div class="mr-2 md-max:text-[14px]">
        <span class="text-lg text-gray-500 md-max:text-[14px]">Количество</span>:
        {{ store.routeLoggers.count }}
      </div>
    </div>
  </headPart>
  <div class="p-4 flex-1 flex flex-col items-start overflow-hidden">
    <LoggerTable :page="page" :limit="limit" />
    <paginate
      v-if="store.routeLoggers.count > limit"
      v-model="page"
      :page-count="Math.ceil(store.routeLoggers.count / limit)"
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
import LoggerTable from '@/components/data/dashboard/logger/loggerTable.vue'
import { loggerStore } from '@/stores/user/logger'
const store = loggerStore()


const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getrouteLoggers({ limit: limit.value, page: page.value })
}



onMounted(() => {
  getData()
})
</script>
<style lang=""></style>