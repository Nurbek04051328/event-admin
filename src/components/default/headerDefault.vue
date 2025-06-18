<template>
  <div
    class="sticky top-0 z-40 flex h-[100px] shrink-0 items-center px-4 sm:gap-x-6"
  >
    <button
      type="button"
      class=" text-gray-700 hidden lg:block mr-2"
      @click="usefull.setSidebarOpen(!usefull.sidebarOpen)"
    >
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>

    <div class="flex items-center flex-1 rounded-2xl gap-3 h-[60px] md:h-[50px]">
      <div class="relative flex flex-1  rounded-2xl h-full bg-white px-[24px] py-[16px]  md:px-[15px] md:py-[12px]">
        <div class="w-full">
          <MagnifyingGlassIcon
            class="pointer-events-none text-[#9E55EC] absolute inset-y-0  h-full w-5"
            aria-hidden="true"
          />
          <input
            id="search-field"
            class="block bg-inherit h-full w-full border-0 py-0 pl-8 pr-0 text-[#9E55EC] placeholder:text-[#B6A3D0] focus:ring-0 sm:text-sm focus:outline-none"
            :placeholder="$t('header.search')"
            type="search"
            name="search"
            v-model="searchText"
          />
        </div>
        <Combobox
          class="absolute top-full w-[97%] bg-white shadow rounded-br-2xl rounded-bl-2xl"
          v-if="filteredList.length > 0"
        >
          <ComboboxOptions
            static
            class="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
          >
            <li v-for="category in filteredList" :key="category.value">
              <h2 class=" px-4 py-2.5 text-xs font-semibold text-gray-900">
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
                  <li :class="['px-4 py-2', active && 'bg-[#9E55EC] text-white']">
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

      <div class="flex items-center gap-x-3 h-full">
        <!-- <div 
          class="flex items-center justify-center h-full bg-white rounded-2xl cursor-pointer hover:bg-[#F3EBFC] lg:hidden"
          >
          <router-link
            :to="{ name: 'type-notification' }"
            class="p-[14px] w-full h-full"
            :class="
              route.name == 'type-notification' ? 'bg-[#F3EBFC] rounded-2xl' : 
              route.name == 'package-notification' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'bought-notification' ? 'bg-[#F3EBFC] rounded-2xl' :
              ''
            "
          >
            <BellIcon class="h-7 w-7 shrink-0 text-[#9E55EC]" aria-hidden="true" />
          </router-link>
        </div> -->
        <div class="flex items-center justify-center h-full bg-white rounded-2xl cursor-pointer hover:bg-[#F3EBFC] lg:hidden">
          <router-link
            :to="{ name: 'activationkeys' }"
            class="p-[14px] w-full h-full"
            :class="
              route.name == 'activationkeys' ? 'bg-[#F3EBFC] rounded-2xl' : ''
            "
          >
            <KeyIcon class="h-7 w-7 shrink-0 text-[#9E55EC]" aria-hidden="true" />
          </router-link>
        </div>
        <div class="flex items-center justify-center h-full bg-white rounded-2xl cursor-pointer hover:bg-[#F3EBFC] lg:hidden">
          <router-link
            :to="{ name: 'logs' }"
            class="p-[14px] w-full h-full"
            :class="
              route.name == 'logs' ? 'bg-[#F3EBFC] rounded-2xl' : ''
            "
          >
            <BookmarkSquareIcon class="h-7 w-7 shrink-0 text-[#9E55EC]" aria-hidden="true" />
          </router-link>
        </div>
        <div class="flex items-center justify-center h-full bg-white rounded-2xl cursor-pointer hover:bg-[#F3EBFC] lg:hidden">
          <router-link
            :to="{ name: 'messages' }"
            class="p-[14px] w-full h-full"
            :class="
              route.name == 'messages' ? 'bg-[#F3EBFC] rounded-2xl' : 
              route.name == 'showChat' ? 'bg-[#F3EBFC] rounded-2xl' : ''
            "
          >
            <ChatBubbleLeftIcon class="h-7 w-7 shrink-0 text-[#9E55EC]" aria-hidden="true" />
          </router-link>
        </div>
        <div class="flex items-center justify-center h-full bg-white rounded-2xl cursor-pointer hover:bg-[#F3EBFC] lg:hidden">
          <router-link
            :to="{ name: 'language' }"
            class="p-[14px] w-full h-full"
            :class="
              route.name == 'language' ? 'bg-[#F3EBFC] rounded-2xl' : 
              route.name == 'category' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'subcategory' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == '2xsubcategory' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'atributCategory' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'atribut' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'social' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'page' ? 'bg-[#F3EBFC] rounded-2xl' :
              route.name == 'regions' ? 'bg-[#F3EBFC] rounded-2xl' :
              ''
            "
            >
              <Cog6ToothIcon class="h-7 w-7 shrink-0 text-[#9E55EC]" aria-hidden="true" />
            </router-link>
        </div>
        <!-- <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 xm:p-0">
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button> -->
        <!-- <select v-model="language" @change="changeLanguage" class="border-0 outline-none">
          <option v-for="option in languages" :key="option._id" :value="option._id">
            {{ option.title }}
          </option>
        </select> -->
        <!-- Profile dropdown -->
        <Menu as="div" class="relative flex bg-white  p-[12px] rounded-2xl min-w-[260px] h-full md:min-w-[200px] xm:min-w-[50px]">
          <MenuButton class="flex items-center">
            <div class="w-[38px] h-[38px] bg-[#F9F8FC] rounded-full flex items-center justify-center">
              <img
                class="h-[27px] w-[27px] rounded-full"
                src="../../assets/images/header-user.svg"
                alt="Profile image"
              />
            </div>
            <div class="flex items-center xm:hidden">
              <div class="flex flex-col gap-0 items-start justify-center ml-4 font-medium leading-3" aria-hidden="true">
                <!-- <div class="text-[#483D5B] text-lg">{{ auth_store.user?.lname }} {{ auth_store.user?.name }}</div> -->
                <div class="text-[#483D5B] text-base md:text-sm">{{ auth_store.user?.lname }} {{ auth_store.user?.name }}</div>
                <div class="text-[#B6A3D0] text-[14px]">{{ auth_store.user?.role }}</div>
              </div>
              <!-- <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400 xm:hidden" aria-hidden="true" /> -->
            </div>
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
              class="absolute right-0 top-[50px] z-10 w-[200px]  rounded-md bg-white py-2 shadow-lg  ring-gray-900/5 focus:outline-none"
            >
              <MenuItem class="hidden lg:block">
                <button @click="$router.push({ name: 'type-notification' })" class="block px-3 py-1 text-sm leading-6 text-[#483D5B]">
                  Уведомление
                </button>
              </MenuItem>
              <MenuItem class="hidden lg:block">
                <button @click="$router.push({ name: 'activationkeys' })" class="block px-3 py-1 text-sm leading-6 text-[#483D5B]">
                  Активационные ключи
                </button>
              </MenuItem>
              <MenuItem class="hidden lg:block">
                <button @click="$router.push({ name: 'logs' })" class="block px-3 py-1 text-sm leading-6 text-[#483D5B]">
                  Журналы
                </button>
              </MenuItem>
              <MenuItem class="hidden lg:block">
                <button  @click="$router.push({ name: 'messages' })" class="block px-3 py-1 text-sm leading-6 text-[#483D5B]">
                  Сообщение
                </button>
              </MenuItem>
              <MenuItem class="hidden lg:block">
                <button  @click="$router.push({ name: 'language' })" class="block px-3 py-1 text-sm leading-6 text-[#483D5B]">
                  Настройки
                </button>
              </MenuItem>
              <MenuItem>
                <button @click="logout" class="block px-3 py-1 text-sm leading-6 text-[#483D5B]">
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
import { Bars3Icon, BellIcon, Cog6ToothIcon, ChatBubbleLeftIcon, BookmarkSquareIcon, KeyIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
// const userNavigation = [{ name: 'Your profile', href: '#' }]

import { ComboboxOptions, Combobox, ComboboxOption } from '@headlessui/vue'

import { authStore } from '@/stores/user/auth'
const auth_store = authStore()
import { useLanguageStore } from '@/stores/usefull/lang'
const lang_store = useLanguageStore()

const language = ref(localStorage.getItem('language') || 'ru')
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
import { useRouter, useRoute } from 'vue-router'
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
const route = useRoute()
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
}
</script>
<style lang=""></style>
