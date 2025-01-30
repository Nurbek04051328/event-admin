<template>
  <div class="h-screen flex w-full bg-[#F9F8FC]">
    <asideDefault />
    <div class="flex flex-col h-full w-full">
      <headerDefault />
      <main class="overflow-hidden 2xl:overflow-auto flex-1 flex flex-col">
        <routerView />
      </main>
    </div>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'
// import { socket } from '@/socket'

import asideDefault from '@/components/default/asideDefault.vue'
import headerDefault from '@/components/default/headerDefault.vue'

// import { organizerStore } from '@/stores/user/organizer'
// const org_store = organizerStore()

// onMounted(() => {
//   socket.on('new-organizer', async (data) => {
//     console.log('new-organizer', data)
//     await org_store.getLastOrganizer()
//   })
// })
</script>

<style lang="scss"></style>
