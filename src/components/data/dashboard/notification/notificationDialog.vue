<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[400px]"
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
        {{ edit ? 'Редактировать уведомление' : 'Добавить новая уведомление' }}
      </DialogTitle>
      <div class="flex w-full xs-max:flex-col">
        <div class="space-y-2 mt-4 w-full mr-1">
          <default-input
            v-model="data.title"
            name="title"
            label="Название тип уведомление"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <DefaultTextarea
            v-model="data.description"
            name="description"
            label="Описание тип уведомление"
            :error="v$.description?.$invalid && v$.description?.$dirty"
          />
          <DefaultSelect
            v-model="data.type"
            :options="notifType"
            option_title="title"
            name="type"
            label="Тип уведомление"
          />
          <div class="grid grid-cols-2 gap-4">
            <default-input v-model="data.slug" name="slug" label="Slug" />
            <default-input
              type="number"
              v-model="data.price"
              name="price"
              label="Цена за одного"
              :error="v$.price?.$invalid && v$.price?.$dirty"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn md:m-t-0 xs:m-t-0" @click="close">
          {{ $t('ticketPackage.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">
          {{ $t('ticketPackage.dialog.save') }}
        </button>
      </div>
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useFullStore } from '@/stores/usefull/modal'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const usefull = useFullStore()
const { toggle, id, lang } = storeToRefs(usefull)

const data = ref({
  type: '',
  slug: '',
  price: 0
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  type: { required },
  title: { required },
  description: { required },
  slug: { required },
  price: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { notificationStore } from '@/stores/data/notification'
import DefaultSelect from '@/components/default/defaultSelect.vue'
import { notifType } from '@/helpers/vars'
import DefaultTextarea from '@/components/default/defaultTextarea.vue'
const store = notificationStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang

      await store.saveNotification({ ...data.value }, t)
    } else {
      await store.addNotification({ ...data.value }, t)
    }

    close()
  } else {
    console.log(data.value)
  }
}

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    type: '',
    slug: '',
    price: 0
  }
  v$.value.$reset()
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getNotification(id.value, lang.value)
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        type: res.data?.type || '',
        slug: res.data?.slug || '',
        price: res.data?.price || 0
      }
    }
  }
)

watch(
  () => toggle.value,
  () => {
    data.value = {
      type: '',
      slug: '',
      price: 0
    }
  }
)
</script>
