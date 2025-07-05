<template>
    <div v-if="store.logger.data?.length > 0" class="flex flex-col overflow-hidden">
      <div class="w-full overflow-y-auto flex-1 text-[13px]">
        <div v-for="log of store.logger.data" :key="log._id" class="p-2 xm-max:text-[11px]">
          {{ log.action }}
          <span class="font-medium">
            {{ log?.actionFrom?.lname }}
            {{ log?.actionFrom?.name }}
          </span>
          поменял права организатора на 
          <span :class="actionsall.find((a) => a._id == log.action)?.class">
            {{ actionsall.find((a) => a._id == log.action)?.label }}
          </span>
          в <span class="font-medium">{{ convertDateShort(log.createdAt, 'full') }}</span>
          <span v-if="log.file?.length > 0">
            с файлами
            <button
              v-for="file of log.file"
              @click="download(file)"
              :key="file._id"
              class="p-1 cursor-pointer"
            >
              <DocumentTextIcon class="size-4 text-amber-500" />
            </button>
          </span>
          <div v-if="log.description" class="text-xs mt-1">Примечение: {{ log.description }}</div>
        </div>
      </div>
      <div class="pb-2">
        <paginate
          v-if="store.logger.count > limit"
          v-model="page"
          :page-count="Math.ceil(store.logger.count / limit)"
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
    <div v-else class="text-center mt-14">
      Пока нет история
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import paginate from 'vuejs-paginate-next'

const route = useRoute()
const id = ref('')
const limit = ref(30)
const page = ref(1)

import { loggerStore } from '@/stores/user/logger'
const store = loggerStore()

import { download } from '@/helpers/func'
import { actionsall } from '@/helpers/vars'
import { convertDateShort } from '@/helpers/func'
import { DocumentTextIcon } from '@heroicons/vue/20/solid'


const clickCallback = async (value) => {
  page.value = value
  await getLoggers()
}




const getLoggers = async () => {
  if (!id.value) return false
  await store.userLogger({
    limit: limit.value,
    page: page.value,
    user: id.value
  })
}

onMounted(() => {
  id.value = route.params.id
  getLoggers()
})
</script>
<style lang=""></style>
