<template>
  <div class="flex-1 overflow-auto space-y-[30px] pb-8">
    <div class="space-y-[10px]">
      <div class="title mb-[5px]">{{ t('8.title') }}</div>
      <div class="text">
        {{ t('8.desc') }}
      </div>
    </div>
    <div class="flex items-center gap-4 pr-1">
      <div class="space-y-[10px]">
        <div class="subtitle">{{ t('8.set_age') }}</div>
        <div class="text">{{ t('8.set_age_text') }}</div>
      </div>
      <DefaultCheckbox v-model="data.interactionOptions.setAge" />
    </div>
    <div class="space-y-[10px]" v-if="data.interactionOptions.setAge">
      <div class="subtitle">{{ t('8.minimum_age') }}</div>
      <div class="text">{{ t('8.minimum_age_desc') }}</div>
      <customSelect
        v-model="data.interactionOptions.minimumAge"
        :options="
          [...Array(19)].map((a, v) => {
            return {
              _id: v + 2,
              title: v + 2
            }
          })
        "
        :updown="true"
        option_title="title"
        :default="data.interactionOptions?.minimumAge"
        name="hour"
        :placeholder="t('selectPlaceholder')"
      />
    </div>
    <div class="flex items-center gap-4 pr-1">
      <div class="space-y-[10px]">
        <div class="subtitle">{{ t('8.parents') }}</div>
        <div class="text">{{ t('8.parents_child') }}</div>
      </div>
      <DefaultCheckbox v-model="data.interactionOptions.exeptionParent" />
    </div>
    <Need v-model="data" />
    <div class="space-y-[10px]">
      <div class="subtitle">{{ t('8.activity_title') }}</div>
      <div class="text">{{ t('8.activity_desc') }}</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          class="transition-all py-[10px] rounded-[20px] items-center border-2 font-nt-regular text-sm"
          v-for="skill of activity"
          :key="skill"
          @click="data.activity = skill"
          :class="{
            'bg-main text-white': data.activity === skill,
            'border-event-100': data.activity != skill
          }"
        >
          {{ t(`8.${skill}`) }}
        </button>
      </div>
    </div>
    <div class="space-y-[10px]">
      <div class="subtitle">{{ t('8.skill_title') }}</div>
      <div class="text">{{ t('8.skill_desc') }}</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          class="transition-all py-[10px] rounded-[20px] items-center border-2 font-nt-regular text-sm"
          v-for="skill of skills"
          :key="skill"
          @click="data.skill = skill"
          :class="{
            'bg-main text-white': data.skill === skill,
            'border-event-100': data.skill != skill
          }"
        >
          {{ t(`8.${skill}`) }}
        </button>
      </div>
    </div>
    <div class="space-y-[10px]">
      <div class="subtitle">{{ t('8.add_title') }}</div>
      <DefaultTextarea
        v-model="data.additionalRequirements"
        :placeholder="t('8.add_placeholder')"
        :max="200"
        name="additionalRequirements"
      />
    </div>
  </div>
  <button class="mt-4 btn" @click="nextPage()">
    {{ t('continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
</template>
<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import DefaultTextarea from './layout/defaultTextarea.vue'
import customSelect from './layout/customSelect.vue'
import DefaultCheckbox from './layout/defaultCheckbox.vue'
import Need from './visit/need.vue'

const emits = defineEmits(['nextPage'])

const activity = ['easy', 'moderate', 'high', 'extreme']
const skills = ['initial', 'medium', 'advanced', 'expert']

import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

const data = defineModel()
</script>
<style lang=""></style>
