<template>
  <TransitionRoot as="template" :show="toggle">
    <Dialog as="div" class="relative z-50" @close="aggree(false)">
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
              class="relative transform overflow-hidden rounded-lg bg-white pt-3 text-left shadow-xl transition-all w-full max-w-[420px]"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="close"
                >
                  <span class="sr-only">Yopish</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="space-y-4 py-4 px-6">
                <div class="font-medium text-lg">Поменять статус поста</div>
                <div>
                  <DefaultSelect
                    v-model="data.status"
                    label="Статус поста"
                    :options="postStatus"
                    option_title="title"
                  />
                </div>
                <div v-if="['pending', 'denied'].includes(data.status)">
                  <DefaultTextarea label="Описание к решение" v-model="data.comment" :rows="5" />
                </div>
              </div>

              <div class="flex flex-row border-t-[1px] border-gray-200 py-4 px-6 gap-2">
                <button
                  type="button"
                  class="flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  @click="aggree(false)"
                >
                  Отменить
                </button>
                <button
                  type="button"
                  class="inline-flex flex-1 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="aggree(true)"
                >
                  Сохранить
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
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
const toggle = defineModel()

import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { watch } from 'vue'
import DefaultSelect from '@/components/default/defaultSelect.vue'
import { postStatus } from '@/helpers/vars'
import DefaultTextarea from '@/components/default/defaultTextarea.vue'

const props = defineProps(['dialog'])
const emit = defineEmits(['answer', 'close'])

const data = ref({
  status: '',
  comment: ''
})

import { useNotification } from '@/stores/usefull/notification'
const notif = useNotification()

const aggree = (value) => {
  if (
    value &&
    ['pending', 'denied'].includes(data.value.status) &&
    data.value.comment?.length < 1
  ) {
    notif.setNotif(true, 'Напишите описание к решение', 'danger')
    return
  }
  emit('answer', { answer: value, ...data.value })
  toggle.value = false
  data.value = {
    status: '',
    comment: ''
  }
}
</script>
