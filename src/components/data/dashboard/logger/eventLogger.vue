<template>
  <div v-if="store.eventLoggers.data?.length > 0" class="flex flex-col overflow-hidden">
    <div class="w-full overflow-y-auto flex-1 text-[13px]" >
      <div v-for="log of store.eventLoggers.data" :key="log._id" class="p-2">
        <span class="font-medium">
          {{ log?.actionFrom?.lname }}
          {{ log?.actionFrom?.name }}
        </span>
        поменял права мероприятия на
        <span :class="eventActions.find((a) => a._id == log.status)?.class">
          {{ eventActions.find((a) => a._id == log.status)?.label }}
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
  </div>
  <div v-else class="text-center mt-14">
    Пока нет история
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
import { eventActions } from '@/helpers/vars'
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
