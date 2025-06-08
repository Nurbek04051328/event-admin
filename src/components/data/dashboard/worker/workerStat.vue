<template>
  <div >
    <div v-if="role=='moderator' || role=='accountant'">
      <EventChart/>
      <UsersChart/>
    </div>
    <div v-if="role=='content_manager'">
      <NewsChart/>
      <PostChart/>
    </div>
  </div>
</template>
<script setup>
  import EventChart from './workerStatEventChart.vue'
  import UsersChart from './workerStatUserChart.vue'
  import NewsChart from './workerStatNewsChart.vue'
  import PostChart from './workerStatPostChart.vue'
defineProps(['role'])
</script>
<style lang=""></style>