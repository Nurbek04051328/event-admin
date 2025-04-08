<template>
  <div class="title mb-[5px]">{{ t('11.title') }}</div>
  {{ data.includeGroup }}
  <div class="mb-10 space-y-4">
    <input
      type="radio"
      name="bring"
      v-model="data.group"
      @click="setIncludeGroup(2)"
      :value="2"
      class="hidden"
      id="yes"
    />
    <label class="flex text-lg gap-[10px] items-center" @click="setIncludeGroup(2)" for="yes">
      <div
        :class="{
          checked: data.group == 2,
          unchecked: [0, 1].includes(data.group),
        }"
      ></div>
      <div>
        {{ t('yes') }}
      </div>
    </label>
    <input
      type="radio"
      name="bring"
      v-model="data.group"
      @click="setIncludeGroup(1)"
      :value="1"
      class="hidden"
      id="no"
    />
    <label class="flex text-lg gap-[10px] items-center" @click="setIncludeGroup(1)" for="no">
      <div
        :class="{
          checked: data.group == 1,
          unchecked: [0, 2].includes(data.group),
        }"
      ></div>
      <div>
        {{ t('no') }}
      </div>
    </label>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const setIncludeGroup = (value) => {
  data.value.includeGroup = value == 2
}

const data = defineModel()
</script>
<style lang=""></style>
