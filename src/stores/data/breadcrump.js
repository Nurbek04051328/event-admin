import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbs = reactive([]);

  function setBreadcrumbs(items) {
    breadcrumbs.length = 0;
    items.forEach(item => breadcrumbs.push(item));
  }

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
});