<template>
  <TransitionRoot as="template" :show="toggle">
    <Dialog as="div" class="relative z-50" @close="close">
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
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[420px]"
            >
              <div class="text-center flex flex-col items-center py-4 px-6">
                <div class="text-event-900 font-semibold">{{ title }}</div>
                <div class="text-event-300">{{ text }}</div>
              </div>

              <div class="flex flex-row pb-6 px-6 gap-2">
                <button
                  type="button"
                  class="flex-1 justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  @click="close"
                >
                  {{ cancelBtn }}
                </button>
                <button
                  type="button"
                  class="inline-flex flex-1 justify-center rounded-xl bg-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="aggree"
                >
                  {{ aggreeBtn }}
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
import { ref, watch } from 'vue'
const toggle = ref(false)

const props = defineProps(['dialog', 'title', 'cancelBtn', 'aggreeBtn', 'text'])
const emit = defineEmits(['answer', 'close'])

watch(
  () => props.dialog,
  (to) => {
    toggle.value = to
  },
)

const aggree = () => {
  emit('answer', true)
}

const close = () => {
  emit('answer', false)
}
</script>
