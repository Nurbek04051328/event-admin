<template>
  <div class="w-full">
    <nav class="flex space-x-4" aria-label="Tabs">
      <button
        v-for="tab in list"
        :key="tab.name"
        @click="selectTab(tab.role)"
        :class="[
          tab.role === activeTab
            ? 'text-[#322B3F]'
            : 'border-transparent text-[#867B9A] hover:text-[#322B3F]',
          'whitespace-nowrap   text-[16px] font-bold'
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
