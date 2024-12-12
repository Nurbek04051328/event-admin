<template>
  <head-part />
    <socialTable />
    <socialDialog />
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
