<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-[30%] lg:w-[50%]  xm:w-[100%]"
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
        Управление доступом
      </DialogTitle>

      <div class="space-y-2 mt-4 w-full">
        <default-select
          v-model="data.action"
          name="action"
          placeholder="Выберите из списка"
          :options="options.actions || []"
          option_title="title"
          :error="v$.action.$invalid && v$.action.$dirty"
        />

        <default-textarea
          v-if="['revoke'].includes(data.action)"
          v-model="data.description"
          name="description"
          label="Описание причин"
        />

        <upload-photo
          v-if="['revoke'].includes(data.action)"
          title="Файлы для причин"
          placeholder="Загрузите файлов"
          v-model="data.file"
          base_url="route/upload/access"
        />
      </div>

      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn" @click="close">Отменить</button>
        <button type="button" class="send-btn" @click="send">Сохранить</button>
      </div>
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import uploadPhoto from '@/components/default/uploadPhoto.vue'

import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()

const { toggle, id } = storeToRefs(usefull)
defineProps(['options'])
const emit = defineEmits(['send'])
const data = ref({
  title: '',
  action: 'organizer',
  description: '',
  file: []
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  action: { required }
}

const v$ = useVuelidate(rules, data)

import { usersStore } from '@/stores/data/users'
const store = usersStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {console.log("datavalaaaa", data.value);
  
    const d = await store.userAccess({ ...data.value, _id: id.value })
    emit('send', d)
    close()
  } else {
    console.log(data.value)
  }
}

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {    
    action: 'organizer',
    description: '',
    file: []
  }
  v$.value.$reset()
}

watch(
  () => toggle.value,
  () => {
    data.value = {
      action: 'organizer',
      description: '',
      file: []
    }
  }
)
</script>
