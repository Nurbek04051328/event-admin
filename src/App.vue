<template>
  <RouterView />
  <notificationPart />
</template>
<script setup>
import notificationPart from '@/components/default/notificationDefault.vue'
import cookies from 'vue-cookies'
import { socket } from './socket'
import { onMounted, } from 'vue'
import { eventStore } from '@/stores/data/event';
import { organizerStore } from '@/stores/user/organizer';
import { activationStore } from '@/stores/data/activation';
const event_store = eventStore();
const organization_store = organizerStore();
const activation_store = activationStore();

onMounted(async () => {
  if (cookies.get('dashboard-token')) {
    // Event qo'shilish hodisasi
    socket.on("new-event", async(id) => {
      console.log("newEvent");
      await event_store.getNewSocket(id)
    });
    // Event update hodisasi
    socket.on("update-event", async(id) => {
      console.log("epdateEvent", id);
      await event_store.getUpdateSocket(id)
    });
    // Organization qo'shilish hodisasi
    socket.on("new-organizer", async(id) => {
      console.log("new-organizer", id);
      
      await organization_store.getNewSocket(id)
    });
    socket.on("update-organizer", async(id) => {
      console.log("update-organizer", id);
      await organization_store.getUpdateSocket(id)
    });
    // Activation-key qo'shilish hodisasi
    socket.on("new-key", async(id) => {
      console.log("activekey", id);
      await activation_store.getLastKey(id)
    });
    // Activation-key actived hodisasi
    socket.on("update-key", async(id) => {
      console.log("updatekey", id);
      await activation_store.getActiveKey(id)
    });
  } 
})

</script>
