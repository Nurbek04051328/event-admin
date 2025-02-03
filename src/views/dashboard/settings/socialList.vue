<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part :count="social_store.socialsCount" />
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <socialTable />
      <socialDialog />
    </div>
  </div>
  
</template>
<script setup>
import { onMounted } from 'vue'
import socialTable from '@/components/settings/social/socialTable.vue'
import socialDialog from '@/components/settings/social/socialDialog.vue'
import { socialStore } from '@/stores/data/social'
const social_store = socialStore()

onMounted(async () => {
  await social_store.getSocials()
})
</script>
<style lang=""></style>
