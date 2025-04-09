<template>
  <headPart />
  <section class="overflow-auto flex p-4 gap-4 flex-1">
    <EventMenu v-model="menuIndex" />
    <div class="flex-1 overflow-auto rounded-xl bg-white p-4">
      <component :is="pages.at(menuIndex)" v-model="data" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MainPart from '@/components/data/dashboard/event/edit/main.vue'
import Choose_category from '@/components/data/dashboard/event/edit/choose_category.vue'
import Description from '@/components/data/dashboard/event/edit/description.vue'
import About_yourself from '@/components/data/dashboard/event/edit/about_yourself.vue'
import Location from '@/components/data/dashboard/event/edit/location.vue'
import Provide from '@/components/data/dashboard/event/edit/provide.vue'
import Bring from '@/components/data/dashboard/event/edit/bring.vue'
import Title from '@/components/data/dashboard/event/edit/title.vue'
import Visit from '@/components/data/dashboard/event/edit/visit.vue'
import Upload from '@/components/data/dashboard/event/edit/upload.vue'
import Final from '@/components/data/dashboard/event/edit/final.vue'

import { mainStore } from '@/stores/data/default'
import Result from '@/components/data/dashboard/event/edit/result.vue'
const main = mainStore()

import { eventStore } from '@/stores/data/event'
const store = eventStore()

const menuIndex = ref(3)

const pages = [
  MainPart,
  Atributes,
  Location,
  Calendar
  // Choose_category,
  // Description,
  // About_yourself,
  // Location,
  // Provide,
  // Bring,
  // Visit,
  // Title,
  // Upload,
  // Final,
  // Result
]

const data = ref({
  region: '',
  languages: [''],
  partner: false,
  fCategory: {
    category: '',
    subcategory: '',
    x2Subcategory: ''
  },
  sCategory: {
    category: '',
    subcategory: '',
    x2Subcategory: ''
  },
  description: '',
  duration: '1.5',
  attributes: [],
  locationDesc: '',

  spend: 'myself',
  uniqueEventSkill: '',

  provide: [],
  provideAttributes: [],

  guestNeed: {
    giveAnything: true,
    bring: ['']
  },

  location: {
    address: '',
    coordinates: []
  },

  title: '',
  ticketPackage: '',
  interactionOptions: {
    setAge: false,
    minimumAge: 16,
    exeptionParent: false
  },
  communicativeAmenities: [],
  activity: '',
  skill: '',
  additionalRequirements: '',
  cover: [],

  group: 2,
  includeGroup: true,
  size: {
    open: 5,
    closed: 10
  },

  eventDates: [],

  entryFeeChild: 0,
  quantity: 0,
  free: false,
  entryFee: 0,
  escort: false,

  booking: {
    addingGuests: 1,
    firstGuest: 1
  },

  cancel: 1
})

import { useRoute } from 'vue-router'
import EventMenu from '@/components/data/dashboard/event/edit/eventMenu.vue'
const route = useRoute()

const toggleLeave = ref(false)

import { categoryStore } from '@/stores/data/categories'
const category_store = categoryStore()

import { subcategoryStore } from '@/stores/data/subcategories'
const subcategory_store = subcategoryStore()

import { subcategory2xStore } from '@/stores/data/2xsubcategory'
import Atributes from '@/components/data/dashboard/event/edit/atributes.vue'
import Calendar from '@/components/data/dashboard/event/edit/calendar.vue'
const sub2x_store = subcategory2xStore()

onMounted(async () => {
  await main.getRegions({ limit: 0 })
  await category_store.getCategories({ limit: 0, language: 'ru' })
  await main.getAtributes()
  if (route.params.id) {
    data.value = await store.getEditEvent(route.params.id)

    if (data.value.fCategory.subcategory?.length > 0) {
      await subcategory_store.getSubcategories({
        limit: 0,
        category: data.value.fCategory.category,
        language: 'ru'
      })
      await sub2x_store.get2xSubcategories({
        limit: 0,
        subcategory: data.value.fCategory.subcategory,
        language: 'ru'
      })
    }
  }
})
</script>
