<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part 
      :count="social_store.socialsCount" 
    />
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <socialTable :page="page" :limit="limit" />
      <socialDialog />
    </div>

    <div class="pl-4 py-2">
      <paginate
        v-if="social_store.socialsCount > limit"
        v-model="page"
        :page-count="Math.ceil(social_store.socialsCount / limit)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Пред'"
        :next-text="'След'"
        :page-class="'page-item'"
        :container-class="'pagination_next shadow'"
      />
    </div>
  </div>
  
</template>
<script setup>
import { onMounted, ref } from 'vue'
import socialTable from '@/components/settings/social/socialTable.vue'
import socialDialog from '@/components/settings/social/socialDialog.vue'
import { socialStore } from '@/stores/data/social'
const social_store = socialStore()


const page = ref(1)
const limit = ref(30)

const getData = async () => {
  await social_store.getSocials({ limit: limit.value, page: page.value })
}

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

onMounted(async () => {
  getData()
})
</script>
<style lang=""></style>
