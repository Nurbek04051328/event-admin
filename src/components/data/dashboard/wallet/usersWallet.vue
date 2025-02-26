<template>
  <div class="text-sm flex flex-col overflow-hidden">
    <div class="flex items-center py-3 pl-1 pr-8 justify-between">
      <div class="flex items-center text-[18px] font-semibold">
        <div class="mr-3 w-[40px] h-[40px] bg-[#F3EBFC] rounded-full flex items-center justify-center">
          <img src="@/assets/images/wallet.svg" alt="Wallet svg">
        </div>
        Кошелек
      </div>
      <div>
        <span class="mr-2 font-semibold">{{ walletBalance.toLocaleString() }}</span>   UZS
      </div>
    </div>
    <div v-if="walletLogs?.length > 0" class="flex flex-col overflow-hidden">
      <div class="w-full overflow-y-auto flex-1 text-[13px]">
        <div  class="p-2 xm-max:text-[11px] flex justify-between items-center">
          <table class="w-full">
            <tbody>
              <tr v-for="log of walletLogs" :key="log._id" class="px-4">
                <td>
                  <img v-if="log?.service == 'PayMe'" src="@/assets/images/wallet/payme.png" alt="Payme png" class="w-10">
                  <img v-if="log?.service == 'Click'" src="@/assets/images/wallet/click.png" alt="Click png" class="w-10">
                  <span v-if="log?.service == 'Service'">Сервис</span>
                  <span v-if="!log?.service">Сервис</span>
                      </td>
                <td 
                  :class="walletActions.find((a) => a.mode == log.type)?.class"
                >
                  {{ walletActions.find((a) => a.mode == log.type)?.label }}
                </td>
                <td>{{ convertDateShort(log?.createdAt) }}</td>
                <td class="td-last">{{ log?.amount.toLocaleString() }} сум</td>
              </tr>
            </tbody>
          </table>
          <!-- <div>
            <img v-if="log?.service == 'PayMe'" src="@/assets/images/wallet/payme.png" alt="Payme png" class="w-14">
            <img v-if="log?.service == 'Click'" src="@/assets/images/wallet/click.png" alt="Click png" class="w-14">
            <span v-if="log?.service == 'Service'">{{ log?.service }}</span>
          </div> -->
          <!-- <div :class="walletActions.find((a) => a.mode == log.type)?.class">
            {{ walletActions.find((a) => a.mode == log.type)?.label }}
          </div>
          <div class="flex justify-center">
            {{ convertDateShort(log?.createdAt) }}
          </div>
          <div>
            {{ log?.amount.toLocaleString() }} сум
          </div> -->

        </div>
      </div>
      <!-- <paginate
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
      /> -->
    </div>
    <div v-else class="text-center mt-14">
      Пока нет транзакций
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { walletActions } from '@/helpers/vars'
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
  walletBalance.value = res.wallet?.balance || 0 
  walletLogs.value = res.logs 
  console.log("dataWallet", res);
  
}

onMounted(() => {
  id.value = route.params.id
  getWallet()
})
</script>
<style lang=""></style>
