<template>
  <div class="divide-y-2 divide-gray-100 text-sm overflow-auto flex-1">
    <div v-for="ticket of store.logger.data" :key="ticket._id" class="p-2">
      <span class="font-bold"> {{ ticket?.user?.lname }} {{ ticket?.user?.name }} </span>
      купил
      <span>
        {{ ticket.status == 0 ? 'Ожидание транзакции' : '' }}
        {{ ticket.status == 1 ? 'Успешно приобретен' : '' }}
        {{ ticket.status == 2 ? 'Возврат/Отменен' : '' }}
      </span>
      <span class="font-bold text-blue-600">
        {{ ticket.event?.title }}
      </span>
      <span v-if="ticket.entryFee == 0" class="font-bold"> бесплатно </span>
      <span v-if="ticket.entryFee > 0" class="font-bold">по сумме {{ ticket.entryFee }} сум </span>

      в
      <span class="font-bold">
        {{ convertDateShort(ticket.updatedAt, 'full') }}
      </span>
    </div>
  </div>
  <paginate
    v-if="store.logger.count > limit"
    v-model="page"
    :page-count="Math.round(store.logger.count / limit)"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Пред'"
    :next-text="'След'"
    :page-class="'page-item'"
    :container-class="'pagination_next shadow'"
  />
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
import { convertDateShort } from '@/helpers/func'
const store = loggerStore()
// import { convertDateShort } from '@/helpers/func'

const clickCallback = async (value) => {
  page.value = value
  await getLoggers()
}

const getLoggers = async () => {
  if (!id.value) return false
  await store.ticketLogger({
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