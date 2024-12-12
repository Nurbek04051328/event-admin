<template>
  <div class="flex p-4 gap-10 md-max:block">
    <nav class="flex grid-col w-60 flex-col md-max:w-full" aria-label="Sidebar">
      <ul role="list" class="-mx-2 space-y-2 bg-gray-50 p-1 md-max:flex md-max:w-full md-max:items-center md-max:space-y-0  ">
        <li v-for="item in settingMenu" :key="item.name">
          <router-link
            :to="{ name: item.name }"
            :class="[
              item.name == route.name
                ? 'bg-blue-700 text-white'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
            ]"
            class="md-max:mr-2 xm-max:text-[12px] xm-max:mr-1 xs:text-[10px]"
          >
            {{ $t('settingMenu.' + item.name) }}
            <span
              v-if="item.count"
              class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
              aria-hidden="true"
              >{{ item.count }}</span
            >
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const route = useRoute()
const { t } = useI18n()
import { settingMenu } from '@/helpers/settingMenu'
// const navigation = [
//   { name: 'Tillar', to: 'language', count: '' },
//   { name: 'Kategoriyalar', to: 'categories', count: '' },
//   { name: 'Subkategoriyalar', to: 'subcategories', count: '' },
//   // { name: 'Shahar/tumanlar', to: 'city', count: '' },
//   // { name: 'Maktablar', to: 'school', count: '' },
// ]
</script>
<style lang=""></style>
