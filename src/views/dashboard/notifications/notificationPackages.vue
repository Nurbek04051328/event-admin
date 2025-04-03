<template>
  <div class="p-4 pb-0 w-full overflow-auto flex-1">
    <NotifpackageTable
      :options="{
        languages
      }"
      :page="page"
      :limit="limit"
    />
    <NotifpackageDialog
      :options="{
        languages
      }"
    />
  </div>
  <div class="pl-4 pb-2">
    <paginate
      v-if="store.notifpackageCount > limit"
      v-model="page"
      :page-count="Math.ceil(store.notifpackageCount / limit)"
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
import NotifpackageTable from '@/components/data/dashboard/notification/packageTable.vue'
import NotifpackageDialog from '@/components/data/dashboard/notification/packageDialog.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { notifpackageStore } from '@/stores/data/notifPackage'
const store = notifpackageStore()
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

const getData = async () => {
  await store.getNotifpackages({ limit: limit.value, page: page.value })
}

import { notificationStore } from '@/stores/data/notification'
const notif_store = notificationStore()

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 })
  await getData()
  await notif_store.getNotifications({ limit: 0 })
})
</script>

<style lang="scss" scoped></style>
