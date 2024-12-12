<template>
  <h3 class="text-base font-semibold leading-6 w-full">{{ $t('home.title') }}</h3>
  <div class="mt-2 grid grid-cols-6 gap-3 sm:grid-cols-3 xs-max:grid-cols-2">
    <blackStat
      title="Сотрудников"
      :icon="UserGroupIcon"
      :value="count?.user?.manager + count?.user?.moderator"
    />
    <blackStat
      :title="$t('home.ticketpaskage')"
      :icon="SwatchIcon"
      :value="count?.ticketPackagesCount"
    />
    <blackStat
      title="Организаторы"
      :icon="BriefcaseIcon"
      :value="
        count.user?.organizerSuccess + count.user?.organizerPending + count?.user?.organizerDenied
      "
    />
    <blackStat title="Мероприятие" :icon="CalendarDaysIcon" :value="count?.event?.count" />
    <blackStat title="Пользователи" :icon="UserCircleIcon" :value="count?.user?.count" />
    <blackStat title="Билеты" :icon="TicketIcon" :value="count?.tickets?.ticketCount" />
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
