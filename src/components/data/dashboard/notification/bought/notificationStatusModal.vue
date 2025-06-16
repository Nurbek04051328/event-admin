<template>
  <TransitionRoot as="template" :show="visible">
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
        <div
          class="flex min-h-full items-center justify-center p-4 text-center  sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4  sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4  sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-[20%] lg:w-[50%] xm:w-[100%]"
              >
                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    @click="close"
                  >
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                  Изменить статус
                </DialogTitle>
            
                <div class="space-y-2 mt-4 w-full">
                  <default-select
                    v-model="data.status"
                    name="action"
                    placeholder="Выберите из списка"
                    :options="actions"
                    option_title="title"
                    :error="v$.status.$invalid && v$.status.$dirty"
                  />
            
                  <default-textarea
                    v-if="data.status === 'denied'"
                    v-model="data.desc"
                    :rows="6"
                    name="description"
                    label="Описание причин"
                  />
                </div>
            
                <div class="mt-6 flex flex-row gap-2">
                  <button type="button" class="close-btn" @click="close">Отменить</button>
                  <button type="button" class="send-btn flex items-center gap-2" @click="send" :disabled="loading">
                    <svg
                      v-if="loading"
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      />
                    </svg>
                    <span>
                      {{ loading ? 'Сохранение...' : 'Сохранить' }}
                    </span>
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
import { ref, watch } from 'vue'
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { notificationStore } from '@/stores/data/notification'

const props = defineProps({
  visible: Boolean,
  id: String
})

const emit = defineEmits(['close', 'saved'])

const store = notificationStore()
const loading = ref(false)


const data = ref({
  status: '',
  desc: ''
})

const actions = [
  { title: 'Актив', _id: 'approve' },
  { title: 'В ожидание', _id: 'checking' },
  { title: 'Не актив', _id: 'denied' }
]

const rules = {
  status: { required }
}

const v$ = useVuelidate(rules, data)

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      await store.changeBoughtNotifStatus({ ...data.value, _id: props.id })
      emit('saved')
      close()
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }
}

const close = () => {
  emit('close')
  data.value = { status: '', desc: '' }
  v$.value.$reset()
}
</script>

