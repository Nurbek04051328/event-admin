<template>
  <div>
    <label v-if="label" :for="name" class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}
    </label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <textarea
        :id="name"
        :rows="rows || 6"
        :name="name"
        :placeholder="placeholder"
        v-model="model"
        :maxlength="max"
        @blur="handleBlur"
        class="block w-full rounded-2xl resize-none border-0 p-4 shadow-sm ring-1 rbg-white text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
      />
    </div>
    <div class="flex justify-between text-sm mt-2">
      <div>
        <span class="text-main">{{ model.length }}</span> / {{ max }}
      </div>
      <div @click="open = true" class="underline underline-offset-2 text-event-700" v-if="example">
        {{ example }}
      </div>
    </div>
  </div>
  <TransitionRoot v-if="example" as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{
                  example_title
                }}</DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ example_text }}
                  </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                  @click="open = false"
                >
                  {{ t('close') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
const model = defineModel()
defineProps([
  'label',
  'placeholder',
  'name',
  'example',
  'example_text',
  'example_title',
  'error',
  'disabled',
  'suffix',
  'rows',
  'max',
  'blur'
])

const emits = defineEmits(['blur'])

const handleBlur = () => {
  emits('blur',model.value)
}

import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false)

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<style lang=""></style>
