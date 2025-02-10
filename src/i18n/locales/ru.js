const ru = {
  menu: {
    dashboard: 'Статистика',
    workers: 'Сотрудники',
    allUsers: 'Пользователи',
    users: 'Пользователи',
    organizers: 'Организаторы',
    event: 'Мероприятия',
    ticketpaskage: 'Тарифы',
    ticket: 'Билети',
    activationkeys: 'Ключ активации',
    settings: 'Настройки',
    eventDetail: 'Детали мероприятия',
    messages: 'Чат',
    logs: 'Журналы'
  },
  settingMenu: {
    language: 'Языки',
    category: 'Категории',
    subcategory: 'Подкатегории',
    atributCategory: "Атрибуты",
    social: 'Социальные сети',
    page: 'Страница',
    tax: 'Налог',
    refound: 'Возврать билеть',
  },
  home: {
    title: 'Общий отчет',
    category: 'Категории',
    subcategory: 'Подкатегории',
    language: 'Языки',
    ticketpaskage: 'Тарифы'
  },
  header: {
    search: 'Поиск',
    logout: 'Выйти из системы',
    confirm: 'Вы уверены, что хотите выйти из системы?'
  },
  story: {
    update: 'Обновлено',
    add: 'Добавлена новая информация',
    delete: 'Удалено'
  },
  language: {
    table: {
      name: 'Название',
      slug: 'Краткое',
      select: 'Выбор по умолчанию',
      data: 'Дата'
    },
    dialog: {
      title: 'Новый язык',
      edit: 'Редактировать язык',
      name: 'Название языка',
      slug: 'Код языка',
      placeholder: 'Пример: uz, ru, en',
      close: 'Отмена',
      save: 'Сохранить',
      deletetitle: 'Вы уверены, что хотите удалить язык?',
      btnTitle: 'Да, удалить',
      deletetitleText: 'Данные будут удалены без возможности восстановления'
    }
  },
  category: {
    table: {
      img: 'Изображения',
      name: 'Название',
      language: 'Переводы',
      data: 'Дата'
    },
    dialog: {
      title: 'Новая категория',
      edit: 'Редактировать категорию',
      name: 'Название категории',
      slug: 'Код категории (slug)',
      img: 'Изображение категории',
      placeholder: 'Загрузить изображение категории',
      close: 'Отмена',
      save: 'Сохранить',
      deletetitle: 'Вы уверены, что хотите удалить категорию?',
      btnTitle: 'Да, удалить',
      deletetitleText: 'Данные будут удалены без возможности восстановления.'
    }
  },
  social: {
    table: {
      icon: 'Иконки',
      name: 'Название',
      data: 'Дата'
    },
    dialog: {
      title: 'Добавить новую социальную сеть',
      edit: 'Редактировать социальную сеть',
      name: 'Название социальной сети',
      icon: 'Изображение иконки социальной сети',
      placeholder: 'Загрузите изображение иконки для социальной сети',
      close: 'Отменить',
      save: 'Сохранить',
      deletetitle: 'Вы уверены, что хотите удалить эту социальную сеть?',
      btnTitle: 'Да, удалить',
      deletetitleText: 'Информация будет удалена навсегда и не может быть восстановлена'
    }
  },
  subcategory: {
    table: {
      img: 'Изображения',
      name: 'Название подкатегории',
      category: 'Категория',
      notadd: 'Не добавлено',
      language: 'Переводы',
      data: 'Дата'
    },
    dialog: {
      title: 'Новая подкатегория',
      edit: 'Редактировать подкатегорию',
      name: 'Название подкатегории',
      slug: 'Код подкатегории (slug)',
      category: 'Выберите категорию',
      notcategory: 'Категория не выбрана',
      img: 'Изображение подкатегории',
      placeholder: 'Загрузить изображение подкатегории',
      close: 'Отмена',
      save: 'Сохранить',
      deletetitle: 'Вы уверены, что хотите удалить подкатегории?',
      btnTitle: 'Да, удалить',
      deletetitleText: 'Данные будут удалены без возможности восстановления'
    }
  },
  worker: {
    table: {
      name: 'Ф.И.О',
      phone: 'Телефон',
      login: 'Логин',
      role: 'Роль',
      data: 'Время',
      lastVisit: 'Последный вход',
      checkedOrganizers: 'Кол-во Организеер',
      checkedEvent: 'Кол-во Мероприятие',
      messages: 'Кол-во Собщение',
    },
    dialog: {
      title: 'Добавить нового работника',
      edit: 'Редактировать данные работника',
      name: 'Имя',
      lname: 'Фамилия',
      category: 'Выберите категорию',
      subcategory: 'Выберите подкатегорию',
      phone: 'Номер телефона',
      role: 'Выберите роль',
      login: 'Логин',
      password: 'Пароль',
      close: 'Отмена',
      save: 'Сохранить',
      deletetitle: 'Вы уверены, что хотите удалить этот сотрудник?',
      btnTitle: 'Да, удалить',
      deletetitleText: 'Данные будут безвозвратно удалены',
      password_min_length: 'Длина пароля должна быть не менее 5 символов'
    }
  },
  ticketPackage: {
    table: {
      title: 'Название',
      text: 'Текст',
      quantity: 'Количество',
      language: 'Переводы',
      commissionRate: 'Процент',
      data: 'Время'
    },
    dialog: {
      title: 'Добавить новый тариф',
      edit: 'Редактировать информацию о тарифе',
      name: 'Название тарифа',
      text: 'Текст тарифа',
      quantity: 'Количество билетов',
      commissionRate: 'Процент',
      close: 'Отмена',
      save: 'Сохранить',
      deletetitle: 'Вы уверены, что хотите удалить?',
      btnTitle: 'Да, удалить',
      deletetitleText: 'Информация будет удалена без возможности восстановления'
    }
  },
  event: {
    table: {
      title: 'Название',
      text: 'Текст',
      duration: 'Длительность',
      date: 'Начало / Конец',
      category: 'Категория',
      subcategory: 'Подкатегория',
      time: 'Время начало',
      organizator: 'Организатор',
      CreatedAt: 'Время добавления',
      status: 'Статус',
      statusPanding: 'Не проверено',
      statusAccess: 'Принято',
      statusRefused: 'Отклонено',
      check: 'Проверка',
      canceled: 'Отмененный',
      completed: 'Завершенный',
      upcoming: 'Предстоящий',
      ongoing: 'Текущий'
    },
    detailPage: {
      sum: 'сум',
      access: 'Принять',
      danger: 'Отменить',
      comment: 'Комментарий'
    },
    accessDialog: {
      accesstitle: 'Вы действительно принимаете?',
      btnTitle: 'Да',
      close: 'Отмена'
    }
  }
}

export default ru
