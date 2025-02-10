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
          <div class="flex justify-between w-full gap-2">
            <default-input
              type="number"
              class="w-full"
              v-model="price.from"
              name="from"
              :label="t('ticketPackage.dialog.quantity')"
              :error="v$.from?.$invalid && v$.from?.$dirty"
            />
            <default-input
              type="number"
              class="w-full"
              v-model="price.to"
              name="to"
              :label="t('ticketPackage.dialog.quantity')"
              :error="v$.to?.$invalid && v$.to?.$dirty"
            />
          </div>
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
  description: '',
  commissionRate: 0
})
const price = ref({
  from: 0,
  to: 0
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  description: { required },
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
      data.value.price = price.value


      console.log("ketdiiiiedit", data.value);
      
      await store.saveTarif({ ...data.value }, t)

    } else {
      data.value.price = price.value

      console.log("ketdiiiiadd", data.value);
      await store.addTarif({ ...data.value }, t)
    }
      
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
    commissionRate: 0
  }
  price.value = {
    from: 0,
    to: 0
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
        commissionRate: res.data?.commissionRate || 0
      }
      price.value = {
        from: data.value.price.from,
        to: data.value.price.to
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
      commissionRate: 0
    }
    price.value = {
      from: 0,
      to: 0
    }
  }
)
</script>
