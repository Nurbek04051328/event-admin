<template>
  <div class="flex-1 overflow-auto space-y-[40px] pb-8">
    <div>
      <div class="title mb-[5px]">{{ t('9.title') }}</div>
      <div class="text mb-[35px]">
        {{ t('9.desc') }}
        <button class="text-main underline underline-offset-2" @click="open = true">
          {{ t('show_example') }}
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <DefaultTextarea
        v-model="data.title"
        :max="60"
        :placeholder="t('9.placeholder')"
        name="title"
      />
    </div>
  </div>

  <TransitionRoot as="template" :show="open">
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
                  t('examples')
                }}</DialogTitle>
                <div class="mt-2">
                  <div
                    class="text-sm text-gray-500 bg-grandma h-[250px] bg-cover relative rounded-2xl overflow-hidden"
                  >
                    <div class="text-white relative z-10 text-lg font-bold p-4">
                      {{ t('9.example') }}
                    </div>
                    <div
                      class="w-full h-full bg-gradient-to-b from-main to-event-300 absolute top-0 left-0 opacity-50"
                    ></div>
                  </div>
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

  <button
    :class="[statusBtn ? 'btn' : 'btn-disabled', 'mt-auto']"
    @click="statusBtn ? nextPage() : false"
  >
    {{ t('continue') }}
    <ChevronRightIcon class="size-5" />
  </button>
</template>
<script setup>
import { ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
const open = ref(false)
import { useI18n } from 'vue-i18n'
import DefaultTextarea from './layout/defaultTextarea.vue'
const { t } = useI18n()

import { mainStore } from '@/stores/data/default'
const main = mainStore()
const nextPage = () => {
  main.setPage(1, 0)
}
const data = defineModel()

import { computed } from 'vue'
const statusBtn = computed(() => {
  return data.value.title.length > 0
})
</script>
<style lang=""></style>
