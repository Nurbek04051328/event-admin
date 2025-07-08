<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart :count="store.posts.count">
      <div class="flex items-center gap-8">
        <div class="space-x-4 lg:flex lg:items-center">
          <router-link
            :to="{ name: 'active-posts' }"
            :class="
              route.name == 'active-posts' ? 'text-purple-500  underline underline-offset-2': ''
            "

          >
            <span class="lg:hidden">Активные</span>
            <!-- <CheckIcon class="hidden size-6 lg:block"/> -->
          </router-link>
          <router-link
            :to="{ name: 'pending-posts' }"
            :class="
              route.name == 'pending-posts' ? 'text-purple-500  underline underline-offset-2': 
              ''
            "
          >
            <span class="lg:hidden">На рассмотрении</span>
            <!-- <ClockIcon class="hidden size-6 lg:block"/> -->
          </router-link>
          <router-link
            :to="{ name: 'denied-posts' }"
            :class="
              route.name == 'denied-posts' ? 'text-purple-500  underline underline-offset-2': 
              ''
            "
          >
            
            <span class="lg:hidden">Отказанные</span>
            <!-- <XMarkIcon class="hidden size-6 lg:block"/> -->
          </router-link>
          <router-link
            :to="{ name: 'deleted-posts' }"
            :class="
              route.name == 'deleted-posts' ? 'text-purple-500  underline underline-offset-2': 
              ''
            "
          >
            <span class="lg:hidden">Удаленные</span>
            <!-- <TrashIcon class="hidden size-6 lg:block"/> -->
          </router-link>
        </div>
        <PostSearch />
      </div>
    </headPart>
    <router-view />
  </div>
</template>
<script setup>
import PostSearch from '@/components/data/dashboard/post/postSearch.vue'
import {
  ClockIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { XMarkIcon, CheckIcon} from '@heroicons/vue/20/solid'


import { postStore } from '@/stores/data/post'
const store = postStore()

import { useRoute } from 'vue-router'
const route = useRoute()

</script>
<style lang=""></style>
