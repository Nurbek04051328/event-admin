<template>
  <div
    class="flex-1 overflow-auto text-center space-y-4 items-center flex flex-col justify-center pb-8"
  >
    <div class="title mb-[5px]">{{ t('12.title') }}</div>
    <div class="text">
      {{ t('12.text') }}
    </div>
  </div>

  <button class="mt-auto btn" @click="save()">
    {{ t('save') }}
    <ChevronRightIcon class="size-5" />
  </button>
</template>
<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { mainStore } from '@/stores/data/default'
const main = mainStore()

const save = () => {
  main.addEvent(modelValue.value)
}

const modelValue = defineModel()
</script>
<style lang=""></style>
