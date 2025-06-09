export const detailMenu = [
  // Organizer
  {
    path: 'organizer/:id',
    name: 'show-organizer',
    component: () => import('@/views/dashboard/users/organizer/showOrganizer.vue'),
    meta: {
      title: 'Организатор',
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


  //  Events
  {
    path: 'event/:id',
    name: 'eventDetail',
    component: () => import('@/views/dashboard/event/eventDetail.vue'),
    meta: {
      title: 'Страница мероприятие',
      active: 'event',
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
    path: 'event/edit/:id',
    name: 'event-edit',
    component: () => import('@/views/dashboard/event/eventEdit.vue'),
    meta: {
      title: 'Редактировать мероприятие',
      back: true
    }
  },

  // Workers
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

  // Users
  {
    path: 'user/:id',
    name: 'user-detail',
    component: () => import('@/views/dashboard/users/user/showUser.vue'),
    meta: {
      title: 'Пользователи',
      active: 'users',
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

  // News
  {
    path: 'news/add',
    name: 'newsAdd',
    component: () => import('@/components/data/dashboard/news/newsAddPage.vue'),
    meta: {
      title: 'Добавить новости',
      active: 'news'
    }
  },
  {
    path: 'news/edit/:id/:lang',
    name: 'newsEdit',
    component: () => import('@/components/data/dashboard/news/newsEditPage.vue'),
    meta: {
      title: 'Редактировать новости',
      active: 'news'
    }
  },
  {
    path: 'news/view/:id',
    name: 'newsView',
    component: () => import('@/components/data/dashboard/news/newsViewPage.vue'),
    meta: {
      title: 'Редактировать новости',
      active: 'news'
    },
    children: [
      {
        path: 'ru',
        name: 'ru',
        component: () => import('@/components/data/dashboard/news/newsViewsLangPage.vue'),
        meta: {
          active: 'posts'
        }
      },
      {
        path: 'en',
        name: 'en',
        component: () => import('@/components/data/dashboard/news/newsViewsLangPage.vue'),
        meta: {
          active: 'posts'
        }
      },
      {
        path: 'uz',
        name: 'uz',
        component: () => import('@/components/data/dashboard/news/newsViewsLangPage.vue'),
        meta: {
          active: 'posts'
        }
      }
    ]
  },

  // Post
  {
    path: 'post/add',
    name: 'postAdd',
    component: () => import('@/components/data/dashboard/post/postAddPage.vue'),
    meta: {
      title: 'Добавить пост',
      active: 'posts'
    }
  },
  {
    path: 'post/edit/:id',
    name: 'postEdit',
    component: () => import('@/components/data/dashboard/post/postEditPage.vue'),
    meta: {
      title: 'Редактировать пост',
      active: 'posts'
    }
  },
  {
    path: 'post/view/:id',
    name: 'postView',
    component: () => import('@/components/data/dashboard/post/postViewPage.vue'),
    meta: {
      title: 'Пост',
      active: 'posts'
    },
    children: [
      {
        path: 'comments',
        name: 'post-comments',
        component: () => import('@/components/data/dashboard/post/postCommentPage.vue'),
        meta: {
          active: 'posts'
        }
      },
      {
        path: 'likes',
        name: 'post-likes',
        component: () => import('@/components/data/dashboard/post/postLikesPage.vue'),
        meta: {
          active: 'posts'
        }
      },
      {
        path: 'views',
        name: 'post-views',
        component: () => import('@/components/data/dashboard/post/postViewsPage.vue'),
        meta: {
          active: 'posts'
        }
      }
    ]
  },
]
