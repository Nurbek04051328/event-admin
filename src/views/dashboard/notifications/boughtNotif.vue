<template>
  <div class="p-4 pb-0 w-full overflow-auto flex-1">
    <NotificationTable
      :options="{
        languages
      }"
      :page="page"
      :limit="limit"
    />
    <NotificationDialog
      :options="{
        languages
      }"
    />
  </div>
  <div class="pl-4 pb-2">
    <paginate
      v-if="store.boughtNotif.count > limit"
      v-model="page"
      :page-count="Math.ceil(store.boughtNotif.count / limit)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :page-class="'page-item'"
      :container-class="'pagination_next shadow'"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import NotificationTable from '@/components/data/dashboard/notification/bought/notificationTable.vue'
import NotificationDialog from '@/components/data/dashboard/notification/bought/notificationDialog.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { notificationStore } from '@/stores/data/notification'
const store = notificationStore()
import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

// Pagination
const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

import { notifpackageStore } from '@/stores/data/notifPackage'
const notifpack_store = notifpackageStore()

const getData = async () => {
  await store.getBoughtNotif({ limit: limit.value, page: page.value })
}

import { organizerStore } from '@/stores/user/organizer'
const organizer = organizerStore()

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await getData()
  await organizer.getorganizers({ limit: 0 })
  await notifpack_store.getNotifpackages({ limit: 0 })
})
</script>

<style lang="scss" scoped></style>
