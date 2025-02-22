<template>
  <div class="text-sm flex-1 h-[100%] p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center text-[18px] font-semibold">
        <div class="mr-3 w-[40px] h-[40px] bg-[#F3EBFC] rounded-full flex items-center justify-center">
          <img src="@/assets/images/wallet.svg" alt="Wallet svg">
        </div>
        Кошелек
      </div>
      <div>
        <span class="mr-2">{{ walletBalance.toLocaleString() }}</span>   UZS
      </div>
    </div>
    <!-- <div v-if="store.logger.data?.length > 0" class=" flex flex-col overflow-hidden">
      <div v-for="ticket of store.logger.data" :key="ticket._id" class="p-2 xm-max:text-[11px] overflow-auto flex-1">
        <span class="font-bold text-[#645A77]"> {{ ticket?.user?.lname }} {{ ticket?.user?.name }} </span>
        купил {{ ticket.status }}
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
        </span> на
        <span class="font-bold text-[#9E55EC]">
          {{ ticket.event?.title }}
        </span> по сумме
        <span v-if="ticket.entryFee == 0" class="font-bold"> бесплатно </span>
        <span v-if="ticket.entryFee > 0" class="font-bold"> {{ ticket.entryFee }} сум </span>
  
        в
        <span class="font-bold">
          {{ convertDateShort(ticket.updatedAt, 'full') }}
        </span>
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
    </div>
    <div v-else class="text-center mt-14">
      Пока нет история билетов
    </div> -->
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import paginate from 'vuejs-paginate-next'
const route = useRoute()
const id = ref('')
const walletBalance = ref({})
const walletLogs = ref([])
// const limit = ref(30)
// const page = ref(1)

import { usersStore } from '@/stores/data/users'
import { convertDateShort } from '@/helpers/func'
const store = usersStore()
// import { convertDateShort } from '@/helpers/func'

// const clickCallback = async (value) => {
//   page.value = value
//   await getLoggers()
// }

const getWallet = async () => {
  if (!id.value) return false
  const res = await store.getUserWalletBalans({
    _id: id.value
  })
  walletBalance.value = res.findWallet?.balance || 0 
  walletLogs.value = res.logs 
  console.log("dataWallet", res);
  
}

onMounted(() => {
  id.value = route.params.id
  getWallet()
})
</script>
<style lang=""></style>
