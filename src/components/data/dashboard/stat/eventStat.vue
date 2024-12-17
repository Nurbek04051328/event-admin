<template>
  <h3 
    class="text-base font-semibold leading-6 text-gray-900 w-full cursor-pointer"
    @click="$router.push({ name: 'event'})"
  >Мероприятие
  </h3>
  <div
    class="text-white rounded-lg p-4 shadow text-base items-start xs-max:w-full bg-gray-900 grid grid-cols-4 divide-y-[1px] divide-gray-50/20 gap-3 gap-x-6 mt-2 xs:text-[10px]"
  >
    <div
      v-for="(val, key) of e"
      :key="key"
      class="flex items-center justify-between pt-2"
      :class="{
        'col-span-4': key == 'count',
        'col-span-1': key !== 'count'
      }"
    >
      <div class="flex gap-2 items-center font-light text-sm xs:text-[11px]">
        <component :is="data[key]?.icon" class="size-4" aria-hidden="true" />
        {{ data[key]?.title }}
      </div>
      <div class="font-bold">
        {{ e[key] }}
      </div>
    </div>
  </div>
  <dd
    class="ont-semibold tracking-tight items-center h-[60%] text-white grid grid-cols-6 gap-4 md-max:justify-between xs-max:mt-4 mt-2 xs-max:flex-col xs-max:w-full"
  ></dd>
</template>

<script setup>
const data = {
  count: {
    title: 'Все',
    icon: HashtagIcon
  },
  public: {
    title: 'Общедоступный',
    icon: GlobeAltIcon
  },
  private: {
    title: 'Приватный',
    icon: LockClosedIcon
  },
  forAdult: {
    title: 'Для совершеннолетних',
    icon: ShieldExclamationIcon
  },
  forAll: {
    title: 'Без возрастного ограничения',
    icon: ShieldCheckIcon
  },
  upcoming: {
    title: 'Предстоящее',
    icon: CalendarDaysIcon
  },
  ongoing: {
    title: 'Текущее',
    icon: RocketLaunchIcon
  },
  completed: {
    title: 'Завершенное',
    icon: LightBulbIcon
  },
  canceled: {
    title: 'Отмененное',
    icon: NoSymbolIcon
  },
  archive: {
    title: 'Архивированное',
    icon: PaperClipIcon
  },
  denied: {
    title: 'Отказан',
    icon: PaperClipIcon
  },
  approve: {
    title: 'Архивированное',
    icon: XMarkIcon
  },
  process: {
    title: 'В проверке',
    icon: ClockIcon
  }
}

import {
  CalendarDaysIcon,
  XMarkIcon,
  ClockIcon,
  LockClosedIcon,
  NoSymbolIcon,
  RocketLaunchIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  PaperClipIcon,
  LightBulbIcon,
  GlobeAltIcon,
  HashtagIcon
} from '@heroicons/vue/24/outline'

defineProps(['e'])
</script>
<style lang=""></style>
