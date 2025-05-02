<template>
  <div v-if="data" class="flex flex-col overflow-hidden">
    <div class="w-full overflow-y-auto flex-1 text-[13px]">
      <div class="p-5">
        <div class="text-lg font-medium text-center mb-3">{{ data?.trans?.title }}</div>
        <div v-html="data?.trans?.text" class="prose max-w-none text-base"></div>
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-14">Пока нет данных</div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref('')

import { newsStore } from '@/stores/data/news'
const store = newsStore()
import { convertDateShort } from '@/helpers/func'

const data = ref({})


const getData = async () => {
  if (!id.value || !route.name) return false
  console.log("route",route.name);
  
  const res = await store.getViewNews(route.params.id, route.name)
    console.log("res", res);
    
    data.value = res
}

onMounted(() => {
  id.value = route.params.id
  getData()
})

watch(() => route.name, () => {
  getData()
})

</script>