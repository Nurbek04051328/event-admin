<template>
  <div class="divide-y-2 divide-gray-100 text-sm">
    <div v-if="store.eventLoggers.data?.length > 0">
      <div v-for="log of store.eventLoggers.data" :key="log._id" class="p-2">
        <span class="font-bold">
          {{ log?.actionFrom?.lname }}
          {{ log?.actionFrom?.name }}
        </span>
        поменял права мероприятия на
        <span :class="actions.find((a) => a._id == log.action)?.class">
          {{ actions.find((a) => a._id == log.action)?.label }}
        </span>
        в <span class="font-bold">{{ convertDateShort(log.createdAt, 'full') }}</span>
        <span v-if="log?.file?.length > 0">
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
        <div v-if="log?.description" class="text-xs mt-1">Примечение: {{ log?.description }}</div>
      </div>
    </div>
    <div v-else class="text-center mt-14">
      Пока нет история
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref('')
const limit = ref(30)
const page = ref(1)

import { loggerStore } from '@/stores/user/logger'
const store = loggerStore()

import { download } from '@/helpers/func'
import { actions } from '@/helpers/vars'
import { convertDateShort } from '@/helpers/func'
import { DocumentTextIcon } from '@heroicons/vue/20/solid'

const getLoggers = async () => {
  if (!id.value) return false
  await store.eventLogger({
    limit: limit.value,
    page: page.value,
    event: id.value
  })
}

onMounted(() => {
  id.value = route.params.id
  getLoggers()
})
</script>
<style lang=""></style>
