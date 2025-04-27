// Worker roles
export const roles = [
  {
    _id: 'moderator',
    title: 'Модератор'
  },
  {
    _id: 'content_manager',
    title: 'Контент менеджер'
  },
  {
    _id: 'buxgalter',
    title: 'Бухгалтер'
  }
]








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
    _id: 'closed',
    title: 'Закрытый'
  }
]

export const settingsTitles = {
  title: 'Кто может посетить ваше мероприятие?',
  desc: 'Не забудьте: гость, который бронирует мероприятие, может также забронировать места для других гостей. Укажите здесь строгие ограничения по возрасту, уровню подготовки или квалификации, если они есть.',

  set_age: 'Установить возрастное ограничение',
  set_age_text:
    'Установите возрастное ограничение для гостей. Несовершеннолетние гости могут присутствовать с опекуном.',

  minimum_age: 'Минимальный возраст',
  minimum_age_desc:
    'Установите возрастное ограничение для гостей. Несовершеннолетние гости могут присутствовать на мероприятии только в сопровождении законного опекуна.',
  parents: 'Исключение для родителей',
  parents_child: 'Родители могут прийти с детьми младше 2 лет',

  special: 'Подходит ли мероприятие для людей с особыми потребностями? (опционально)',
  special_text:
    'Перед публикацией все изменения проверяются. Узнайте больше о элементах доступной среды. Выбор элемента открывает дополнительные опции',

  commun: 'Средства коммуникации для людей с особыми потребностями',
  commun_title: 'Особенности коммуникации',
  commun_desc: 'Подумайте, как вы общаетесь с гостями на вашем мероприятии.',

  commun_detailed_title: 'Детализированная аудио- или вербальная информация',
  commun_detailed_text:
    'Дайте гостям больше деталей о том, какие специальные методы общения вы практикуете или предоставите, будь то подробные устные описания, аудиокомментарии или что-то другое.',

  commun_sign_title: 'Варианты языка жестов',
  commun_sign_text:
    'Укажите подробности о типе языка жестов (американский, британский и т.д.) и уровне владения.',

  commun_alter_title: 'Информация в альтернативных форматах',
  commun_alter_text:
    'Поделитесь подробностями о том, какие форматы будут доступны, а также где или как гости могут их найти.',

  commun_deaf_title: 'Осведомленность о глухоте',
  commun_deaf_text:
    'Предоставьте детали о том, как вы будете общаться, например, говорить четко, минимизировать фоновый шум или обеспечить хорошее освещение для чтения по губам.',

  commun_des_title: 'Назначенный зрячий гид',
  commun_des_text:
    'Поделитесь информацией о гиде, например, об уровне его опыта и нужно ли запрашивать его заранее.',

  mobile: 'Удобства для людей с ограниченной подвижностью',
  mobile_title: 'Особенности мобильности',
  mobile_desc: 'Подумайте о месте проведения вашего мероприятия',

  mobile_access_title: 'Доступная ванная комната',
  mobile_access_text:
    'Укажите детали о расположении ванной комнаты, в какой момент мероприятия она доступна гостям и какие дополнительные функции доступности есть, например, поручни или шнуры экстренного вызова.',

  mobile_park_title: 'Доступное парковочное место',
  mobile_park_text:
    'Сообщите гостям, насколько широкое пространство или есть ли обозначенная доступная парковка, обычно обозначенная значком инвалидной коляски. Укажите, где находится парковочное место относительно мероприятия.',

  mobile_ground_title: 'Преимущественно ровная или выровненная поверхность',
  mobile_ground_text:
    'Предоставьте детали о рельефе и уклоне поверхностей, где проходит мероприятие.',

  mobile_step_title: 'Нет лестниц или ступеней',
  mobile_step_text:
    'Укажите детали о месте или маршруте вашего мероприятия и есть ли модификации или оборудование, которые могут сделать маршрут без ступеней, например, пандусы или лифты.',

  mobile_wider_title: 'Вход шире 32 дюймов (82 сантиметра)',
  mobile_wider_text:
    'Укажите размеры или другие детали, подтверждающие, что дверные проемы имеют ширину не менее 32 дюймов (82 см), или что доступ к мероприятию не требует прохождения через более узкие проемы.',

  mobile_adap_title: 'Адаптивное оборудование',
  mobile_adap_text:
    'Сообщите гостям о типе доступного оборудования, например, спортивная инвалидная коляска или подъемник, и как это оборудование поможет гостям с потребностями в мобильности.',

  mobile_ref_title: 'Холодильник',
  mobile_ref_text:
    'Сообщите гостям, где находится холодильник и когда они смогут им воспользоваться.',

  sensor: 'Удобства для людей с сенсорными потребностями',
  sensor_title: 'Сенсорные особенности',
  sensor_desc:
    'Это атрибуты вашего мероприятия, которые могут повлиять или перегрузить чувства гостей.',

  sensor_no_title: 'Нет экстремальных сенсорных стимулов',
  sensor_no_text:
    'Расскажите гостям об освещении, шуме, запахах и о том, насколько многолюдным может быть место.',

  sensor_break_title: 'Запланированные перерывы',
  sensor_break_text:
    'Поделитесь деталями о перерывах, например, где они будут проходить, сколько они продлятся и будет ли доступно место для сидения.',

  sensor_wait_title: 'Минимальное время ожидания / очереди',
  sensor_wait_text:
    'Сообщите гостям, сколько им придется ждать во время мероприятия. Если в некоторых случаях ожидание меньше (или больше), чем в других, подумайте о добавлении этой информации здесь.',

  sensor_quite_title: 'Доступно тихое место для отдыха',
  sensor_quite_text:
    'Предоставьте детали об этом месте, включая его расположение, окружение и когда гости смогут его использовать.',

  activity_title: 'Какой уровень активности ожидать гостям?',
  activity_desc: 'Оцените уровень активности гостей на мероприятии',
  easy: 'Легкий',
  moderate: 'Умеренный',
  high: 'Высокий',
  extreme: 'Экстремальный',

  skill_title: 'Необходимый уровень навыков',
  skill_desc: 'Какой уровень подготовки должны иметь участники?',
  initial: 'Начальный',
  medium: 'Средний',
  advanced: 'Продвинутый',
  expert: 'Эксперт',

  add_title: 'Дополнительные требования (опционально)',
  add_placeholder: 'Расскажите гостям, что они должны уметь делать на мероприятии ...'
}

export const postStatus = [
  {
    _id: 'active',
    title: 'Активный',
    class: 'bg-green-500'
  },
  {
    _id: 'pending',
    title: 'На расмотрение',
    class: 'bg-amber-500'
  },
  {
    _id: 'denied',
    title: 'Удалено',
    class: 'bg-red-500'
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
