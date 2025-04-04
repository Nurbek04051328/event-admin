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
            v-model="data.title"
            name="title"
            label="Название"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <default-input
            type="number"
            v-model="data.percent"
            name="percent"
            label="Процент"
            :error="v$.percent?.$invalid && v$.percent?.$dirty"
          />
          <default-textarea
            v-model="data.desc"
            name="desc"
            label="Текст"
            :error="v$.desc?.$invalid && v$.desc?.$dirty"
          />
          <div class="mt-4">
            <label class="flex mt-4 items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="metric" false-value="hide" type="checkbox" v-model="data.toUser" />
              <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77]">Для пользователей</span>
            </label>
          </div>
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
  desc: '',
  percent: 0,
  toUser: false
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
import { taxStore } from '@/stores/data/nalog'
const store = taxStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      await store.saveTax({ ...data.value }, t)
    } else await store.addTax({ ...data.value }, t)
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
    toUser: false
  }
  v$.value.$reset()
  edit.value = false 
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getTax(id.value, lang.value)
      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        title: res.data?.title || '',
        desc: res.data?.desc || '',
        percent: res.data?.percent || 0,
        toUser: res.data?.toUser,
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
      toUser: false
    }
    v$.value.$reset()
    edit.value = false
  }
)
</script>