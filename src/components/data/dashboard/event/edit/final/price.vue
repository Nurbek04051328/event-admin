<template>
  <div>
    <div class="title mb-[10px]">{{ t('11.price_title') }}</div>
    <div class="text mb-[30px]">
      {{ t('11.price_text') }} <br />
      <span class="underline-offset-2 underline text-main">{{ t('more_details') }}</span>
    </div>
    <div class="flex items-start gap-[6px] pl-1 mb-[30px]">
      <input
        id="free"
        name="free"
        type="checkbox"
        v-model="data.free"
        @click="((data.entryFee = 0), (data.entryFeeChild = 0))"
        class="h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
      />
      <label for="free" class="font-medium text-gray-900">{{ t('11.price_free') }}</label>
    </div>

    <div v-if="!data.free">
      <div v-if="!data.interactionOptions.setAge" class="space-y-[30px]">
        <div class="space-y-3">
          <div class="subtitle flex items-center gap-[6px]">
            <CurrencyDollarIcon class="size-5" />
            {{ t('11.price') }}
          </div>
          <div class="input-box pr-[26px]">
            <input
              type="number"
              v-model="data.entryFee"
              @blur="getTicketPackage"
              class="input-inbox flex-1"
            />
            <span class="text-lg font-semibold text-event-700">UZS</span>
          </div>
          <div class="text">
            {{ t('11.price_per_text') }}
            <span class="text-main underline underline-offset-2">{{ t('lear_more') }}</span>
          </div>
        </div>
        <div class="space-y-2">
          <div class="subtitle">{{ t('11.special_title') }}</div>
          <div class="text text-black">{{ t('11.special_free') }}</div>
          <div class="flex items-center gap-6 pr-1">
            <div class="text">
              {{ t('11.translator_title') }}
              <br />
              <span class="text-main underline underline-offset-2"> {{ t('read_more') }}</span>
            </div>
            <DefaultCheckbox v-model="data.escort" />
          </div>
        </div>
      </div>
      <div class="space-y-4 px-1" v-else>
        <div class="p-4 rounded-2xl shadow-md">
          <div
            class="flex items-center gap-[10px] mb-[13px] pb-[13px] border-b-[1px] border-gray-300"
          >
            <img src="@/assets/adult.svg" alt="" />
            <div>
              <div class="text-lg font-semibold" v-html="t('11.price_adult')" />
              <div class="text-event-700">
                {{ t('8.minimum_age') }} <span class="text-main">18</span>
              </div>
            </div>
          </div>
          <div class="input-box pr-[26px]">
            <input
              type="number"
              v-model="data.entryFee"
              @blur="getTicketPackage"
              class="input-inbox flex-1"
            />
            <span class="text-lg font-semibold text-event-700">UZS</span>
          </div>
          <div
            class="border-[#BBF7D0] border-[1px] mt-[10px] py-[15px] px-5 bg-[#F0FDF4] rounded-2xl"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="text-base text-event-700 font-semibold">{{ t('11.estimated') }}</div>
                <div class="font-bold text-green-700">
                  {{ resultTaxes }}
                </div>
              </div>
              <img src="@/assets/danger.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="p-4 rounded-2xl shadow-md">
          <div
            class="flex items-center gap-[10px] mb-[13px] pb-[13px] border-b-[1px] border-gray-300"
          >
            <img src="@/assets/child.svg" alt="" />
            <div>
              <div class="text-lg font-semibold" v-html="t('11.price_children')" />
              <div
                class="text-event-700"
                v-html="t('11.from_old', { from: data.interactionOptions.minimumAge })"
              ></div>
            </div>
          </div>
          <div class="input-box pr-[26px]">
            <input type="number" v-model="data.entryFeeChild" class="input-inbox flex-1" />
            <span class="text-lg font-semibold text-event-700">UZS</span>
          </div>
          <div
            class="border-[#BBF7D0] border-[1px] mt-[10px] py-[15px] px-5 bg-[#F0FDF4] rounded-2xl"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="text-base text-event-700 font-semibold">{{ t('11.estimated') }}</div>
                <div class="font-bold text-green-700">
                  {{ resultChildTaxes }}
                </div>
              </div>
              <img src="@/assets/danger.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import DefaultCheckbox from '../layout/defaultCheckbox.vue'
import { computed, onMounted } from 'vue'

const { t } = useI18n()

const data = defineModel()
import { mainStore } from '@/stores/data/default'
import { storeToRefs } from 'pinia'
const store = mainStore()
const { taxes } = storeToRefs(store)
const resultTaxes = computed(() => {
  console.log(taxes.value)
  let formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  })
  let result = (
    (data.value.entryFee * (100 - taxes.value.reduce((a, b) => a + b.percent, 0))) /
    100
  ).toFixed(0)

  return formatter?.format(result)
})

const getTicketPackage = async () => {
  console.log(data.value.entryFee)
  if (data.value.entryFee > 0) {
    data.value.ticketPackage = await store.getTicketPackages(data.value.entryFee)
  }
}

const resultChildTaxes = computed(() => {
  let formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  })
  let result = (
    (data.value.entryFeeChild * (100 - taxes.value.reduce((a, b) => a + b.percent, 0))) /
    100
  ).toFixed(0)

  return formatter?.format(result)
})

onMounted(() => {
  store.getTaxes()
})
</script>
<style lang=""></style>
