export const detailMenu = [
  {
    path: 'organizer/:id',
    name: 'show-organizer',
    component: () => import('@/views/dashboard/users/organizer/showOrganizer.vue'),
    meta: {
      title: 'Организатор',
      active: 'organizers'
    },
    children: [
      {
        path: 'tickets',
        name: 'organizer-tickets',
        component: () => import('@/components/data/dashboard/organizer/organizerTickets.vue'),
        meta: {
          active: 'organizers'
        }
      },
      {
        path: 'wallet',
        name: 'organizer-wallet',
        component: () => import('@/components/data/dashboard/wallet/usersWallet.vue'),
        meta: {
          active: 'organizers'
        }
      },
      {
        path: 'logger',
        name: 'organizer-logger',
        component: () => import('@/components/data/dashboard/logger/userLogger.vue'),
        meta: {
          active: 'organizers'
        }
      }
    ]
  },
  {
    path: 'event/:id',
    name: 'eventDetail',
    component: () => import('@/views/dashboard/event/eventDetail.vue'),
    meta: {
      title: 'Страница мероприятие',
      active: 'event'
    },
    children: [
      {
        path: 'tickets',
        name: 'eventTicket',
        component: () => import('@/components/data/dashboard/event/eventTickets.vue'),
        meta: {
          active: 'event'
        }
      },
      {
        path: 'logger',
        name: 'eventLogger',
        component: () => import('@/components/data/dashboard/logger/eventLogger.vue'),
        meta: {
          group: 'main',
          active: 'event'
        }
      },
      {
        path: 'comment',
        name: 'eventComment',
        component: () => import('@/components/data/dashboard/event/eventComment.vue'),
        meta: {
          group: 'main',
          active: 'event'
        }
      }
    ]
  },
  {
    path: 'workers/:id',
    name: 'workerDetail',
    component: () => import('@/views/dashboard/workers/showWorker.vue'),
    meta: {
      title: 'Страница сотрудника',
      active: 'workers'
    },
    children: [
      {
        path: 'statistic',
        name: 'worker-statistic',
        component: () => import('@/components/data/dashboard/worker/workerStat.vue'),
        meta: {
          active: 'workers'
        }
      },
      {
        path: 'history',
        name: 'worker-history',
        component: () => import('@/components/data/dashboard/worker/workerHistory.vue'),
        meta: {
          active: 'workers'
        }
      },
      {
        path: 'logger',
        name: 'worker-logger',
        component: () => import('@/components/data/dashboard/logger/workerLogger.vue'),
        meta: {
          group: 'main',
          active: 'workers'
        }
      }
    ]
  },
  {
    path: 'workers/add',
    name: 'workerAdd',
    component: () => import('@/components/data/dashboard/worker/workerAddPage.vue'),
    meta: {
      title: 'Добавить сотрдуник',
      active: 'workers'
    }
  },
  {
    path: 'workers/edit/:id',
    name: 'workerEdit',
    component: () => import('@/components/data/dashboard/worker/workerEditPage.vue'),
    meta: {
      title: 'Редактировать сотрдуник',
      active: 'workers'
    }
  },
  {
    path: 'user/:id',
    name: 'user-detail',
    component: () => import('@/views/dashboard/users/user/showUser.vue'),
    meta: {
      title: 'Пользователи',
      active: 'users'
    },
    children: [
      {
        path: 'tickets',
        name: 'user-tickets',
        component: () => import('@/components/data/dashboard/users/userTickets.vue'),
        meta: {
          active: 'users'
        }
      },
      {
        path: 'wallet',
        name: 'user-wallet',
        component: () => import('@/components/data/dashboard/wallet/usersWallet.vue'),
        meta: {
          active: 'users'
        }
      },
      {
        path: 'logger',
        name: 'user-logger',
        component: () => import('@/components/data/dashboard/logger/userLogger.vue'),
        meta: {
          active: 'users'
        }
      }
    ]
  },
  {
    path: 'news/add',
    name: 'newsAdd',
    component: () => import('@/components/data/dashboard/news/newsAddPage.vue'),
    meta: {
      title: 'Добавить новости',
      active: 'news'
    }
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
