<template>
  <div class="border-b border-gray-200 w-full">
    <nav class="flex space-x-8" aria-label="Tabs">
      <button
        v-for="tab in list"
        :key="tab.name"
        @click="selectTab(tab.role)"
        :class="[
          tab.role === activeTab
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
          'whitespace-nowrap border-b-[1px] py-4 px-1 text-sm font-medium'
        ]"
      >
        {{ tab.title }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['list', 'active']);
const emit = defineEmits(['tab-changed']);

const activeTab = ref(props.active); // Birinchi tabni faol deb belgilaymiz

const  selectTab = (tabName) => {
  activeTab.value = tabName; // Faol tabni yangilash
  // Bu yerda kerak bo'lsa, hodisa chiqarishingiz mumkin
  emit('tab-changed', tabName);
}

watch(() => props.active, (newValue) => {
  activeTab.value = newValue;
});


</script>

<style scoped>
/* Qo'shimcha responsivlik */
nav {
  overflow-x: auto; /* Juda ko'p tablar bo'lsa, skroll */
}
</style>
