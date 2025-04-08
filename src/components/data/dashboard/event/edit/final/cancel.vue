<template>
  <div class="title mb-[5px]">{{ t('11.cancel_title') }}</div>
  <div class="mb-10 space-y-4">
    <input type="radio" name="bring" v-model="data.cancel" :value="1" class="hidden" id="yes" />
    <label class="flex text-lg gap-[10px] items-start" for="yes">
      <div
        :class="{
          checked: data.cancel == 1,
          unchecked: data.cancel == 2,
        }"
        class="mt-[5px]"
      ></div>
      <div class="flex-1">
        {{ t('11.cancel_can') }}
      </div>
    </label>
    <input type="radio" name="bring" v-model="data.cancel" :value="2" class="hidden" id="no" />
    <label class="flex text-lg gap-[10px] items-start" for="no">
      <div
        :class="{
          checked: data.cancel == 2,
          unchecked: data.cancel == 1,
        }"
        class="mt-[5px]"
      ></div>
      <div class="flex-1">
        {{ t('11.cancel_24') }}
      </div>
    </label>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const data = defineModel()
</script>
<style lang=""></style>
