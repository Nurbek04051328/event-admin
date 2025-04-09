<template>
  <nav class="flex w-[250px] flex-col p-4 rounded-xl bg-white" aria-label="Sidebar">
    <ul role="list" class="space-y-1">
      <li v-for="(item, index) in navigation" :key="index">
        <div
          @click="handleMenu(index)"
          :class="[
            index == menu
              ? 'bg-gray-50 text-indigo-600'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
            'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold cursor-pointer'
          ]"
        >
          {{ item }}
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const menu = defineModel()

const handleMenu = (index) => {
  menu.value = index
}

const navigation = [
  'Основные информации',
  'Атрибуты',
  'Локации',
  'Календар',
  'Цены и билеты',
  'Настройки'
]
</script>
