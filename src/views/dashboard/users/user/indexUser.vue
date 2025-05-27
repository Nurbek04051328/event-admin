<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart :count="store.user.count">
      <UserSearch v-model="search" @searching="getData"/>
    </headPart>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <UsersTable :page="page" :limit="limit" />
    </div>
    <div class="pl-4 pb-2">
      <paginate
        v-if="store.user.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.user.count / limit)"
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
import UsersTable from '@/components/data/dashboard/users/usersTable.vue'
import UserSearch from '@/components/data/dashboard/users/userSearch.vue'
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { usersStore } from '@/stores/data/users'
const store = usersStore()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// Pagination
const page = ref(1)
const limit = ref(30)
const search = ref({})
const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  const filtered = Object.fromEntries(
    Object.entries(search.value).filter(([_, v]) => v !== '')
  )
  
  router.push({ name: 'users', query: { ...filtered } })
  await store.getUsers({ limit: limit.value, page: page.value, ...filtered })
}

onMounted(async () => {
  search.value = { ...route.query }
  await getData()
})
</script>

<style lang=""></style>
