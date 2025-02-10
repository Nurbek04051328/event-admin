import { links } from '@/helpers/menu'
import { createRouter, createWebHistory } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/data/breadcrump';


const routes = [
  {
    path: '/',
    name: 'defaultLayout',
    redirect: 'dashboard',
    component: () => import('../layouts/defaultLayout.vue'),
    children: [...links, ...detailMenu]
  },
  {
    path: '/auth',
    name: 'authLayout',
    component: () => import('@/layouts/authLayout.vue'),
    meta: {
      title: 'Логин',
    },
    children: [
      {
        path: '',
        name: 'signIn',
        component: () => import('@/views/user/signIn.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

import { authStore } from '@/stores/user/auth'
import { detailMenu } from '@/helpers/detailMenu'
router.beforeEach(async (to, from, next) => {
  const auth_store = authStore()
  const breadcrumbStore = useBreadcrumbStore();

  // Breadcrumblarni hosil qilish
  const breadcrumbs = [];
  to.matched.forEach(route => {
    if (route.meta && route.meta.title) {
      breadcrumbs.push({
        name: route.name,
        path: route.path,
        title: route.meta.title,
      });
    }
  });

  breadcrumbStore.setBreadcrumbs(breadcrumbs);
  if (!['authLayout', 'signIn'].includes(to.name)) {
    await auth_store.checkUser()
  }
  document.title = `Eventum | ${to?.meta.title}`
  next()
})

export default router
