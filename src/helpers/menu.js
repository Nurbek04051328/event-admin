import {
  Cog6ToothIcon,
  ChartBarIcon,
  UserIcon,
  SwatchIcon,
  KeyIcon,
  TicketIcon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  UsersIcon,
  CalendarIcon,
  BanknotesIcon,
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  NewspaperIcon
} from '@heroicons/vue/24/outline'

import { settingMenu } from './settingMenu'
import { settingChildren } from './settingChild'
import { PhotoIcon } from '@heroicons/vue/20/solid'

export const links = [
  {
    path: 'dashboard',
    name: 'dashboard',

    component: () => import('@/views/dashboard/dashboardPage.vue'),
    meta: {
      icon: ChartBarIcon,
      title: 'Главная',
      group: 'main'
    }
  },
  {
    path: 'workers',
    name: 'workers',
    component: () => import('@/views/dashboard/workers/indexWorkers.vue'),
    meta: {
      icon: UserIcon,
      title: 'Сотрудники',
      group: 'main',
      linkName: 'workerAdd',
      toggleTitle: 'Добавить сотрудника'
    }
  },
  {
    path: 'organizers',
    name: 'organizers',
    component: () => import('@/views/dashboard/users/organizer/indexOrganizer.vue'),
    meta: {
      group: 'main',
      icon: BriefcaseIcon,
      title: 'Организаторы'
    }
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('@/views/dashboard/users/user/indexUser.vue'),
    meta: {
      group: 'main',
      icon: UsersIcon,
      title: 'Пользователи'
    }
  },
  {
    path: 'transaction',
    name: 'transaction',
    component: () => import('@/views/dashboard/transaction/indexTransMenu.vue'),
    redirect: { name: 'transaction-list' },
    meta: {
      title: 'Финансы',
      icon: BanknotesIcon,
      toggle: false,
      group: 'main'
    },
    children: [
      {
        path: '',
        name: 'transaction-list',
        component: () => import('@/views/dashboard/transaction/indexTransaction.vue'),
        meta: {
          title: 'Транзакция',
          toggle: false,
          group: 'middle',
          active: 'transaction'
        }
      },
      {
        path: 'ticketpaskage',
        name: 'ticketpaskage',
        component: () => import('@/views/dashboard/tarif/indexTarif.vue'),
        meta: {
          title: 'Тарифы',
          toggle: true,
          group: 'middle',
          active: 'transaction'
        }
      },
      {
        path: 'notification',
        name: 'notification',
        component: () => import('@/views/dashboard/notifications/indexNotification.vue'),
        meta: {
          title: 'Уведомление',
          icon: BellIcon,
          toggle: true,
          active: 'transaction',
          group: 'middle',
        },
        children: [
          {
            path: '',
            name: 'type-notification',
            component: () => import('@/views/dashboard/notifications/typeNotification.vue'),
            meta: {
              title: 'Тип уведомление',
              group: 'middle',
            }
          },
          {
            path: 'packages',
            name: 'package-notification',
            component: () => import('@/views/dashboard/notifications/notificationPackages.vue'),
            meta: {
              title: 'Пакет уведомление',
              group: 'middle',
            }
          },
          {
            path: 'bought',
            name: 'bought-notification',
            component: () => import('@/views/dashboard/notifications/boughtNotif.vue'),
            meta: {
              title: 'Купленные пакеты',
              toggle: false,
              group: 'middle',
            }
          }
        ]
      },
      {
        path: 'tax',
        name: 'tax',
        component: () => import('@/views/dashboard/settings/indexNalog.vue'),
        meta: {
          title: 'Налог',
          toggle: true,
          group: 'middle',
          toggleTitle: 'Новый налог',
          active: 'transaction'
        }
      },
      {
        path: 'refound',
        name: 'refound',
        component: () => import('@/views/dashboard/settings/indexRefound.vue'),
        meta: {
          title: 'Политика возврата',
          toggle: true,
          group: 'middle',
          toggleTitle: 'Новый',
          active: 'transaction'
        }
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/views/dashboard/transaction/indexSalexTicket.vue'),
        meta: {
          title: 'Продажи',
          toggle: false,
          group: 'middle',
          active: 'transaction'
        }
      },
      // {
      //   path: 'packages',
      //   name: 'package-notification',
      //   component: () => import('@/views/dashboard/notifications/notificationPackages.vue'),
      //   meta: {
      //     title: 'Пакет уведомление'
      //   }
      // },
      // {
      //   path: 'bought',
      //   name: 'bought-notification',
      //   component: () => import('@/views/dashboard/notifications/boughtNotif.vue'),
      //   meta: {
      //     title: 'Купленные пакеты',
      //     toggle: false,
      //   }
      // }
    ]
  },
  // {
  //   path: 'ticket-paskage',
  //   name: 'ticketpaskage',
  //   component: () => import('@/views/dashboard/tarif/indexTarif.vue'),
  //   meta: {
  //     icon: SwatchIcon,
  //     title: 'Тарифы',
  //     toggle: true,
  //     group: 'main',
  //     toggleTitle: 'Добавить тариф'
  //   }
  // },
  {
    path: 'ticket',
    name: 'ticket',
    component: () => import('@/views/dashboard/bilet/indexBilets.vue'),
    meta: {
      icon: TicketIcon,
      title: 'Билеты',
      toggle: false,
      group: 'main'
    }
  },
  {
    path: 'event',
    name: 'event',
    component: () => import('@/views/dashboard/event/indexEvents.vue'),
    meta: {
      icon: CalendarIcon,
      title: 'Мероприятие',
      toggle: false,
      group: 'main',
      toggleTitle: 'Добавить'
    }
  },
  {
    path: 'ads',
    name: 'ads',
    component: () => import('@/views/dashboard/ad/indexAd.vue'),
    meta: {
      title: 'Рекламы',
      icon: ClipboardDocumentListIcon,
      toggle: true,
      group: 'main'
    }
  },
  {
    path: 'news',
    name: 'news',
    component: () => import('@/views/dashboard/news/indexNews.vue'),
    meta: {
      title: 'Новости',
      icon: NewspaperIcon,
      linkName: 'newsAdd',
      group: 'main',
      toggleTitle: 'Добавить новости'
    }
  },
  {
    path: 'posts',
    name: 'posts',
    component: () => import('@/views/dashboard/post/indexPost.vue'),
    redirect: { name: 'active-posts' },
    meta: {
      title: 'Посты',
      icon: PhotoIcon,
      group: 'main',
      toggleTitle: 'Добавить пост',
      linkName: 'postAdd',
    },
    children: [
      {
        path: 'active',
        name: 'active-posts',
        component: () => import('@/components/data/dashboard/post/table/postActiveTable.vue'),
        meta: {
          title: 'Посты',
          linkName: 'postAdd',
          active: 'posts'
        }
      },
      {
        path: 'pending',
        name: 'pending-posts',
        component: () => import('@/components/data/dashboard/post/table/postPendingTable.vue'),
        meta: {
          title: 'Посты',
          linkName: 'postAdd',
          active: 'posts'
        }
      },
      {
        path: 'denied',
        name: 'denied-posts',
        component: () => import('@/components/data/dashboard/post/table/postDeniedTable.vue'),
        meta: {
          title: 'Посты',
          linkName: 'postAdd',
          active: 'posts'
        }
      },
      {
        path: 'deleted',
        name: 'deleted-posts',
        component: () => import('@/components/data/dashboard/post/table/postDeletedTable.vue'),
        meta: {
          title: 'Посты',
          linkName: 'postAdd',
          active: 'posts'
        }
      }
    ]
  },
  {
    path: 'activation-keys',
    name: 'activationkeys',
    component: () => import('@/views/dashboard/activations/indexActivations.vue'),
    meta: {
      title: 'Активационные ключи',
      icon: KeyIcon,
      toggle: false,
      group: 'header'
    }
  },
  {
    path: 'messages',
    name: 'messages',
    component: () => import('@/views/dashboard/message/indexMessage.vue'),
    meta: {
      title: 'Сообщение',
      icon: ChatBubbleLeftIcon,
      toggle: false,
      group: 'header',
      toggleTitle: 'Создать чат'
    },
    children: [
      {
        path: ':id',
        name: 'showChat',
        component: () => import('@/views/dashboard/message/showChat.vue'),
        meta: {
          title: 'Чат'
        }
      }
    ]
  },
  // {
  //   path: 'notification',
  //   name: 'notification',
  //   component: () => import('@/views/dashboard/notifications/indexNotification.vue'),
  //   meta: {
  //     title: 'Уведомление',
  //     icon: BellIcon,
  //     toggle: true,
  //     group: 'header'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'type-notification',
  //       component: () => import('@/views/dashboard/notifications/typeNotification.vue'),
  //       meta: {
  //         title: 'Тип уведомление'
  //       }
  //     },
  //     {
  //       path: 'packages',
  //       name: 'package-notification',
  //       component: () => import('@/views/dashboard/notifications/notificationPackages.vue'),
  //       meta: {
  //         title: 'Пакет уведомление'
  //       }
  //     },
  //     {
  //       path: 'bought',
  //       name: 'bought-notification',
  //       component: () => import('@/views/dashboard/notifications/boughtNotif.vue'),
  //       meta: {
  //         title: 'Купленные пакеты',
  //         toggle: false,
  //       }
  //     }
  //   ]
  // },
  {
    path: 'logs',
    name: 'logs',
    component: () => import('@/views/dashboard/logger/indexLogger.vue'),
    meta: {
      title: 'Журналы',
      icon: BookmarkSquareIcon,
      toggle: false,
      group: 'header'
    }
  },
  {
    path: 'settings',
    name: 'settings',
    component: () => import('@/views/dashboard/settings/indexSettings.vue'),
    meta: {
      icon: Cog6ToothIcon,
      group: 'setting',
      title: 'Настройки'
    },
    children: [...settingMenu, ...settingChildren]
  }
]
