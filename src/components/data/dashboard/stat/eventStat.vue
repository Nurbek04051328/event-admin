<template>
  <div class="p-[26px]  rounded-[26px] shadow-sm bg-white">
    <div class="flex justify-between">
      <div
        @click="$router.push({ name: 'event'})"
        class="text-[#483D5B] font-bold text-[22px] relative cursor-pointer"
      >
        Мероприятия
        <span class="absolute bg-[#FAF4FE] py-[5px] px-[15px] rounded-2xl text-[16px] text-[#B6A3D0] top-[-10px]">{{ e?.count || 0 }}</span>
      </div>
      <div>
        <img src="@/assets/images/event-calendar.png" alt="">
      </div>
    </div>

    <div
      class=" text-[#360B64]  py-4 text-base items-start xs-max:w-full grid grid-cols-2  gap-x-7 gap-y-3  mt-2 xs:text-[10px]"
    > 
      <div
        v-for="(val, key) of filteredItems"
        :key="key"
        class="flex  justify-between  pt-2 border-b border-gray-200 pb-2"
        
      >   
  
      <!-- {{ key }} -->
        <div class="flex gap-2 text-[#483D5B] text-[18px] items-center font-semibold text-sm xs:text-[11px]">
          <div v-if="data[key]?.icon" class="bg-[#F3EBFC] rounded-lg p-[7px]">
            <component v-if="data[key]?.icon" :is="data[key]?.icon" class="size-6 text-[#9E55EC]" aria-hidden="true" />
          </div>
          {{ data[key]?.title }}
        </div>
        <div class="font-bold text-[#483D5B] text-[24px]">
          {{ e[key] }}
        </div>
      </div>
  </div>
  </div>
  <!-- <dd
    class="ont-semibold tracking-tight items-center h-[60%] text-white grid grid-cols-6 gap-4 md-max:justify-between xs-max:mt-4 mt-2 xs-max:flex-col xs-max:w-full"
  ></dd> -->
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps(['e'])

  const filteredItems = computed(() => {
    if (!props.e) return {}
    const { count, ...rest } = props.e
    return rest
  })

  const data = {
    public: {
      title: 'Доступные',
      icon: GlobeAltIcon
    },
    private: {
      title: 'Приватные',
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
      title: 'Подтвержденный',
      icon: CheckIcon
    },
    process: {
      title: 'В проверке',
      icon: ClockIcon
    }
  }


// Icon import
  import {
    CalendarDaysIcon,
    CheckIcon,
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

</script>
<style lang=""></style>
