export const detailMenu = [
  {
    path: 'organizer/:id',
    name: 'show-organizer',
    component: () => import('@/views/dashboard/users/organizer/showOrganizer.vue'),
    meta: {
      title: 'Организатор'
    },
    children: [
      {
        path: 'tickets',
        name: 'organizer-tickets',
        component: () => import('@/components/data/dashboard/organizer/organizerTickets.vue')
      },
      {
        path: 'logger',
        name: 'organizer-logger',
        component: () => import('@/components/data/dashboard/logger/userLogger.vue')
      }
    ]
  },
  {
    path: 'event/:id',
    name: 'eventDetail',
    component: () => import('@/views/dashboard/event/eventDetail.vue'),
    meta: {
      title: 'Страница мероприятие',
    },
    children: [
      {
        path: 'tickets',
        name: 'eventTicket',
        component: () => import('@/components/data/dashboard/event/eventTickets.vue')
      },
      {
        path: 'logger',
        name: 'eventLogger',
        component: () => import('@/components/data/dashboard/logger/eventLogger.vue'),
        meta: {
          group: 'main',
        }
      }
    ]
  },
  {
    path: 'worker/:id',
    name: 'workerDetail',
    component: () => import('@/views/dashboard/workers/showWorker.vue'),
    meta: {
      title: 'Страница сотрдуника',
    },
    children: [
      {
        path: 'history',
        name: 'worker-history',
        component: () => import('@/components/data/dashboard/worker/workerHistory.vue')
      },
      {
        path: 'logger',
        name: 'worker-logger',
        component: () => import('@/components/data/dashboard/logger/workerLogger.vue'),
        meta: {
          group: 'main',
        }
      }
    ]
  },
  {
    path: 'worker/add',
    name: 'workerAdd',
    component: () => import('@/components/data/dashboard/worker/workerAddPage.vue'),
    meta: {
      title: 'Добавить сотрдуник',
    }
  },
  {
    path: 'user/:id',
    name: 'user-detail',
    component: () => import('@/views/dashboard/users/user/showUser.vue'),
    meta: {
      title: 'Пользователи',
    },
    children: [
      {
        path: 'tickets',
        name: 'user-tickets',
        component: () => import('@/components/data/dashboard/organizer/organizerTickets.vue')
      },
      {
        path: 'logger',
        name: 'user-logger',
        component: () => import('@/components/data/dashboard/logger/userLogger.vue')
      }
    ]
  },
  // {
  //   path: 'message/:id',
  //   name: 'user-detail',
  //   component: () => import('@/views/dashboard/users/user/showUser.vue'),
  //   meta: {
  //     title: 'Пользователи',
  //   },
  //   children: [
  //     {
  //       path: 'tickets',
  //       name: 'user-tickets',
  //       component: () => import('@/components/data/dashboard/organizer/organizerTickets.vue')
  //     },
  //     {
  //       path: 'logger',
  //       name: 'user-logger',
  //       component: () => import('@/components/data/dashboard/logger/userLogger.vue')
  //     }
  //   ]
  // }
]
