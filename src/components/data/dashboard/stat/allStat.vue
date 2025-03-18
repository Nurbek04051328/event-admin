<template>
  <!-- <h3 class="text-base font-semibold leading-6 w-full">{{ $t('home.title') }}</h3> -->
  <div class="mt-2 grid grid-cols-4 gap-3 sm:grid-cols-3 xs-max:grid-cols-2">
    <blackStat
      title="Сотрудники"
      :icon="UsersIcon"
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
      iconColor="text-[#FF5558]"
      bgIconColor="bg-[#FF555826]"
    />
    <blackStat 
      title="Билеты" 
      :icon="TicketIcon" 
      :value="count?.tickets?.ticketCount"
      @click="$router.push({ name: 'ticket'})"
      class="cursor-pointer"
      iconColor="text-[#FFCE20]"
      bgIconColor="bg-[#FFF8DE]"
    />
    <blackStat 
      title="Пользователи" 
      :icon="UserGroupIcon" 
      :value="count?.user?.count"
      @click="$router.push({ name: 'users'})"
      class="cursor-pointer" 
      iconColor="text-[#05CD99]"
      bgIconColor="bg-[#E1F9F2]"
    />
  </div>
</template>
<script setup>
// Componenta import
  import blackStat from './blackStat.vue'
  defineProps(['count'])


// Icon import
  import {
    UserGroupIcon,
    TicketIcon,
    SwatchIcon,
    UsersIcon
  } from '@heroicons/vue/24/outline'
</script>

