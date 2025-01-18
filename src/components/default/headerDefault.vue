<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6"
  >
    <button
      type="button"
      class=" text-gray-700 hidden lg:block"
      @click="usefull.setSidebarOpen(!usefull.sidebarOpen)"
    >
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- Separator -->
    <!-- <div class="h-6 w-px bg-gray-900/10" aria-hidden="true" /> -->

    <div class="flex flex-1 gap-x-2  self-stretch lg:gap-x-6">
      <div class="relative flex flex-1">
        <label for="search-field" class="sr-only"> {{ $t('header.search') }}</label>
        <MagnifyingGlassIcon
          class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
          :placeholder="$t('header.search')"
          type="search"
          name="search"
          v-model="searchText"
        />
        <Combobox
          class="absolute top-full w-full bg-white shadow rounded-br-2xl rounded-bl-2xl"
          v-if="filteredList.length > 0"
        >
          <ComboboxOptions
            static
            class="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
          >
            <li v-for="category in filteredList" :key="category.value">
              <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">
                {{ category.label }}
              </h2>
              <ul class="mt-2 text-sm text-gray-800">
                <ComboboxOption
                  v-for="item in result[category?.value]"
                  :key="item._id"
                  :value="item"
                  as="template"
                  v-slot="{ active }"
                >
                  <li :class="['px-4 py-2', active && 'bg-indigo-600 text-white']">
                    <div
                      v-if="item.lname && item.name"
                      class="flex justify-between cursor-pointer"
                      @click="routeTo(category.route, item._id)"
                    >
                      <div>
                        {{ item.lname }}
                        {{ item.name }}
                      </div>
                      <div>
                        {{ item.phone }}
                      </div>
                    </div>
                    <div
                      v-if="item.title"
                      class="flex justify-between cursor-pointer"
                      @click="routeTo(category.route, item._id)"
                    >
                      <div>
                        {{ item.title }}
                        <div>
                          {{ item.description }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ComboboxOption>
              </ul>
            </li>
          </ComboboxOptions>
        </Combobox>
      </div>
      <div class="flex items-center gap-x-4 xm:gap-x-0">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 xm:p-0">
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <!-- <select v-model="language" @change="changeLanguage" class="border-0 outline-none">
          <option v-for="option in languages" :key="option._id" :value="option._id">
            {{ option.title }}
          </option>
        </select> -->
        <!-- Separator -->
        <div class="lg:hidden h-6 w-px bg-gray-900/10" aria-hidden="true" />

        <!-- Profile dropdown -->
        <Menu as="div" class="relative">
          <MenuButton class="-m-1.5 flex items-center p-1.5 mx:m-0">
            <img
              class="h-8 w-8 rounded-full bg-gray-50 xm:hidden"
              src="../../assets/images/not-user.jpg"
              alt="Profile image"
            />
            <span class="flex lg:items-center">
              <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true"
                >Admin</span
              >
              <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400 xm:hidden" aria-hidden="true" />
            </span>
          </MenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2.5 w-[150px] origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <!-- <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
              <a :href="item.href" :class="[
                active ? 'bg-gray-50' : '',
                'block px-3 py-1 text-sm leading-6 text-gray-900'
              ]">{{ item.name }}</a>
              </MenuItem> -->
              <MenuItem>
                <button @click="logout" class="block px-3 py-1 text-sm leading-6 text-gray-900">
                  {{ $t('header.logout') }}
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
// const userNavigation = [{ name: 'Your profile', href: '#' }]

import { ComboboxOptions, Combobox, ComboboxOption } from '@headlessui/vue'

import { authStore } from '@/stores/user/auth'
const auth_store = authStore()
// import { useLanguageStore } from '@/stores/usefull/lang'
// const lang_store = useLanguageStore()

// const language = ref(localStorage.getItem('language') || 'ru')
// const languages = [
//   {
//     title: 'Uzbek',
//     _id: 'uz'
//   },
//   {
//     title: 'Russian',
//     _id: 'ru'
//   },
//   {
//     title: 'English',
//     _id: 'en'
//   }
// ]

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()

// const changeLanguage = async () => {
//   lang_store.setLanguage(language.value)
//   auth_store.getLanguage({ language: language.value })
//   locale.value = language.value
// }

// watch(language, changeLanguage)

const logout = async () => {
  if (confirm(`${t('header.logout')}`)) {
    await auth_store.logout()
  }
}

import { loggerStore } from '@/stores/user/logger'
import { useRouter } from 'vue-router'
const logger_store = loggerStore()
const searchText = ref('')

const categories = [
  {
    label: 'Мероприятие',
    value: 'events',
    route: 'eventDetail'
  },
  {
    label: 'Пользователи',
    value: 'users',
    route: 'user-detail'
  },
  {
    label: 'Сотрудники',
    value: 'employees',
    route: 'worker-detail'
  },
  {
    label: 'Организаторы',
    value: 'organizers',
    route: 'show-organizer'
  }
]

/*
events: Array(5), users: Array(0), employees: Array(1), organizers: Array(0)
*/
const result = ref({})

const filteredList = computed(() => categories.filter((cat) => result.value[cat.value]?.length > 0))

const router = useRouter()
const routeTo = (route, id) => {
  router.push({ name: route, params: { id } })
  closeSearch()
}

const closeSearch = () => {
  searchText.value = ''
  result.value = {}
}

watch(
  () => searchText.value,
  (to) => {
    if (to?.length == 0) {
      closeSearch()
      return false
    }
    if (to?.length > 3) {
      searching(to)
    }
  }
)

const searching = async (t) => {
  if (t?.length < 4) return false
  result.value = await logger_store.globalSearch(t)
  console.log("result", result.value);
  
}
</script>
<style lang=""></style>
