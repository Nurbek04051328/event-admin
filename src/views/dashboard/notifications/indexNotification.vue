<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <headPart 
      :count="route.name == 'type-notification' ? store.notificationCount : 
      route.name == 'package-notification' ? notifPackage_store.notifpackageCount :
      route.name == 'bought-notification' ? store.boughtNotif.count :
      0">
      <div class="space-x-4 block md:flex">
        <router-link
          :to="{ name: 'type-notification' }"
          :class="{
            'text-purple-500 underline underline-offset-2': route.name == 'type-notification'
          }"
        >
          <span class="md:hidden">
            Тип уведомление
          </span>
          <span class="hidden md:flex">
            Тип
          </span>
        </router-link>
        <router-link
          :to="{ name: 'package-notification' }"
          :class="{
            'text-purple-500 underline underline-offset-2': route.name == 'package-notification'
          }"
        >
          <span class="md:hidden">
            Пакеты уведомлении
          </span>
          <span class="hidden md:flex">
            Пакеты
          </span>
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

import { notifpackageStore } from '@/stores/data/notifPackage'
const notifPackage_store = notifpackageStore()
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style lang=""></style>
