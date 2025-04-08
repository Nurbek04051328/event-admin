<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-6">
      <div class="bg-white w-full rounded-[16px] flex items-center p-5">
        <div class="bg-[#F3EBFC] p-3 rounded-full mr-6">
          <CircleStackIcon class="size-8 text-[#9E55EC]" />
        </div>
        <div>
          <div class="text-[18px] text-[#483D5B]">Пополнение</div>
          <div class="text-[20px] font-bold text-[#483D5B]">
            {{ store.deposit?.toLocaleString() || 0 }} сум
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-6">
      <div class="bg-white w-full rounded-[16px] flex items-center p-5">
        <div class="bg-[#FF555826] p-3 rounded-full mr-6">
          <ArchiveBoxArrowDownIcon class="size-8 text-[#FF5558]" />
        </div>
        <div>
          <div class="text-[18px] text-[#483D5B]">Вывод</div>
          <div class="text-[20px] font-bold text-[#483D5B]">
            {{ store.withdrawal?.toLocaleString() || 0 }} сум
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-6">
      <div class="bg-white w-full rounded-[16px] flex items-center p-5">
        <div class="bg-[#FFF8DE] p-3 rounded-full mr-6">
          <CreditCardIcon class="size-8 text-[#FFCE20]" />
        </div>
        <div>
          <div class="text-[18px] text-[#483D5B]">Покупка</div>
          <div class="text-[20px] font-bold text-[#483D5B]">
            {{ store.purchase?.toLocaleString() || 0 }} сум
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-6">
      <div class="bg-white w-full rounded-[16px] flex items-center p-5">
        <div class="bg-[#E1F9F2] p-3 rounded-full mr-6">
          <img src="@/assets/images/profit.svg" alt="profit_img" class="size-8 text-[#FFCE20]" />
        </div>
        <div>
          <div class="text-[18px] text-[#483D5B]">Доход</div>
          <div class="text-[20px] font-bold text-[#483D5B]">
            {{ store.profit?.toLocaleString() || 0 }} сум
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12">
      <div class="bg-white w-full rounded-[16px] items-center p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full">
            Статистика по (текуший месяц)
          </h3>
          <!-- <default-select
            v-model="search"
            name="title"
            placeholder="Выберите месяц"
            @change="filterMonth"
          /> -->
          <div class="w-[250px]">
            <VueDatePicker v-model="date" month-picker placeholder="Выберите месяц"></VueDatePicker>
          </div>
        </div>
        <apexchart height="400" width="100%" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { CircleStackIcon, ArchiveBoxArrowDownIcon, CreditCardIcon } from '@heroicons/vue/24/outline'
import { transactionStore } from '@/stores/data/transaction'
const store = transactionStore()
import { statisticStore } from '@/stores/data/statistic'
const stat_store = statisticStore()

let date = ref('')


const options = computed(() => {
  return {
    chart: {
      id: 'vuechart-deposit',
      type: 'area',
      height: 400,
      width: 500
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    // xaxis: {
    //   categories: stat.value?.map((v, k) => k + 1) || []
    // },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    colors: ['#892EEB', '#FF5558'],
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
      y: {
        formatter: (value) => value.toLocaleString('ru-RU') // Raqamni vergul bilan ajratish uchun
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toLocaleString('ru-RU')
      }
    },
    xaxis: {
      labels: {
        formatter: (value) => value.toLocaleString('ru-RU') // Agar xaxis ham raqam bo‘lsa
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  }
})
const series = ref([])

const getData = async (params) => {
  const { data } = await stat_store.allDeposit(params)
  series.value = [
    {
      name: 'Пополнение',
      data: data?.deposit || []
    },
    {
      name: 'Вывод',
      data: data?.withdrawal || []
    }
  ]
}

watch(date, (newDate) => {
  getData(newDate)
})

onMounted(() => {
  getData()
})
</script>
