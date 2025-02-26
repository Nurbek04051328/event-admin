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
    label: 'Пополнение',
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
    label: 'Депозит',
    class: 'text-[#05CD99]'
  },
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
