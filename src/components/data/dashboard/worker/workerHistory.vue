<template>
  <div class="divide-y-2 divide-gray-100 text-sm flex flex-col overflow-hidden">
    <div v-if="store.workerLoggers?.data.length > 0" class="flex flex-col overflow-hidden">
      <div class="overflow-auto">
        <div v-for="ticket of store.workerLoggers?.data" :key="ticket._id" class="p-2 flex justify-between items-center">
          <div>
            поменял права на
            <span class="font-bold text-[#9E55EC]">
              {{ ticket.event?.title }} 
            </span>
            <span :class="ticket.status == 0 ? 'warning-tag' : ticket.status == 1 ? 'success-tag' : 'danger-tag'">
              {{ ticket.status == 0 ? ' Не проверено' : '' }}
              {{ ticket.status == 1 ? ' Принять' : '' }}
              {{ ticket.status == 2 ? ' Отменен' : '' }}
            </span>
            в 
            <span class="font-bold">
              {{ convertDateShort(ticket.updatedAt, 'full') }}
            </span>
          </div>
          <div class="mr-2">
            <a :href="`${url}/${ticket?.face}`" v-if="ticket?.face" target="_blank">
              <img  :src="`${url}/${ticket?.face}`" alt="user face photo" class="h-11 w-11 rounded-lg object-cover">
            </a>
            <div v-else>нет фото</div>
          </div>
        </div>

      </div>
      <div class="pl-4 pb-2">
        <paginate
          v-if="store.workerLoggers.count > limit"
          v-model="page"
          :page-count="Math.round(store.workerLoggers.count / limit)"
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
      Пока нет мероприятие
    </div>
  </div>
  
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import paginate from 'vuejs-paginate-next'
const url = import.meta.env.VITE_URL
const route = useRoute()
const id = ref('')
const limit = ref(30)
const page = ref(1)

import { loggerStore } from '@/stores/user/logger'
import { convertDateShort } from '@/helpers/func'
const store = loggerStore()
// import { convertDateShort } from '@/helpers/func'

const clickCallback = async (value) => {
  page.value = value
  await getLoggers()
}

const getLoggers = async () => {
  if (!id.value) return false
  await store.eventworker({
    limit: limit.value,
    page: page.value,
    actionFrom: id.value
  })
}

onMounted(() => {
  id.value = route.params.id
  getLoggers()
})
</script>
<style lang=""></style>