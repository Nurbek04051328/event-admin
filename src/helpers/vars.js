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
