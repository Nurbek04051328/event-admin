export const settingMenu = [
  {
    path: 'language',
    name: 'language',
    component: () => import('@/views/dashboard/settings/languageList.vue'),
    meta: {
      title: 'Настройки/Языки',
      toggle: true,
      group: 'setting'
    }
  },
  {
    path: 'category',
    name: 'category',
    component: () => import('@/views/dashboard/categories/indexCategories.vue'),
    meta: {
      title: 'Настройки/Категории',
      toggle: true,
      group: 'setting'
    }
  },
  {
    path: 'atributcategory',
    name: 'atributCategory',
    component: () => import('@/views/dashboard/settings/indexAtributCategory.vue'),
    meta: {
      title: 'Настройки/Атрибут категорий',
      toggle: true,
      group: 'setting',
    }
  },
  {
    path: 'social',
    name: 'social',
    component: () => import('@/views/dashboard/settings/socialList.vue'),
    meta: {
      title: 'Настройки/Соц. сетей',
      toggle: true,
      group: 'setting',
      toggleTitle: 'Yangi Social-Media'
    }
  },
  {
    path: 'page',
    name: 'page',
    component: () => import('@/views/dashboard/settings/indexPage.vue'),
    meta: {
      title: 'Настройки/Страница',
      toggle: true,
      group: 'setting',
      toggleTitle: 'Yangi Sahifa'
    }
  },
  // {
  //   path: 'tax',
  //   name: 'tax',
  //   component: () => import('@/views/dashboard/settings/indexNalog.vue'),
  //   meta: {
  //     title: 'Настройки/Налог',
  //     toggle: true,
  //     group: 'setting',
  //     toggleTitle: 'Новый налог'
  //   }
  // },
  // {
  //   path: 'refound',
  //   name: 'refound',
  //   component: () => import('@/views/dashboard/settings/indexRefound.vue'),
  //   meta: {
  //     title: 'Настройки/Политика возврата',
  //     toggle: true,
  //     group: 'setting',
  //     toggleTitle: 'Новый'
  //   }
  // },
  {
    path: 'regions',
    name: 'regions',
    component: () => import('@/views/dashboard/settings/regions.vue'),
    meta: {
      title: 'Настройки/Регионы',
      toggle: true,
      group: 'setting',
      toggleTitle: 'Новый'
    }
  }
]
