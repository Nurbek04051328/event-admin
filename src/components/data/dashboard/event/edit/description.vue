<template>
  <div class="flex-1 overflow-auto pb-8">
    <div class="title mb-[5px]">{{ t('3.title') }}</div>
    <div class="text mb-[35px]">
      {{ t('3.text') }}
    </div>
    <div class="space-y-4 mb-[30px]">
      <div class="subtitle">{{ t('3.do') }}</div>
      <ul class="list-disc pl-5 text-event-700 font-nt-regular">
        <li>{{ t('3.do_text') }}</li>
      </ul>
      <defaultTextarea
        v-model="data.description"
        name="text"
        :max="200"
        :placeholder="t('3.placeholder_text')"
        :example="t('show_example')"
        :example_title="t('3.placeholder_example_title')"
        :example_text="t('3.placeholder_example_text')"
      />
    </div>
    <div class="space-y-4 mb-[30px]">
      <div class="subtitle">{{ t('3.how_long') }}</div>

      <customSelect
        v-model="data.duration"
        :options="
          [...Array(32)].map((a, v) => {
            return {
              _id: ((v + 1) / 2).toFixed(1),
              title: `${((v + 1) / 2).toFixed(1)} ${t('hour')}`
            }
          })
        "
        option_title="title"
        name="hour"
        :placeholder="t('selectPlaceholder')"
      />
    </div>
    <div class="space-y-[30px]">
      <LocationType v-model="data" />
      <LocationDescription v-model="data" />
      <LocationAnimals v-model="data" />
      <LocationEventAnimal v-model="data" />
    </div>
  </div>

  <div class="pt-[26px]">
    <button
      :class="[statusBtn ? 'btn' : 'btn-disabled', 'mt-auto w-full']"
      @click="statusBtn ? nextPage() : false"
    >
      {{ t('continue') }}
      <ChevronRightIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import customSelect from './layout/customSelect.vue'
import defaultTextarea from './layout/defaultTextarea.vue'

import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import LocationType from './description/locationType.vue'
import LocationDescription from './description/locationDescription.vue'
import LocationAnimals from './description/locationAnimals.vue'
import LocationEventAnimal from './description/locationEventAnimal.vue'
import { mainStore } from '@/stores/data/default'
import { computed } from 'vue'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

const statusBtn = computed(() => {
  return data.value.description?.length > 0
})

const data = defineModel()
</script>
<style lang=""></style>
