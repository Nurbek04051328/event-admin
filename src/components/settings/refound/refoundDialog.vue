<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[30%] lg:w-[50%]  xm:w-[100%]"
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
            type="number"
            v-model="data.day"
            name="percent"
            label="День"
            :error="v$.percent?.$invalid && v$.percent?.$dirty"
          />
          <default-input
            type="number"
            v-model="data.percent"
            name="percent"
            label="Процент"
            :error="v$.percent?.$invalid && v$.percent?.$dirty"
          />
          <default-input
            v-model="data.title"
            name="title"
            label="Название"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <default-textarea
            v-model="data.desc"
            name="desc"
            label="Описание"
            :error="v$.desc?.$invalid && v$.desc?.$dirty"
          />
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
defineProps(['options'])

const data = ref({
  title: '',
  desc: '',
  percent: 0,
  day: 1,
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  desc: { required },
  percent: { required },
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { refoundStore } from '@/stores/data/refound'
const store = refoundStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      await store.saveRefaund({ ...data.value }, t)
    } else await store.addRefaund({ ...data.value }, t)
    close()
  } else {
    console.log(data.value)
  }
}

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    title: '',
    desc: '',
    percent: 0,
    day: 0,
  }
  v$.value.$reset()
  edit.value = false 
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getRefaund(id.value, lang.value)
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        title: res.data?.title || '',
        desc: res.data?.desc || '',
        percent: res.data?.percent || 0,
        day: res.data?.day || 0,
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
      desc: '',
      percent: 0,
      day: 0,
    }
    v$.value.$reset()
  edit.value = false 
  }
)
</script>