import {
  Cog6ToothIcon,
  ChartBarIcon,
  UserIcon,
  SwatchIcon,
  KeyIcon,
  TicketIcon,
  BookmarkSquareIcon


} from '@heroicons/vue/24/outline'

import { settingMenu } from './settingMenu'
import { BriefcaseIcon, CalendarIcon, UsersIcon } from '@heroicons/vue/20/solid'
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'

// import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/solid'

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
      toggle: true,
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
    path: 'ticket-paskage',
    name: 'ticketpaskage',
    component: () => import('@/views/dashboard/tarif/indexTarif.vue'),
    meta: {
      icon: SwatchIcon,
      title: 'Таърифы',
      toggle: true,
      group: 'main',
      toggleTitle: 'Добавить тариф'
    }
  },
  {
    path: 'ticket',
    name: 'ticket',
    component: () => import('@/views/dashboard/bilet/indexBilets.vue'),
    meta: {
      icon: TicketIcon,
      title: 'Билети',
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
    path: 'activation-keys',
    name: 'activationkeys',
    component: () => import('@/views/dashboard/activations/indexActivations.vue'),
    meta: {
      title: 'Активационные ключи',
      icon: KeyIcon,
      toggle: false,
      group: 'main'
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
      group: 'main',
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
  {
    path: 'logs',
    name: 'logs',
    component: () => import('@/views/dashboard/logger/indexLogger.vue'),
    meta: {
      title: 'Loggers',
      icon: BookmarkSquareIcon,
      toggle: false,
      group: 'main'
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
    children: settingMenu
  }
]
