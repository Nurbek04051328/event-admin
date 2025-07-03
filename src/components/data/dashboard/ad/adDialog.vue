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
        {{ edit ? "Редактировать реклама" : "Добавить новая реклама" }}
      </DialogTitle>
      <div class="flex w-full md:flex-col">
        <div class="space-y-2 mt-4 w-full mr-1">
          <default-input
            v-model="data.title"
            name="title"
            label="Название"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <default-input
            v-model="data.slug"
            name="slug"
            label="Slug"
          />
          <default-input
            type="number"
            v-model="data.price"
            name="price"
            label="Цена"
            :error="v$.price?.$invalid && v$.price?.$dirty"
          />
          <uploadPhoto
            title="Изображения реклама"
            placeholder="Загрузить изображение реклама"
            v-model="data.cover"
            base_url="route/upload/ads"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <default-textarea
            v-model="data.description"
            name="description"
            label="Текст"
            :rows="15"
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
import uploadPhoto from '@/components/default/uploadPhoto.vue'
import { useFullStore } from '@/stores/usefull/modal'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const usefull = useFullStore()
const { toggle, id, lang } = storeToRefs(usefull)


const data = ref({
  title: '',
  description: '',
  slug: '',
  price: 0,
  cover: [],
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  description: { required },
  price: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { adsStore } from '@/stores/data/ads'
const store = adsStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      console.log("ketdiiiiedit", data.value, t);
      
      await store.saveAd({ ...data.value },t)
    } else {
      console.log("ketdiiiiadd", data.value);
      await store.addAd({ ...data.value }, t)
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
    slug: '',
    price: 0,
    cover: [],
  }
  v$.value.$reset()
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getAd(id.value, lang.value)
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        title: res.data?.title || '',
        description: res.data?.description || '',
        slug: res.data?.slug || '',
        price: res.data?.price || 0,
        cover: res.data?.cover || [],
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
      slug: '',
      price: 0,
      cover: [],
    }
  }
)
</script>
