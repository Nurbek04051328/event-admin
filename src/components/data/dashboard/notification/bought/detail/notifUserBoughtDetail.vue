<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
    backLink="bought-notification"
    :count="store.boughtUsersNotif?.count"
    >
      <!-- <NotifUserSearch /> -->
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <NotifUserBoughtTable
        :page="page" :limit="limit"
      />
    </div>
    <div class="pl-4 py-2">
      <paginate
        v-if="store.boughtUsersNotif?.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.boughtUsersNotif?.count / limit)"
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
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import paginate from 'vuejs-paginate-next'
import NotifUserBoughtTable from '@/components/data/dashboard/notification/bought/detail/notifUserBoughtTable.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref('')


import { notificationStore } from '@/stores/data/notification'
const store = notificationStore()




const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getBoughtUsersNotif({ _id: id.value, limit: limit.value, page: page.value })
}


onMounted(async () => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>