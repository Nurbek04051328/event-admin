<template>
  <TransitionRoot as="template" :show="usefull.sidebarOpen">
    <Dialog as="div" class="relative z-[9999] lg:flex lg:fixed" @close="usefull.setSidebarOpen(false)">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>
      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute right-0 top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="usefull.setSidebarOpen(false)">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#9E55EC] px-6 pb-4"
            >
              <nav class="flex flex-1 flex-col">
                <div class="flex py-4 gap-4 shrink-0 items-center justify-start text-white">
                  <img class="h-10 w-auto" src="../../assets/logo/logo.png" alt="Company Logo" />
                  <span class="text-2xl">Eventum</span>
                </div>
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li
                        v-for="item in links.filter((i) => i?.meta?.group == 'main')"
                        :key="item.name"
                        @click="usefull.setSidebarOpen(false)"
                      >
                        <router-link
                          :to="{ name: item.name }"
                          :class="[
                            item.current
                              ? 'bg-white text-[#9E55EC]'
                              : 'text-gray-400 hover:text-[#9E55EC] hover:bg-gray-200',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-white'
                          ]"
                        >
                          <component
                            :is="item?.meta.icon"
                            class="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {{ item.meta?.title }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto -mx-2">
                    <router-link
                      v-for="item in links.filter((i) => i?.meta?.group == 'setting')"
                      :key="item.name"
                      :to="{ name: 'language' }"
                      :class="[
                        item.name == route.name
                          ? 'bg-white text-[#9E55EC]'
                          : 'text-gray-400 hover:text-[#9E55EC] hover:bg-gray-200',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-white'
                      ]"
                    >
                      <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                      {{ $t('menu.' + item.name) }}
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <div class="  lg:hidden min-w-[260px]">
    <div class="flex grow flex-col overflow-y-auto bg-white px-6 pb-4 pt-[10px] h-full rounded-br-3xl rounded-tr-3xl">
      <div class="flex py-4 gap-4 shrink-0 items-center justify-start mb-[50px]">
        <img class="h-14 w-auto" src="../../assets/logo/logo.png" alt="Company Logo" />
        <span class="text-3xl text-[#483D5B] font-bold">Eventum</span>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1 text-base">
              <li v-for="item in links.filter((i) => i?.meta?.group == 'main')" :key="item.name">
                <router-link
                  :to="{ name: item.name }"
                  :class="[
                    'group flex items-center gap-x-3 rounded-2xl px-[16px] py-[10px] text-base leading-6 font-[500]',
                    item.name == route.name || item.name == route.meta?.active
                      ? 'bg-[#9E55EC] text-white'
                      : 'text-[#483D5B] hover:text-[#483D5B] hover:bg-[#F3EBFC]'
                    
                  ]"
                >
                  <component :is="item?.meta.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
                  <!-- {{ item.name }} -->
                  {{ $t('menu.' + item.name) }}
                </router-link>
              </li>
            </ul>
          </li>
          <!-- <li class="mt-auto">
            <router-link
              v-for="item in links.filter((i) => i?.meta?.group == 'setting')"
              :key="item.name"
              :to="{ name: 'language' }"
              :class="[
                item.name == route.name || route.name.startsWith(item.name)
                  ? 'bg-[#9E55EC] text-white'
                  : 'text-[#483D5B] hover:text-[#483D5B] hover:bg-[#F3EBFC]',
                'group flex gap-x-3 rounded-2xl px-[16px] py-[14px] text-lg leading-6 font-medium'
              ]"
            >
              <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
              {{ $t('menu.' + item.name) }}
            </router-link>
          </li> -->
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useLanguageStore } from '@/stores/usefull/lang'
const lang_store = useLanguageStore()
import { links } from '@/helpers/menu'

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()

import { onMounted, watch } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
watch(
  () => lang_store.language,
  (newLang) => {
    locale.value = newLang
  }
)
onMounted(() => {})
</script>
