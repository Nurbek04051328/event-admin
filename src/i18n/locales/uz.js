// import { detailMenu } from "@/helpers/detailMenu";

const uz = {
  menu: {
    dashboard: 'Statistika',
    workers: 'Hodimlar',
    allUsers: 'Foydalanuvchilar',
    users: 'Foydalanuvchilar',
    organizers: 'Organizatorlar',
    event: 'Tadbirlar',
    ticketpaskage: 'Tariflar',
    ticket: 'Biletlar',
    activationkeys: 'Faol kalitlar',
    settings: 'Sozlamalar',
    eventDetail: 'Tadbir Tafsilotlari'
  },
  settingMenu: {
    language: 'Tillar',
    category: 'Kategoriyalar',
    subcategory: 'Subkategoriyalar',
    social: 'Ijtimoiy tarmoqlar'
  },
  home: {
    title: 'Umumiy hisobot',
    category: 'Kategoriyalar',
    subcategory: 'Subkategoriyalar',
    language: 'Tillar',
    ticketpaskage: 'Tariflar'
  },
  header: {
    search: 'Qidiriuv',
    logout: 'Tizimdan chiqish',
    confirm: 'Tizimdan chiqmoqchimisiz?'
  },
  story: {
    update: 'Yangilandi',
    add: 'Yangi ma`lumot qo`shildi',
    delete: 'O`chirildi'
  },
  language: {
    table: {
      name: 'Til nomi',
      slug: "Qisqa ko'rinishi",
      select: 'Odatiy tanlov',
      data: 'Sana'
    },
    dialog: {
      title: 'Yangi til',
      edit: 'Tilni tahrirlash',
      name: 'Til nomi',
      slug: 'Til kodi',
      placeholder: 'Misol: uz, ru, en',
      close: 'Bekor qilish',
      save: 'Saqlash',
      deletetitle: "Tilni o'chirmoqchimisiz?",
      btnTitle: "Ha, o'chirilsin",
      deletetitleText: "Ma'lumot qayta tiklanmas bo'lib o'chiriladi"
    }
  },
  category: {
    table: {
      img: 'Rasmlar',
      name: 'Kategoriya nomi',
      language: 'Tarjimalar',
      data: 'Sana'
    },
    dialog: {
      title: 'Yangi kategoriya',
      edit: 'Kategoriyani tahrirlash',
      name: 'Kategoriya nomi',
      slug: 'Kategoriya kodi (slug)',
      img: 'Kategoriya rasmi',
      placeholder: 'Kategoriya rasmini yuklang',
      close: 'Bekor qilish',
      save: 'Saqlash',
      deletetitle: "Kategoryiyani o'chirmoqchimisiz?",
      btnTitle: "Ha, o'chirilsin",
      deletetitleText: "Ma'lumot qayta tiklanmas bo'lib o'chiriladi"
    }
  },
  social: {
    table: {
      icon: 'Belgisi rasmi',
      name: 'Nomi',
      data: 'Sana'
    },
    dialog: {
      title: 'Yangi ijtimoy tarmoq',
      edit: 'Ijtimoiy tarmoqni tahrirlash',
      name: 'Ijtimoiy tarmoq nomi',
      icon: 'Ijtimoiy tarmoq belgisi rasmi ',
      placeholder: 'Ijtimoiy tarmoq belgisi rasmini yuklang',
      close: 'Bekor qilish',
      save: 'Saqlash',
      deletetitle: "Ijtimoiy tarmoqni o'chirmoqchimisiz?",
      btnTitle: "Ha, o'chirilsin",
      deletetitleText: "Ma'lumot qayta tiklanmas bo'lib o'chiriladi"
    }
  },
  subcategory: {
    table: {
      img: 'Rasmlar',
      name: 'Subcategoriya nomi',
      category: 'Kategoriyasi',
      notadd: "qo'shilmagan",
      language: 'Tarjimalar',
      data: 'Sana'
    },
    dialog: {
      title: 'Yangi subcategoriya',
      edit: 'Subcategoriyani tahrirlash',
      name: 'Subkategoriya nomi',
      slug: 'Subkategoriya kodi (slug)',
      category: 'Kategoriya tanlang',
      notcategory: 'Kategoriya tanlanmagan',
      img: 'Subkategoriya rasmi',
      placeholder: 'Subkategoriya rasmini yuklang',
      close: 'Bekor qilish',
      save: 'Saqlash',
      deletetitle: "Subcategoriyani o'chirmoqchimisiz?",
      btnTitle: "Ha, o'chirilsin",
      deletetitleText: "Ma'lumot qayta tiklanmas bo'lib o'chiriladi"
    }
  },
  worker: {
    table: {
      name: 'F.I.O',
      phone: 'Telefon',
      login: 'Login',
      role: 'Roli',
      data: 'Vaqt',
      lastVisit: 'Oxirgi kirish',
      checkedOrganizers: 'Tekshirilgan Organizer',
      checkedEvent: 'Tekshirilgan Hodisalar',
      messages: 'Habarlar soni',
    },
    dialog: {
      title: "Yangi ishchi qo'shish",
      edit: "Ishchi ma'lumotlarini tahrirlash",
      name: 'Ishchi ismi',
      lname: 'Ishchi familiya',
      category: 'Kategoriya tanlang',
      notcategory: 'Kategoriya tanlanmagan',
      subcategory: 'Subcategoriya tanlang',
      phone: 'Ishchini telefon raqami',
      role: 'Ishchini rolini tanglang',
      login: 'Ishchini logini',
      password: 'Ishchini paroli',
      close: 'Bekor qilish',
      save: 'Saqlash',
      deletetitle: "Xodimni o'chirmoqchimisiz?",
      btnTitle: "Ha, o'chirilsin",
      deletetitleText: "Ma'lumot qayta tiklanmas bo'lib o'chiriladi",
      password_min_length: "Parol uzunligi kamida 5 belgidan iborat bo'lishi kerak"
    }
  },
  ticketPackage: {
    table: {
      title: 'Nomi',
      text: 'Matni',
      quantity: 'Soni',
      commissionRate: 'Foiz',
      language: 'Tarjimalar',
      data: 'Vaqt'
    },
    dialog: {
      title: "Yangi Tarif qo'shish",
      edit: "Tarif ma'lumotlarini tahrirlash",
      name: 'Tarif nomi',
      text: 'Tarif matni',
      quantity: 'Biletlar soni',
      commissionRate: 'Foiz',
      close: 'Bekor qilish',
      save: 'Saqlash',
      deletetitle: "Tarifni o'chirmoqchimisiz?",
      btnTitle: "Ha, o'chirilsin",
      deletetitleText: "Ma'lumot qayta tiklanmas bo'lib o'chiriladi"
    }
  },
  event: {
    table: {
      title: 'Nomi',
      text: 'Matni',
      duration: 'Davomiyligi',
      date: 'Boshlanish / Tugash',
      category: 'Kategoriyasi',
      subcategory: 'Subkategoriyasi',
      time: 'Boshlanish vaqti',
      organizator: 'Organizator',
      CreatedAt: "Qo'shilgan vaqt",
      status: 'Holati',
      statusPanding: 'Tekshirilmagan',
      statusAccess: 'Qabul qilindi',
      statusRefused: 'Rad etildi',
      check: 'Tekshiruv',
      canceled: "Rad etgan",
      completed: "Tugallangan",
      upcoming: "Yaqin orada",
      ongoing: "Hozirgi",
    },
    detailPage: {
      sum: "so'm",
      access: 'Qabul qilish',
      danger: 'Bekor qilish',
      comment: 'Kommentariya'
    },
    accessDialog: {
      accesstitle: 'Siz haqiqatdan ham qabul qilasizmi?',
      btnTitle: 'Ha',
      close: 'Bekor qilish'
    }
  }
}

export default uz
