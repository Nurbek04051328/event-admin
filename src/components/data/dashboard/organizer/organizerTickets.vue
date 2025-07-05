<template>
    <div v-if="store.logger.data?.length > 0" class="flex flex-col overflow-hidden">
      <div class="w-full overflow-y-auto flex-1 text-[13px]" >
        <div v-for="ticket of store.logger.data" :key="ticket._id" class="p-2 w-full">
          <span class="font-bold text-[#645A77] mr-1"> {{ ticket?.user?.lname }} {{ ticket?.user?.name }} </span><br>
          <span
            class="mr-2"
            :class="ticket.status == 0 ? 'bg-[#FFECD9] text-[#FF7E00] rounded-lg px-2':
            ticket.status == 1 ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-2': 
            ticket.status == 2 ? 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-2': 'bg-[#F5F1FB] text-[#9E55EC] rounded-lg px-2'
            "
          >
            {{ ticket.status == 0 ? 'Ожидание транзакции' : '' }}
            {{ ticket.status == 1 ? 'Успешно приобретен' : '' }}
            {{ ticket.status == 2 ? 'Возврат/Отменен' : '' }}
            {{ ticket.status == 3 ? 'Использован' : '' }}
          </span>
          билет на
          <span class="font-bold text-[#9E55EC] mr-1">
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
    <div v-else class="text-center mt-14 overflow-hidden">
      Пока нет история билетов
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
    organizer: id.value
  })
}

onMounted(() => {
  id.value = route.params.id
  getLoggers()
})
</script>
<style lang=""></style>
