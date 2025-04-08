<template>
  <div class="flex-1 overflow-auto pb-8">
    <div class="title mb-[15px]">{{ t('10.title') }}</div>
    <div v-if="step == 0">
      <div class="flex gap-1.5 mb-[10px]">
        <img src="@/assets/upload_req.svg" alt="" />
        <span class="text-event-700 font-nt-medium text-lg">{{ t('10.req') }}</span>
      </div>
      <ul class="list-disc pl-6 mb-6">
        <li>{{ t('10.req_1') }}</li>
        <li>{{ t('10.req_2') }}</li>
        <li>{{ t('10.req_3') }}</li>
      </ul>
      <div class="flex items-center justify-between">
        <span class="underline underline-offset-2">{{ t('10.more') }}</span>
        <ChevronRightIcon class="size-5" />
      </div>
    </div>
    <div v-if="step == 1" class="grid gap-5 grid-cols-2">
      <div v-for="(cover, index) of data.cover" :key="index" class="relative">
        <div
          v-if="index == data.cover?.length - 1 && loading"
          class="border-2 border-main rounded-[26px] border-dashed flex justify-center items-center aspect-square"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-main"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <img
          v-else
          :src="`${url}/${cover}`"
          alt=""
          class="rounded-[26px] aspect-square object-cover"
        />
        <Menu as="div" class="absolute right-3 top-3 inline-block text-left">
          <div>
            <MenuButton
              class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <label
                    for="upload"
                    @click="editIndex = index"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                  >
                    {{ t('edit') }}
                  </label>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div
                    @click="remove(index)"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    ]"
                  >
                    {{ t('delete') }}
                  </div>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <label
        for="upload"
        class="border-2 border-main rounded-[26px] border-dashed flex justify-center items-center aspect-square"
      >
        <ArrowUpTrayIcon class="size-8 font-bold text-main" />
      </label>
      <div></div>
    </div>
    <input
      type="file"
      name=""
      id="upload"
      @change="handleFileChange"
      ref="fileInput"
      class="hidden"
      accept="image/*"
    />
  </div>
  <button
    class="mt-4 btn"
    :class="[step == 0 || (step == 1 && statusBtn) ? 'btn' : 'btn-disabled', 'mt-auto']"
    @click="step == 0 ? step++ : statusBtn ? nextPage() : false"
  >
    {{ step == 0 ? t('understand') : t('continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
  <DialogAgree
    :dialog="toggle"
    :title="t('10.sure_title')"
    :text="t('10.sure_text')"
    :aggree-btn="t('delete')"
    :cancel-btn="t('cancel')"
    @answer="handleAnswer"
  />
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { url } from '@/utils/api'
// import cookies from 'vue-cookies'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { ArrowUpTrayIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

import { useI18n } from 'vue-i18n'
import DialogAgree from './layout/dialogAgree.vue'
const { t } = useI18n()
import cookies from 'vue-cookies'
const data = defineModel()

const toggle = ref(false)
const coverIndex = ref(-1)
const remove = (index) => {
  coverIndex.value = index
  toggle.value = true
}
const handleAnswer = (answer) => {
  if (answer) {
    data.value.cover.splice(coverIndex.value)
    coverIndex.value = -1
  }
  toggle.value = false
}

const editIndex = ref(-1)

const step = ref(1)
const fileInput = ref()
const loading = ref(false)
const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (file) {
    loading.value = true
    if (editIndex.value > -1) {
      data.value.cover[editIndex.value] = ''
    } else {
      data.value.cover.push('')
    }

    const token = cookies.get('qabul-token')

    const formData = new FormData()
    formData.append('file', file)
    try {
      // Replace with your API endpoint
      const response = await axios.post(`${url}/route/upload/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies.get('add-event') || ''}`
        }
      })
      if (editIndex.value > -1) {
        data.value.cover[editIndex.value] = response.data
      } else {
        data.value.cover[data.value.cover.length - 1] = response.data
      }
      editIndex.value = -1
      loading.value = false
    } catch (error) {
      console.error('Upload error:', error)
    }
  }
}
import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}

import { computed } from 'vue'
const statusBtn = computed(() => {
  return data.value.cover?.length > 2
})
</script>
<style lang=""></style>
