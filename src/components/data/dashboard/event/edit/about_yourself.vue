<template>
  <div class="flex-1 overflow-auto space-y-[40px] pb-10">
    <div>
      <div class="title mb-[5px]">{{ t('4.title') }}</div>
      <div class="text mb-[35px]">
        {{ t('4.text') }}
      </div>
    </div>
    <div class="mb-10 space-y-4">
      <div class="subtitle">{{ t('4.how_title') }}</div>
      <input
        type="radio"
        name="spend"
        v-model="data.spend"
        value="myself"
        class="hidden"
        id="myself"
      />
      <label class="flex gap-[10px] items-center" for="myself">
        <div
          :class="{
            checked: data.spend == 'myself',
            unchecked: data.spend != 'myself'
          }"
        ></div>
        <div>
          {{ t('4.myself') }}
        </div>
      </label>
      <input type="radio" name="spend" v-model="data.spend" value="team" class="hidden" id="team" />
      <label class="flex gap-[10px] items-center" for="team">
        <div
          :class="{
            checked: data.spend == 'team',
            unchecked: data.spend != 'team'
          }"
        ></div>
        <div>
          {{ t('4.team') }}
        </div>
      </label>
    </div>


    <div class="space-y-4">
      <div class="subtitle">{{ t('4.skill') }}</div>
      <DefaultTextarea
        v-model="data.uniqueEventSkill"
        :max="200"
        :placeholder="t('4.skill_placeholder')"
        name="skill"
      />
    </div>
  </div>

  <button
    :class="[statusBtn ? 'btn' : 'btn-disabled', 'mt-auto']"
    @click="statusBtn ? nextPage() : false"
  >
    {{ t('continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
</template>
<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

import { useI18n } from 'vue-i18n'
import DefaultTextarea from './layout/defaultTextarea.vue'
const { t } = useI18n()


import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}
const data = defineModel()

import { computed } from 'vue'
const statusBtn = computed(() => {
  return data.value.uniqueEventSkill?.length > 0
})
</script>
<style lang=""></style>
