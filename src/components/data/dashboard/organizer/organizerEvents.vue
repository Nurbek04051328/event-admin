<template>
  <div class="flex-1 flex flex-col overflow-auto h-[100%]">
    <div class="text-base font-medium border-b border-gray-200 mb-3 pb-2 flex justify-between items-center px-5">
      <span>Список мероприятие</span>
      <span class="text-sm">Количество: {{ list.count }}</span>
    </div>
    <div class="flex-1 flex flex-col overflow-auto h-[100%]">
      <div v-if="list?.events?.length > 0" class="space-y-2 flex-1">
        <div
          v-for="item in list?.events"
          :key="item._id"
          class="group text-sm flex-start relative grid grid-cols-6 rounded-lg border border-gray-200 bg-white md-max:flex md-max:flex-col "
        >
          <div 
            class="h-full flex float-start items-center sm:aspect-none group-hover:opacity-75 xl:col-span-2 md-max:bg-white md-max:flex md-max:justify-center md-max:pt-1">
            <router-link :to="{ name: 'eventDetail', params: { id: item._id } }">
              <img
                :src="`${url}/${item?.cover?.at(0)}`"
                class="object-cover object-center w-full ml-2 aspect-square md-max:w-auto md-max:h-[150px] rounded-lg"
              />
            </router-link>
          </div>
          <div class="col-span-5 flex flex-col gap-2 p-4 xl:col-span-4">
            <div class="flex">
              <h3 class="text-sm flex-1 text-gray-900 font-bold xm-max:text-[13px]">
                <router-link :to="{ name: 'eventDetail', params: { id: item._id } }">
                  {{ item.title }}
                </router-link>
              </h3>
              <div class="space-x-2">
                <a
                  :href="`https://www.google.com/maps?q=${item.location?.latitude},${
                    item.location?.longitude
                  }`"
                  target="_blank"
                  class="text-xs underline text-blue-400"
                  >В карте</a
                >
                <span class="warning-tag xm-max:text-[11px]" v-if="item.status == 0">Не проверено</span>
                <span class="success-tag xm-max:text-[11px]" v-if="item.status == 1">Одобрено</span>
                <span class="danger-tag xm-max:text-[11px]" v-if="item.status == 2">Отказано</span>
              </div>
            </div>
            <div class="flex flex-wrap items-end w-full gap-4 2xl:grid 2xl:grid-cols-12">
              <div class="2xl:col-span-4 md-max:col-span-6">
                <div class="text-xs ">Категория</div>
                <div class="space-x-2 font-bold text-sm xm-max:text-[13px]">
                  <span v-for="cat of item.categories" :key="cat._id">
                    {{ cat.title }}
                  </span>
                </div>
              </div>
              <div class="2xl:col-span-4 md-max:col-span-6">
                <div class="text-xs">Подкатегория</div>
                <div class="space-x-2 font-bold text-sm xm-max:text-[13px]">
                  <span v-for="cat of item.subcategories" :key="cat._id">
                    {{ cat.title }}
                  </span>
                </div>
              </div>
              <div class="2xl:col-span-4 md-max:col-span-12">
                <div class="text-xs">Тип пакет</div>
                <div class="space-x-2 font-bold text-sm xm-max:text-[13px]">
                  {{ item.ticketPackage?.title }}
                  <!-- {{ item.ticketPackage?.title }} / {{ item.ticketPackage?.quantity }} /
                  {{ item.ticketPackage?.comissionRate || 0 }} % -->
                </div>
              </div>
              <div class="ml-auto 2xl:col-span-6 2xl:text-center 2xl:m-auto">
                <div class="text-xs">Стат.билетов</div>
                <div class="space-x-2 font-bold text-sm flex">
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      В обработке
                    </div>
                    <span class="warning-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketPending }}
                    </span>
                  </div>
  
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Куплен
                    </div>
                    <span class="success-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketPurchase }}
                    </span>
                  </div>
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                    Использован
                    </div>
                    <span class="primary-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketUsed }}
                    </span>
                  </div>
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Отказан
                    </div>
                    <span class="danger-tag xm-max:text-[11px]">
                      {{ item.counts?.ticketDenied }}
                    </span>
                  </div>
                  
                </div>
              </div>
              <div class="2xl:col-span-6 2xl:text-center 2xl:m-auto">
                <div class="text-xs">Стат. возвратов</div>
                <div class="space-x-2 font-bold text-sm flex">
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Средства успешно возвращены
                    </div>
                    <span class="primary-tag xm-max:text-[11px]">
                      {{ item.counts?.refoundTrue }}
                    </span>
                  </div>
  
                  <div class="group/text relative">
                    <div
                      class="invisible group-hover/text:visible absolute bottom-full whitespace-nowrap text-right right-0 bg-gray-100 p-1 rounded-sm text-xs"
                    >
                      Средства в обработке
                    </div>
                    <span class="warning-tag xm-max:text-[11px]">
                      {{ item.counts?.refoundFalse }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <p class="text-sm text-gray-500">{{ product.description }}</p> -->
            <div class="flex gap-4 mt-auto xl:grid xl:grid-cols-6">
              <div v-if="item.entryFee > 0" class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-3">
                <BanknotesIcon class="size-4" />
                {{ item.entryFee?.toLocaleString() || 'Bepul' }} сум
              </div>
              <div v-else class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-3 xm-max:text-[13px]">
                <BanknotesIcon class="size-4" />
                Бесплатно
              </div>
              
              <div v-if="item.when" class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-2 md-max:col-span-4 xm-max:text-[13px]">
                <CalendarDaysIcon class="size-4" />
                {{ convertDateShort(item.when) }}
              </div>
  
              <div class="flex gap-2 ml-auto xl:col-span-4">
                <organizerSettings :item="item" />
              </div>
            </div>
            <div
                v-if="item.location?.address"
                class="flex items-center gap-2 font-medium text-gray-900 xl:col-span-3 xl:text-[12px]"
              >
                <MapIcon class="size-4" />
                {{ item.location?.address }}
              </div>
          </div>
        </div>
      </div>
      <div v-else class="space-y-2 flex-1 ">
        <div class="text-center mt-14"> 
          Пока нет мероприятие
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { BanknotesIcon, CalendarDaysIcon, MapIcon } from '@heroicons/vue/20/solid'
defineProps(['list'])
const url = import.meta.env.VITE_URL
import organizerSettings from './organizerSettings.vue'
import { convertDateShort } from '@/helpers/func'
</script>
<style lang=""></style>



<!-- const event = new Schema({
  // Город, где будет проводиться мероприятие
  city: String,

  // Языки, на которых будет проводиться мероприятие
  languages: {
    type: [String],
    required: true, // Обязательное поле, так как мероприятие должно проходить на каком-то языке
  },

  // Флаг, указывающий, организует ли пользователь мероприятие от имени организации
  organizationHost: {
    type: Boolean,
    default: false, // По умолчанию мероприятие не связано с организацией
  },

  fCategory: {
    category: {
      type: Schema.Types.ObjectId,
      ref: "event_category"
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "event_subcategory"
    },
    x2Subcategory: {
      type: Schema.Types.ObjectId,
      ref: "two_subcategory"
    },
    x3Subcategory: {
      type: Schema.Types.ObjectId,
      ref: "two_subcategory",
      default: null,
    },
  },

  sCategory: {
    category: {
      type: Schema.Types.ObjectId,
      ref: "event_category"
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "event_subcategory"
    },
    x2Subcategory: {
      type: Schema.Types.ObjectId,
      ref: "two_subcategory"
    },
    x3Subcategory: {
      type: Schema.Types.ObjectId,
      ref: "two_subcategory",
      default: null,
    },
  },

  // Время начала мероприятия, обязательное поле для заполнения
  duration: String,

  // Атрибуты мероприятия, массив строковых значений, обязательное поле для заполнения
  attributes: [{
    category: {
      type: Schema.Types.ObjectId,
      ref: "attribute_category"
    },
    values: [{
      type: Schema.Types.ObjectId,
      ref: "attribute"
    }]
  }],

  // Информация о локации
  locationDesc: String,

  // Кто проводит мероприятие
  spend: {
    type: String,
    enum: ["myself", "team"],
    default: "myself"
  },

  // Какие умения будут использоваться на мероприятии
  uniqueEventSkill: String,

  // Место проведения мероприятия, объект, обязательное для указания локации
  location: {
    address: String,
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },

  // Что предоставляет организатор мероприятия
  provide: [{
    // Имеющиеся и используемые транспортные средства в Мероприятии
    eventTransport: {
      type: String,
      enum: ["driving", "boat", "motorcycle", "flight", "none"],
      default: "none"
    },

    // Кто будет управлять выбранным транспортным средством
    whoWillDrive: [{
      type: [String],
      enum: ["myself", "another", "forguests", "public"],
      default: []
    }],

    boatType: {
      type: String,
      enum: ["motor", "sail", "canoe"],
    },
    boatSize: {
      type: String,
      enum: ["UpTo10", "10-22"],
    }
  }],

  provideAttributes: [{
    category: {
      type: Schema.Types.ObjectId,
      ref: "attribute_category"
    },
    values: [{
      type: Schema.Types.ObjectId,
      ref: "attribute"
    }]
  }],

  guestNeed: {
    giveAnything: {
      type: Boolean,
      default: false
    },
    bring: [],
  },

  // Настройки взаимодействия с мероприятием, разрешения на обмен и сохранение
  interactionOptions: {
    // Возрастное ограничение, минимальный возрастр
    minimumAge: Number,

    // Исключения для родителей
    exeptionParent: {
      type: Boolean,
      default: false
    },

    // Коммуникативные средства для людей с ограниченной возможнностью
    communicativeAmenities: [{
      // Нужды для инвалидов
      specialNeeds: {
        type: String,
        enum: ["specialNeeds", "reducedMobility", "sensoryNeeds"]
      },
      // Виды коммуникации с инвалидами
      communicative: [{
        amenities: {
          type: String,
          enum: ["signLanguage", "blind", "alternative", "deaf", "trainer"],
        },
        comment: String
      }]
    }],

    // На какой уровнь активности должен расчитывать гость.
    activity: {
      type: String,
      enum: ["low", "medium", "high", "extreme"],
      default: null
    },
    // Необходимый уровнь скиллов
    skill: {
      type: String,
      enum: ["low", "medium", "high", "extreme"],
      default: null
    },

    // Дополнительные требования
    additionalRequirements: String,

    // Разрешение делиться мероприятием, логическое поле, по умолчанию разрешено
    allowShare: {
      type: Boolean,
      default: true,
    },
    // Разрешение сохранять мероприятие, логическое поле, по умолчанию разрешено
    allowSave: {
      type: Boolean,
      default: true,
    },
  },

  // Название мероприятия, строковое поле с минимальной и максимальной длиной, обязательное для заполнения
  title: String,

  // Обложка мероприятия
  cover: [],


  // Будет ли мероприятие включать группу
  includeGroup: {
    type: Boolean,
    default: false
  },

  // Максимальное число участников в группе если includeGroup = true
  size: {
    // Открытая, максимум 10
    open: Number,
    // Закрытаыя, максимум 30
    closed: Number
  },

  // Скидка для группы
  discount: [{
    minSize: Number,
    maxSize: Number,
    discount: Number
  }],

  eventDates: [{
    date: Date,
    status: {
      type: String,
      enum: ["open", "closed", "move"],
      default: "open"
    }
  }],

  // Настройки брони
  booking: {
    // Крайний срок для добавления гостей
    addingGuests: String,

    // Крайний срок для первого гостя
    firstGuest: String,
  },

 // Количество продающихся билетов, если includeGroup = false
  quantity: Number,

  // Пакет для билетов
  ticketPackage: {
    type: Schema.Types.ObjectId,
    ref: 'ticket_package'
  },

  // Стоимость входа, числовое поле, по умолчанию — 0
  entryFee: {
    type: Number,
    default: 0
  },
  // Стоимость входа для детей, числовое поле, по умолчанию — 0
  entryFeeChild: {
    type: Number,
    default: 0
  },

  // Условия отмены и возврата
  cancellationPolicy: {
    type: String,
    enum: ["7d", "24h"],
    default: "7d"
  },

  // Описание мероприятия, строковое поле с ограничением длины, обязательное для описания содержания мероприятия
  description: String,  

  // Ссылка на организатора мероприятия, обязательное поле с типом ObjectId, связанное с моделью "User"
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },

  // Видимость мероприятия, строковое поле, определяющее, является ли мероприятие публичным или частным, по умолчанию "public"
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },

  privateSettings: {
    // Разрешение на обмен фотографиями с мероприятия, логическое поле, по умолчанию запрещено
    allowPhotoSharing: {
      type: Boolean,
      default: false,
    },
    // Видимость списка участников, логическое поле, по умолчанию запрещено
    showParticipants: {
      type: Boolean,
      default: false,
    },
    // Видимость местоположения мероприятия, логическое поле, по умолчанию запрещено
    locationVisibility: {
      type: Boolean,
      default: false,
    },
  },

  // Статус мероприятия, строковое поле, определяющее текущее состояние мероприятия, по умолчанию "upcoming"
  eventStatus: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "canceled"],
    default: "upcoming"
    // upcoming - предстоящий
    // ongoing - текущий
    // completed - завершенный
    // canceled - отмененные
  },

  status: {
    type: String,
    enum: ["active", "not active", "pending", "denied", "deleted", "archive"],
    default: "pending"
  },
}, { timestamps: true }); -->
