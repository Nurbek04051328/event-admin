<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[50%] lg:w-[80%]  xm:w-[100%]"
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
        {{ edit ? $t('ticketPackage.dialog.edit') : $t('ticketPackage.dialog.title') }}
      </DialogTitle>
      <div class="flex w-full xs-max:flex-col">
        <div class="space-y-2 mt-4 w-full mr-1">
          <default-input
            v-model="data.title"
            name="title"
            :label="t('ticketPackage.dialog.name')"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <default-input
            type="number"
            v-model="data.quantity"
            name="quantity"
            :label="t('ticketPackage.dialog.quantity')"
            :error="v$.quantity?.$invalid && v$.quantity?.$dirty"
          />
          <default-input
            type="number"
            v-model="data.commissionRate"
            name="commissionRate"
            :label="t('ticketPackage.dialog.commissionRate')"
            :error="v$.commissionRate?.$invalid && v$.commissionRate?.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <default-textarea
            v-model="data.description"
            name="description"
            :label="t('ticketPackage.dialog.text')"
            :error="v$.description?.$invalid && v$.description?.$dirty"
          />
        </div>
      </div>

      <div class="mt-6 flex flex-row">
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
defineProps(['options'])

const data = ref({
  title: '',
  description: '',
  quantity: 0,
  commissionRate: 0
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  description: { required },
  quantity: { required },
  commissionRate: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { tarifStore } from '@/stores/data/tarif'
const store = tarifStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      await store.saveTarif({ ...data.value }, t)
    } else await store.addTarif({ ...data.value }, t)
    close()
  } else {
    console.log(data.value)
  }
}

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    title: '',
    description: '',
    quantity: 0,
    commissionRate: 0
  }
  v$.value.$reset()
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getTarif(id.value, lang.value)
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        title: res.data?.description || '',
        description: res.data?.description || '',
        quantity: res.data?.quantity || 0,
        commissionRate: res.data?.commissionRate || 0
        // description: res.data?.title || '',
        // translate: {
        //   title: res.data?.translate?.title || '',
        //   language: res.data?.translate?.language || '',
        // }
      }
    }
  }
)

watch(
  () => toggle.value,
  () => {
    data.value = {
      title: '',
      description: '',
      quantity: 0,
      commissionRate: 0
    }
  }
)
</script>
