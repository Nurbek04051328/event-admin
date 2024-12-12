export const settingMenu = [
  {
    path: 'language',
    name: 'language',
    component: () => import('@/views/dashboard/settings/languageList.vue'),
    meta: {
      title: 'Настройки - Языки',
      toggle: true,
      group: 'setting'
    }
  },
  {
    path: 'category',
    name: 'category',
    component: () => import('@/views/dashboard/categories/indexCategories.vue'),
    meta: {
      title: 'Настройки - Категорий',
      toggle: true,
      group: 'setting'
    }
  },
  {
    path: 'subcategory',
    name: 'subcategory',
    component: () => import('@/views/dashboard/subcategories/indexSubcategories.vue'),
    meta: {
      title: 'Настройки - Подкатегорий',
      toggle: true,
      group: 'setting',
      toggleTitle: 'Yangi Ichki Toifa'
    }
  },
  {
    path: 'social',
    name: 'social',
    component: () => import('@/views/dashboard/settings/socialList.vue'),
    meta: {
      title: 'Настройки - Соц. сетей',
      toggle: true,
      group: 'setting',
      toggleTitle: 'Yangi Social-Media'
    }
  }
]
