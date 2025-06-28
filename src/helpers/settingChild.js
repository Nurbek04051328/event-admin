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
  {
    path: 'subcategory/:category/:subcategory',
    name: '2xsubcategory',
    component: () => import('@/views/dashboard/2xsubcategory/index2xSubcategory.vue'),
    meta: {
      title: 'Настройки/2xПодкатегорий',
      active: 'category',
      toggle: true,
      group: 'setting',
      back: true
    }
  },
  {
    path: 'atribut/:id',
    name: 'atribut',
    component: () => import('@/views/dashboard/settings/indexAtribut.vue'),
    meta: {
      title: 'Настройки/Атрибут',
      active: 'atributCategory',
      toggle: true,
      group: 'setting',
      back: true
    }
  },

   // Page
  {
    path: 'page/add',
    name: 'pageAdd',
    component: () => import('@/components/settings/page/pageAdd.vue'),
    meta: {
      title: 'Добавить страницу',
      active: 'page',
      group: 'setting',
    }
  },
  {
    path: 'page/edit/:id/:lang',
    name: 'pageEdit',
    component: () => import('@/components/settings/page/pageEdit.vue'),
    meta: {
      title: 'Редактировать страницу',
      group: 'setting',
      active: 'page',
    }
  },
]