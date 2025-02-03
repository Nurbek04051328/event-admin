export const settingChildren = [
  {
    path: 'category/:id',
    name: 'subcategory',
    component: () => import('@/views/dashboard/subcategories/indexSubcategories.vue'),
    meta: {
      title: 'Настройки/Подкатегорий',
      active: 'category',
      toggle: true,
      group: 'setting',
      back: true
    }
  },
]