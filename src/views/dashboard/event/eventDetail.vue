<template>
    <headPart backLink="event">
      <div class="flex overflow-auto" >
        <button 
          v-if="eventInfo?.event?.status == 0"
          type="button"   
          class="flex w-full items-center justify-center rounded-md border bg-green-50 text-[#05CD99] border-[#05CD99] px-4 py-[6px] font-medium  focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50 text-sm xm-max:text-xs"
          @click="confirmAccess()"
        >
          {{ $t('event.detailPage.access') }}
        </button>
        <button 
          v-if="eventInfo?.event?.status == 0"
          type="button" 
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-50 px-4 py-[6px] text-base font-medium text-[#FF5558] border-[#FF5558] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 xm-max:text-xs"
          @click="confirmRefusel()"
        >
          Отказать
        </button>
        <button 
          v-if="eventInfo?.event?.status !== 0"
          type="button" 
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-[#F3EBFC] px-4 py-[6px] text-base font-medium text-[#9E55EC]  focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-50 xm-max:text-xs"
          @click="confirmBack()"
        >
          {{ $t('event.detailPage.danger') }}
        </button>
      </div>
    </headPart>
    <!-- <img src="" alt=""> -->
    <div class="px-4 pb-4 flex-1 overflow-hidden h-full">
      <div class="grid grid-cols-12 gap-4 h-full 2xl:h-auto md:h-full xm-max:grid-cols-6">
        <!-- event INFO -->
        <div class="col-span-9 bg-white/100 rounded-[26px] shadow-sm order-first h-full overflow-auto 2xl:col-span-4 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
          <EventInfo :event="eventInfo.event"  />
        </div>
        <div class="col-span-3 flex flex-col space-y-3 h-full overflow-auto 2xl:col-span-8 2xl:h-[670px] md-max:col-span-6 xm-max:col-span-6">
          <EventStatistic :org="eventInfo.ticket" />
          <div class="bg-white/100 rounded-[26px] shadow-sm px-2 flex flex-col h-full overflow-hidden">
            <TabList :list="links" />
            <router-view />
          </div>
        </div>
        <!-- <div class="col-span-3 flex flex-col h-full overflow-auto 2xl:col-span-12 2xl:h-[670px] md:col-span-12 xm-max:col-span-6">
          <EventComment />
        </div> -->
      </div>
    </div>
    <accessDialog 
      :title="$t('event.accessDialog.accesstitle')" 
      :btnTitle="$t('event.accessDialog.btnTitle')" 
      @answer="access" 
      @closeAccess="close('access')" 
      :dialog="accessToggle" />
    <refusalDialog :title="$t('event.accessDialog.accesstitle')" :btnTitle="$t('event.accessDialog.btnTitle')"  :dialog="refuselToggle" @closeRefusel="close('refusel')"/>
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
import AccessDialog from '@/components/data/dashboard/event/accessDialog.vue';
import RefusalDialog from '@/components/data/dashboard/event/refusalDialog.vue';
// import { convertDateShort } from '@/helpers/func'
import { eventStore } from '@/stores/data/event';
const store = eventStore();
const { eventInfo } = storeToRefs(store);
import L from "leaflet";
import "leaflet/dist/leaflet.css";



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

    await store.changeStatus({
      _id: route.params.id,
      status: 1
    }, t)
  }
  close('access')
}

const close = (val) => {
  if(val == "refusel") refuselToggle.value = false
  if(val == 'access') accessToggle.value = false
}

// refusal Dialog
const refuselToggle = ref(false)
const confirmRefusel = () => {
  refuselToggle.value = true
}


// Back Dialog confirmBack
const confirmBack = async () => {
  if (route.params.id) {
    await store.changeStatus({
      _id: route.params.id,
      status: 0
    }, t)
  }
}

const getData = () => {
  // karta
  console.log("eventvalue", eventInfo.value?.event);

  // DOMda xarita uchun element mavjudligini tekshirib xarita yaratish
  const mapElement = document.getElementById("map");
  if (mapElement) {
    const map = L.map("map").setView([41.311081, 69.240562], 11);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define a custom icon
    const customIcon = L.icon({
      iconUrl: "/marker.png", // Replace with your icon path
      iconSize: [25, 30], // Size of the icon [width, height]
      iconAnchor: [19, 38], // Point of the icon that corresponds to the marker's location [x, y]
      popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
    });

    // Add marker with the custom icon
    L.marker(
      [eventInfo.value?.event?.location?.latitude || 41.311081, eventInfo.value?.event?.location?.longitude || 69.240562],
      { icon: customIcon } // Use the custom icon here
    )
      .addTo(map)
      .bindPopup(eventInfo.value?.event?.location?.address || "Tashkent")
      .openPopup();
  } else {
    console.error("Map container not found!");
  }
};



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

onMounted(async() => {
  await store.getEvent(route.params.id)
  await getData()
  console.log("eventInfo.value",eventInfo.value);
  

      
})
</script>

<style>

</style>