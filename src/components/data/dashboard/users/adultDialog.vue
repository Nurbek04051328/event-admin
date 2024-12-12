<template>
  <TransitionRoot as="template" :show="toggle">
    <Dialog as="div" class="relative z-[9999]" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white pt-12 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[420px]">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="close">
                  <span class="sr-only">Yopish</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="text-center flex flex-col items-center py-4 px-6 pb-10">
                <div class="rounded-full mb-1 w-14 h-14 bg-green-100 flex items-center justify-center">
                  <CheckIcon class="size-8 text-green-600" />
                </div>
                <div class="font-medium text-lg">
                  {{ title }}
                </div>
              </div>

              <div class="flex flex-row border-t-[1px] border-gray-200 py-4 px-6 gap-2">
                <button type="button"
                  class="flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="close">
                  {{ $t('event.accessDialog.close') }}
                </button>
                <button type="button"
                  class="inline-flex flex-1 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="aggree">
                  {{ btnTitle }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/solid'

import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { watch } from 'vue'
const toggle = ref(false)
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps(['dialog', 'title', 'btnTitle'])
const emit = defineEmits(['adult', 'closeAdult'])

watch(
  () => props.dialog,
  (to) => {
    toggle.value = to
  }
)

const aggree = () => {
  emit('adult')
}

const close = () => {
  emit('closeAdult', false)
}
</script>