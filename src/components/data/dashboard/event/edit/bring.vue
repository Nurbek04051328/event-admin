<template>
  <div class="flex-1 overflow-auto space-y-[40px] pb-8">
    <div class="title">{{ t('7.title') }}</div>

    <div class="mb-10 space-y-4">
      <input
        type="radio"
        name="bring"
        v-model="data.guestNeed.giveAnything"
        :value="true"
        class="hidden"
        id="yes"
      />
      <label class="flex text-lg gap-[10px] items-center" for="yes">
        <div
          :class="{
            checked: data.guestNeed.giveAnything,
            unchecked: !data.guestNeed.giveAnything
          }"
        ></div>
        <div>
          {{ t('yes') }}
        </div>
      </label>
      <input
        type="radio"
        name="bring"
        v-model="data.guestNeed.giveAnything"
        :value="false"
        class="hidden"
        id="no"
      />
      <label class="flex text-lg gap-[10px] items-center" for="no">
        <div
          :class="{
            checked: !data.guestNeed.giveAnything,
            unchecked: data.guestNeed.giveAnything
          }"
        ></div>
        <div>
          {{ t('no') }}
        </div>
      </label>
    </div>

    <div class="space-y-[10px]" v-if="data.guestNeed.giveAnything">
      <div class="subtitle">{{ t('7.yes_title') }}</div>
      <div class="text">{{ t('7.yes_desc') }}</div>

      <div v-for="(bring, index) of data.guestNeed.bring" :key="index" class="input-box pr-[25px]">
        <input
          type="text"
          class="input-inbox flex-1"
          v-model="data.guestNeed.bring[index]"
          :placeholder="t('7.yes_subject')"
        />
        <button
          class="size-6 transition-all"
          :class="{
            visible: data.guestNeed.bring[index]?.length > 0,
            hidden: data.guestNeed.bring[index]?.length == 0
          }"
          @click="removeBring(index)"
        >
          <XMarkIcon class="size-6" />
        </button>
      </div>
      <button @click="addBring">
        + <span class="underline underline-offset-2">{{ t('7.yes_add') }}</span>
      </button>
    </div>
  </div>

  <button class="mt-auto btn" @click="nextPage()">
    {{ t('continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
</template>
<script setup>
import { ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()



const removeBring = (index) => {
  if (index == 0 && data.value.guestNeed.bring?.length == 1) {
    data.value.guestNeed.bring[index] = ''
    return
  }

  data.value.guestNeed.bring.splice(index, 1)
}

const addBring = () => {
  if (data.value.guestNeed.bring.at(-1)?.length == 0) return false
  data.value.guestNeed.bring.push('')
}

import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

const data = defineModel()
</script>
<style lang=""></style>
