<template>
  <div class="h-screen">
    <headPart>
      <div class="mr-2">
        <span class="text-lg text-gray-500 xm:text-base">Количество</span>: {{ store.user.count }}
      </div>
    </headPart>
    <div class="p-4 pb-0 w-full h-[78%] sm:h-[76%] xl:h-[85%]">
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
import paginate from 'vuejs-paginate-next'
import { onMounted, ref } from 'vue'
import { usersStore } from '@/stores/data/users'
const store = usersStore()

// Pagination
const page = ref(1)
const limit = ref(30)

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  await store.getUsers({ limit: limit.value, page: page.value })
}

onMounted(async () => {
  await getData()
})

</script>

<style lang=""></style>
