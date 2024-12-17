<template>
  <h3 class="text-base font-semibold leading-6 w-full">{{ $t('home.title') }}</h3>
  <div class="mt-2 grid grid-cols-6 gap-3 sm:grid-cols-3 xs-max:grid-cols-2">
    <blackStat
      title="Сотрудников"
      :icon="UserGroupIcon"
      :value="count?.user?.manager + count?.user?.moderator"
      @click="$router.push({ name: 'workers'})"
      class="cursor-pointer"
    />
    <blackStat
      :title="$t('home.ticketpaskage')"
      :icon="SwatchIcon"
      :value="count?.ticketPackagesCount"
      @click="$router.push({ name: 'ticketpaskage'})"
      class="cursor-pointer"
    />
    <blackStat
      title="Организаторы"
      :icon="BriefcaseIcon"
      :value="count.user?.organizerSuccess + count.user?.organizerPending + count?.user?.organizerDenied"
      @click="$router.push({ name: 'organizers'})"
      class="cursor-pointer"
    />
    <blackStat 
      title="Мероприятие" 
      :icon="CalendarDaysIcon" 
      :value="count?.event?.count"
      @click="$router.push({ name: 'event'})"
      class="cursor-pointer"
    />
    <blackStat 
      title="Пользователи" 
      :icon="UserCircleIcon" 
      :value="count?.user?.count"
      @click="$router.push({ name: 'users'})"
      class="cursor-pointer" 
    />
    <blackStat 
      title="Билеты" 
      :icon="TicketIcon" 
      :value="count?.tickets?.ticketCount"
      @click="$router.push({ name: 'ticket'})"
      class="cursor-pointer"
    />
  </div>
</template>
<script setup>
import blackStat from './blackStat.vue'
defineProps(['count'])

import {
  UserGroupIcon,
  TicketIcon,
  SwatchIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'
</script>
<style lang=""></style>
