<template>
  <TransitionRoot as="template" :show="toggle">
    <Dialog as="div" class="relative z-[9999]" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto ">
        <div class="flex min-h-full items-center justify-center p-4 text-center ">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 ">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white pt-1 text-left shadow-xl transition-all w-[30%] lg:w-[50%] xm:w-[95%]">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="close">
                  <span class="sr-only">Yopish</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="flex w-full px-4 pb-4 pt-5">
                <div class="space-y-2 mt-4 w-full mr-1">
                  <default-input 
                    v-model="data.title" 
                    name="title" 
                    label="Причина отказа"
                    :error="v$.title.$invalid && v$.title.$dirty"
                  />
                  <default-textarea 
                    v-model="data.desc" 
                    name="desc" 
                    label="Подробные"
                    :error="v$.desc.$invalid && v$.desc.$dirty"
                  />
                  
                </div>
              </div>
              
              <div class="mt-6 flex flex-row px-4 pb-4 gap-2">
                <button type="button" class="close-btn" @click="close">{{ $t('ticketPackage.dialog.close') }}</button>
                <button type="button" class="send-btn"  @click="send">{{ $t('ticketPackage.dialog.save') }}</button>
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

import { XMarkIcon } from '@heroicons/vue/24/outline'
import { eventStore } from '@/stores/data/event';
const store = eventStore();
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const toggle = ref(false)
const props = defineProps(['dialog', 'title', 'btnTitle'])
const emit = defineEmits([ 'closeRefusel'])

// Otkaz dialog
const data = ref({
  _id: route.params.id,
  title: '',
  desc: '',
  status: 'denied'
})


import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  desc: { required },
  title: { required }
}

const v$ = useVuelidate(rules, data)


watch(
  () => props.dialog,
  (to) => {
    toggle.value = to
  }
)


const close = () => {
  emit('closeRefusel', false)
}




const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    await store.changeStatus({ ...data.value }, t);
    close();
  }

}
</script>