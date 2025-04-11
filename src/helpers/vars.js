export const reasons = {
  register: 'Регистрация',
  resend: 'Переотправка',
  reset: 'Сброс'
}

export const actions = [
  {
    title: 'Дать права организатора',
    _id: 'organizer',
    mode: 'organizer',
    label: 'Проверено',
    class: 'success-tag'
  },
  {
    title: 'Забрать права огранизатора',
    _id: 'revoke',
    mode: 'organizer',
    label: 'Отказано',
    class: 'danger-tag'
  },
  {
    title: 'В ожидание',
    _id: 'pending',
    mode: 'organizer',
    label: 'В ожидание',
    class: 'warning-tag'
  }
]

export const eventActions = [
  {
    _id: 0,
    label: 'Проверка',
    class: 'warning-tag'
  },
  {
    _id: 1,
    label: 'Одобрен',
    class: 'success-tag'
  },
  {
    _id: 2,
    label: 'Отказан',
    class: 'danger-tag'
  }
]

export const walletActions = [
  {
    mode: 'refill',
    label: 'Приход',
    class: 'text-[#05CD99]'
  },
  {
    mode: 'refound',
    label: 'Возврат',
    class: 'text-[#FF5558]'
  },
  {
    mode: 'purchase',
    label: 'Покупка',
    class: 'text-[#FF5558]'
  },
  {
    mode: 'withdrawal',
    label: 'Вывод',
    class: 'text-[#05CD99]'
  },
  {
    mode: 'deposit',
    label: 'Пополнение',
    class: 'text-[#05CD99]'
  }
]

export const actionsall = [
  {
    title: 'Дать права организатора',
    _id: 'organizer',
    label: 'Проверено',
    class: 'success-tag'
  },
  {
    title: 'Забрать права огранизатора',
    _id: 'revoke',
    label: 'Отказано',
    class: 'danger-tag'
  },
  {
    title: 'Активный',
    _id: 'allow',
    label: 'Активный',
    class: 'success-tag'
  },
  {
    title: 'Ограничен',
    _id: 'limited',
    label: 'Ограничен',
    class: 'danger-tag'
  },
  {
    title: 'В ожидание',
    _id: 'pending',
    label: 'В ожидание',
    class: 'warning-tag'
  }
]

export const organizerInfo = {
  pending: {
    class: 'warning-tag',
    title: 'В ожидание'
  },
  denied: {
    class: 'danger-tag',
    title: 'Отказано'
  },
  success: {
    class: 'success-tag',
    title: 'Проверено'
  }
}
// ["active", "not active", "pending", "denied", "deleted", "archive"],

export const eventInfo = {
  pending: {
    label: 'Не превено',
    class: 'warning-tag'
  },
  active: {
    label: 'Одобрен',
    class: 'success-tag'
  },
  deleted: {
    label: 'Удалено',
    class: 'danger-tag'
  },
  denied: {
    label: 'Отказан',
    class: 'danger-tag'
  }
}

export const languages = [
  { _id: 'uz', title: "O'zbekcha" },
  { _id: 'en', title: 'English' },
  { _id: 'ru', title: 'Русский' },
  { _id: 'es', title: 'Español' },
  { _id: 'zh', title: '中文' },
  { _id: 'hi', title: 'हिन्दी' },
  { _id: 'ar', title: 'العربية' },
  { _id: 'fr', title: 'Français' },
  { _id: 'pt', title: 'Português' },
  { _id: 'de', title: 'Deutsch' }
]

export const notifType = [
  {
    _id: 'sms',
    title: 'СМС'
  },
  {
    _id: 'notification',
    title: 'Уведомление через моб.прил'
  }
]

export const userStatus = {
  active: {
    title: 'Активный',
    class: 'success-tag'
  },
  limited: {
    title: 'Ограничен',
    class: 'primary-tag'
  },
  'not active': {
    title: 'Не активирован',
    class: 'warning-tag'
  },
  deleted: {
    title: 'Удален/Заблокирован',
    class: 'danger-tag'
  }
}

export const dateStatus = [
  {
    _id: 'open',
    title: 'Открытый'
  },
  {
    _id: 'close',
    title: 'Закрытый'
  }
]

// export const addGuests = () => {
//   let hours = [...Array(6)].map((a, v) => {
//     return {
//       _id: (v + 1) * 3,
//       title: t('11.deadline_hours_select', { hour: (v + 1) * 3 })
//     }
//   })
//   let days = [...Array(4)].map((a, v) => {
//     return {
//       _id: v + 2,
//       title: t('11.deadline_days_select', { day: v + 2 })
//     }
//   })
//   console.log(hours)
//   return [
//     {
//       _id: 1,
//       title: t('11.deadline_hour_select')
//     },
//     ...hours,
//     {
//       _id: 24,
//       title: t('11.deadline_day_select')
//     },
//     ...days
//   ]
// }
