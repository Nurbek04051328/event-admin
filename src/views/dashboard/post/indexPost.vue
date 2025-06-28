<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart :count="store.posts.count">
      <div class="flex items-center gap-8">
        <div class="space-x-4">
          <router-link
            :to="{ name: 'active-posts' }"
            :class="{
              'text-purple-500 underline underline-offset-2': route.name == 'active-posts'
            }"
          >
            Активные
          </router-link>
          <router-link
            :to="{ name: 'pending-posts' }"
            :class="{
              'text-purple-500 underline underline-offset-2': route.name == 'pending-posts'
            }"
          >
            На рассмотрении
          </router-link>
          <router-link
            :to="{ name: 'denied-posts' }"
            :class="{
              'text-purple-500 underline underline-offset-2': route.name == 'denied-posts'
            }"
          >
            Отказанные
          </router-link>
          <router-link
            :to="{ name: 'deleted-posts' }"
            :class="{
              'text-purple-500 underline underline-offset-2': route.name == 'deleted-posts'
            }"
          >
            Удаленные
          </router-link>
        </div>
        <PostSearch />
      </div>
    </headPart>
    <router-view />
    <!-- <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <PostTable :page="page" :limit="limit" />
    </div> -->
    <!-- <div class="pl-4 pb-2">
      <paginate
        v-if="store.posts.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.posts.count / limit)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Пред'"
        :next-text="'След'"
        :page-class="'page-item'"
        :container-class="'pagination_next shadow'"
      />
    </div> -->
  </div>
</template>
<script setup>
// import PostTable from '@/components/data/dashboard/post/postTable.vue'
import PostSearch from '@/components/data/dashboard/post/postSearch.vue'
import paginate from 'vuejs-paginate-next'
// import { onMounted, ref } from 'vue'

import { postStore } from '@/stores/data/post'
const store = postStore()

import { useRoute } from 'vue-router'
const route = useRoute()

// Pagination
// const page = ref(1)
// const limit = ref(30)

// const clickCallback = async (value) => {
//   page.value = value
//   await getData()
// }

// const getData = async () => {
//   await store.getPosts({ limit: limit.value, page: page.value })
// }

// onMounted(async () => {
//   await getData()
// })
</script>
<style lang=""></style>
