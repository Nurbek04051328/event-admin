<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart
    :count="store.routeLoggers.count"
    >
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <LoggerTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 pb-2">
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