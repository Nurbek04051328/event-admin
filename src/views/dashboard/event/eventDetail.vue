<template>
  <headPart backLink="event">
    <div class="flex overflow-auto gap-2 items-center">
      <router-link
        class="send-btn px-4 py-[6px] rounded-md sm:text-[12px]"
        :to="{ name: 'event-edit', params: { id: route.params.id } }"
      >
        Редактировать
      </router-link>
      <!-- <pre>{{ eventInfo?.event?.status }}</pre> -->
      <button
        v-if="eventInfo?.event?.status == 'pending'"
        type="button"
        class="flex w-full items-center justify-center rounded-md border bg-green-50 text-[#05CD99] border-[#05CD99] px-4 py-[6px] font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50 text-sm sm:text-[12px]"
        @click="confirmAccess()"
      >
        {{ $t('event.detailPage.access') }}
      </button>
      <button
        v-if="eventInfo?.event?.status == 'pending'"
        type="button"
        class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-50 px-4 py-[6px] text-base font-medium text-[#FF5558] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:text-[12px]"
        @click="confirmRefusel()"
      >
        Отказать
      </button>
      <button
        v-if="eventInfo?.event?.status !== 'pending'"
        type="button"
        class="flex w-full items-center justify-center rounded-md border  px-4 py-[6px] text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 sm:text-[12px]"
        :class="`${eventInfo?.event?.status=='active'? 'bg-green-50 text-[#05CD99] border-[#05CD99]' : 'bg-[#F3EBFC] text-[#9E55EC] border-transparent'}`"
        @click="confirmBack()"
      >
        {{ eventInfo?.event?.status=='active'? 'Активный': $t('event.detailPage.danger') }}
      </button>
    </div>
  </headPart>
  <div class="px-4 pb-4 flex-1 overflow-hidden h-full">
    <Loading v-if="loading" class="h-full" />
    <div v-else class="h-full overflow-auto">

      <div  class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full overflow-auto">
        <div
          class="col-span-9 bg-white/100 rounded-[13px] shadow-sm order-first h-full overflow-auto 2xl:col-span-12 2xl:order-2"
        >
          <EventInfo :event="eventInfo.event" />
        </div>
        <div class="hidden 2xl:col-span-12 2xl:flex 2xl:order-1">
          <EventStatistic :org="eventInfo.ticket" />
        </div>
        <div
          class="col-span-3 flex flex-col space-y-3 h-full overflow-auto 2xl:col-span-12 2xl:order-3"
        >
          <EventStatistic :org="eventInfo.ticket" class="2xl:hidden"/>
          <div
            class="bg-white/100 rounded-[13px] shadow-sm px-2 flex flex-col h-full overflow-hidden"
          >
            <TabList :list="links" />
            <router-view />
          </div>
        </div>
      </div>
    </div>

  </div>
  <accessDialog
    :title="$t('event.accessDialog.accesstitle')"
    :btnTitle="$t('event.accessDialog.btnTitle')"
    @answer="access"
    @closeAccess="close('access')"
    :dialog="accessToggle"
  />
  <refusalDialog
    :title="$t('event.accessDialog.accesstitle')"
    :btnTitle="$t('event.accessDialog.btnTitle')"
    :dialog="refuselToggle"
    @closeRefusel="close('refusel')"
  />
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// const url = import.meta.env.VITE_URL;
// import { StarIcon } from '@heroicons/vue/20/solid'
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import AccessDialog from '@/components/data/dashboard/event/accessDialog.vue'
import RefusalDialog from '@/components/data/dashboard/event/refusalDialog.vue'
import Loading from '@/components/default/loadingDefault.vue';
// import { convertDateShort } from '@/helpers/func'
import { eventStore } from '@/stores/data/event'
const store = eventStore()
const { eventInfo, loading } = storeToRefs(store)

// Components

import EventInfo from '@/components/data/dashboard/event/eventInfo.vue'
import EventStatistic from '@/components/data/dashboard/event/eventStatistic.vue'
// import EventComment from '@/components/data/dashboard/event/eventComment.vue'
import TabList from '@/components/default/tabList.vue'

// Access Dialog
const accessToggle = ref(false)
const confirmAccess = () => {
  accessToggle.value = true
}
const access = async () => {
  if (route.params.id) {
    await store.changeStatus(
      {
        _id: route.params.id,
        status: 'active'
      },
      t
    )
  }
  close('access')
}

const close = (val) => {
  if (val == 'refusel') refuselToggle.value = false
  if (val == 'access') accessToggle.value = false
}

// refusal Dialog
const refuselToggle = ref(false)
const confirmRefusel = () => {
  refuselToggle.value = true
}

// Back Dialog confirmBack
const confirmBack = async () => {
  if (route.params.id) {
    await store.changeStatus(
      {
        _id: route.params.id,
        status: 'pending'
      },
      t
    )
  }
}

const links = [
  {
    name: 'eventLogger',
    title: 'История'
  },
  {
    name: 'eventTicket',
    title: 'Билеты'
  },
  {
    name: 'eventComment',
    title: 'Комментарии'
  }
]

onMounted(async () => {
  await store.getEvent(route.params.id)
  console.log('eventInfo.value', eventInfo.value)
})
</script>

<style></style>
