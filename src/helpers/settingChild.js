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
    path: 'subcategory/:id',
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
]