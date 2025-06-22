<template>
  <RouterView />
  <notificationPart />
</template>
<script setup>
  import cookies from 'vue-cookies'
  import notificationPart from '@/components/default/notificationDefault.vue'

  import { socket } from './socket'
  import { onMounted, } from 'vue'
  import { eventStore } from '@/stores/data/event';
  import { organizerStore } from '@/stores/user/organizer';
  import { activationStore } from '@/stores/data/activation';
  import { messageStore } from '@/stores/data/message'

  const event_store = eventStore();
  const organization_store = organizerStore();
  const activation_store = activationStore();
  const message_store = messageStore();


  import { useRoute } from 'vue-router';
  const route = useRoute();




  onMounted(async () => {
    // Socket ishlash
    if (cookies.get('dashboard-token')) {
      // Event qo'shilish hodisasi
      socket.on("new-event", async(id) => {
        await event_store.getNewSocket(id)
      });
      // Event update hodisasi
      socket.on("update-event", async(id) => {
        await event_store.getUpdateSocket(id)
      });
      // Organization qo'shilish hodisasi
      socket.on("new-organizer", async(id) => {
        await organization_store.getNewSocket(id)
      });
      socket.on("update-organizer", async(id) => {
        await organization_store.getUpdateSocket(id)
      });
      // Activation-key qo'shilish hodisasi
      socket.on("new-key", async(id) => {
        await activation_store.getLastKey(id)
      });
      // Activation-key actived hodisasi
      socket.on("update-key", async(id) => {
        await activation_store.getActiveKey(id)
      });
      // New Message hodisasi
      socket.on("new-message", async(data) => {
        console.log("newmessage", data);
        
        if(route.params.id == data?.room) {
          console.log("soketif", data);
          
          await message_store.newMessage(data?.message)
          data.notViewed = 0
        }
        await message_store.filterRoom(data)
      });
      //  Message o'qilishi viewed hodisasi
      socket.on("message-viewed", (id) => {
        message_store.viewMessage(id)
      });
      // socket.on("message-viewed", (id) => {
      //   message_store.viewMessage(id)
      // });
    } 
  })

</script>
