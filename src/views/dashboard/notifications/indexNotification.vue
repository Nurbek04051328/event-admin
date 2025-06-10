<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart :count="store.notificationCount">
      <div class="space-x-4">
        <router-link
          :to="{ name: 'type-notification' }"
          :class="{
            'text-purple-500 underline underline-offset-2': route.name == 'type-notification'
          }"
        >
          Тип уведомление
        </router-link>
        <router-link
          :to="{ name: 'package-notification' }"
          :class="{
            'text-purple-500 underline underline-offset-2': route.name == 'package-notification'
          }"
        >
          Пакеты уведомлении
        </router-link>
        <router-link
          :to="{ name: 'bought-notification' }"
          :class="{
            'text-purple-500 underline underline-offset-2': route.name == 'bought-notification'
          }"
        >
          Куплено
        </router-link>
      </div>
    </headPart>
    <router-view />
  </div>
</template>
<script setup>
import { notificationStore } from '@/stores/data/notification'
const store = notificationStore()

import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style lang=""></style>
