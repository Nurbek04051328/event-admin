<template>
  <div class="grid grid-cols-12 gap-4 h-min">
    <div class="col-span-12 grid grid-cols-12 gap-4">
      <div class="col-span-6 h-full">
        <div class="bg-white w-full rounded-[16px] flex items-center p-5">
          <div class="bg-[#F3EBFC] p-3 rounded-full mr-6">
            <CircleStackIcon class="size-8 text-[#9E55EC]" />
          </div>
          <div>
            <div class="text-[18px] text-[#483D5B] lg:text-[15px]">Пополнение</div>
            <div class="text-[20px] font-bold text-[#483D5B] lg:text-[15px]">
              {{ store.deposit?.toLocaleString() || 0 }} сум
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-6 h-full">
        <div class="bg-white w-full rounded-[16px] flex items-center p-5">
          <div class="bg-[#FF555826] p-3 rounded-full mr-6">
            <ArchiveBoxArrowDownIcon class="size-8 text-[#FF5558]" />
          </div>
          <div>
            <div class="text-[18px] text-[#483D5B] lg:text-[15px]">Вывод</div>
            <div class="text-[20px] font-bold text-[#483D5B] lg:text-[15px]">
              {{ store.withdrawal?.toLocaleString() || 0 }} сум
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-6 h-full">
        <div class="bg-white w-full rounded-[16px] flex items-center p-5">
          <div class="bg-[#FFF8DE] p-3 rounded-full mr-6">
            <CreditCardIcon class="size-8 text-[#FFCE20]" />
          </div>
          <div>
            <div class="text-[18px] text-[#483D5B] lg:text-[15px]">Покупка</div>
            <div class="text-[20px] font-bold text-[#483D5B] lg:text-[15px]">
              {{ store.purchase?.toLocaleString() || 0 }} сум
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-6 h-full">
        <div class="bg-white w-full rounded-[16px] flex items-center p-5">
          <div class="bg-[#E1F9F2] p-3 rounded-full mr-6">
            <img src="@/assets/images/profit.svg" alt="profit_img" class="size-8 text-[#FFCE20]" />
          </div>
          <div>
            <div class="text-[18px] text-[#483D5B] lg:text-[15px]">Доход</div>
            <div class="text-[20px] font-bold text-[#483D5B] lg:text-[15px]">
              {{ store.profit?.toLocaleString() || 0 }} сум
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 h-full">
      <div class="bg-white w-full rounded-[16px] items-center p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-[18px] font-bold leading-6 text-[#483D5B] w-full lg:text-[14px]">
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
        <apexchart height="330" :options="options" :series="series"></apexchart>
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
const props = defineProps(['transactionChart'])
let date = ref('')


const options = computed(() => {
  return {
    chart: {
      id: `vuechart-transaction-${Math.random().toString(36).substring(2, 8)}`,
      type: 'area',
      height: 100,
      width: 200
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
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 1025,
        options: {
          chart: {
            height:240,
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '8px',
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '8px',
              }
            }
          },
          legend: {
            fontSize: '10px'
          }
        }
      }
    ]
  }
})

const series = computed(() => [
  {
    name: 'Пополнение',
    data: props?.transactionChart?.deposit || []
  },
  {
    name: 'Вывод',
    data: props?.transactionChart?.withdrawal || []
  }
])


// const series = ref([])

// const getData = async (params) => {
//   const { data } = await stat_store.allDeposit(params)
//   series.value = [
//     {
//       name: 'Пополнение',
//       data: data?.deposit || []
//     },
//     {
//       name: 'Вывод',
//       data: data?.withdrawal || []
//     }
//   ]
// }


// watch(date, (newDate) => {
//   getData(newDate)
// })

// onMounted(() => {
//   getData()
// })
</script>
