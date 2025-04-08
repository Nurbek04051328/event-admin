<template>
  <div>
    <div class="title mb-[10px]">{{ t('11.earn_title') }}</div>
    <div class="text">
      {{ t('11.earn_text') }}
      <span class="text-main underline underline-offset-2">
        {{ t('more_details') }}
      </span>
    </div>
  </div>

  <div class="">
    <div class="subtitle">{{ t('11.total_title') }}</div>
    <div class="text">{{ t('11.total_text') }}</div>
    <div class="input-box pr-[26px] mt-4">
      <input
        type="number"
        v-model="data.quantity"
        v-if="!data.includeGroup"
        class="input-inbox flex-1"
      />
      <input
        type="number"
        v-model="data.size.open"
        v-if="data.includeGroup"
        class="input-inbox flex-1"
      />
      <TicketIcon class="size-6" />
    </div>
    <div class="border-[#CEA9F8] border-[1px] bg-[#9747FF0D] mt-4 p-4 rounded-2xl">
      <div class="mb-5 flex items-center gap-2 text-lg text-event-700 font-nt-medium">
        <img src="@/assets/money.svg" alt="" />
        {{ t('11.charge_one_title') }}
      </div>
      <div class="space-y-4 font-nt-medium">
        <div v-for="tax of store.taxes" :key="tax._id" class="flex items-center justify-between">
          <div>{{ tax.title }} ({{ tax.percent }}%)</div>
          <div class="text-main">
            {{ formatter.format((data.entryFee * (tax.percent / 100)).toFixed()) }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div>{{ store.commission?.title }} ({{ store.commissionRate }}%)</div>
          <div class="text-main">
            {{ formatter.format((data.entryFee * (store.commissionRate / 100)).toFixed()) }}
          </div>
        </div>
      </div>
      <div
        class="border-t-2 pt-5 mt-5 border-dashed border-event-white-1 flex items-center justify-between font-nt-medium"
      >
        <div>
          {{ t('11.total_taxes') }} ({{
            store.taxes.reduce((a, b) => a + b.percent, 0) + store.commissionRate
          }}%)
        </div>
        <div class="text-main">
          {{ allFromOneTaxes }}
        </div>
      </div>
    </div>
    <div class="border-[#CEA9F8] border-[1px] bg-[#9747FF0D] mt-4 p-4 rounded-2xl">
      <div class="mb-5 flex items-center gap-2 text-lg text-event-700 font-nt-medium">
        <img src="@/assets/money.svg" alt="" />
        {{ t('11.charge_title') }}
      </div>
      <div class="space-y-4 font-nt-medium">
        <div v-for="tax of store.taxes" :key="tax._id" class="flex items-center justify-between">
          <div>{{ tax.title }} ({{ tax.percent }}%)</div>
          <div class="text-main">
            {{
              formatter.format(
                (
                  data.entryFee *
                  (data.includeGroup ? data.size.open : data.quantity) *
                  (tax.percent / 100)
                ).toFixed()
              )
            }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div>{{ store.commission?.title }} ({{ store.commissionRate }}%)</div>
          <div class="text-main">
            {{
              formatter.format(
                (
                  data.entryFee *
                  (data.includeGroup ? data.size.open : data.quantity) *
                  (store.commissionRate / 100)
                ).toFixed()
              )
            }}
          </div>
        </div>
      </div>
      <div
        class="border-t-2 pt-5 mt-5 border-dashed border-event-white-1 flex items-center justify-between font-nt-medium"
      >
        <div>
          {{ t('11.total_taxes') }} ({{
            store.taxes.reduce((a, b) => a + b.percent, 0) + store.commissionRate
          }}%)
        </div>
        <div class="text-main">
          {{ allTaxes }}
        </div>
      </div>
    </div>
    <div class="border-[#BBF7D0] border-[1px] mt-[10px] py-[15px] px-5 bg-[#F0FDF4] rounded-2xl">
      <div class="flex items-start justify-between gap-2">
        <CurrencyDollarIcon class="size-6 text-green-700" />
        <div class="flex-1">
          <div class="text-base text-event-700 font-semibold">{{ t('11.total_ear') }}</div>
          <div class="font-bold text-green-700 flex items-center justify-between mt-4">
            <span>{{ resultTaxes }}</span>
            <img src="@/assets/danger.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { TicketIcon } from '@heroicons/vue/24/outline'

let formatter = new Intl.NumberFormat('uz-UZ', {
  style: 'currency',
  currency: 'UZS'
})

import { mainStore } from '@/stores/data/default'
import { computed } from 'vue'
import { CurrencyDollarIcon } from '@heroicons/vue/20/solid'
const store = mainStore()

const data = defineModel()

const allFromOneTaxes = computed(() => {
  let formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  })
  let result = (
    (store.taxes.reduce((a, b) => a + b.percent, 0) / 100 + store.commissionRate / 100) *
    data.value.entryFee
  ).toFixed(0)

  return formatter?.format(result)
})
const allTaxes = computed(() => {
  let formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  })
  let result = (
    (store.taxes.reduce((a, b) => a + b.percent, 0) / 100 + store.commissionRate / 100) *
    data.value.entryFee
  ).toFixed(0)

  return formatter?.format(
    result * (data.value.includeGroup ? data.value.size.open : data.value.quantity)
  )
})

const resultTaxes = computed(() => {
  let formatter = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  })
  let result = (
    ((data.value.includeGroup ? data.value.size.open : data.value.quantity) *
      data.value.entryFee *
      (100 - store.taxes.reduce((a, b) => a + b.percent, 0) + store.commissionRate)) /
    100
  ).toFixed(0)

  return formatter?.format(result)
})
</script>
<style lang=""></style>
