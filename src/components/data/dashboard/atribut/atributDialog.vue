<template>
  <default-modal>
    <DialogPanel
      class="relative w-[30%] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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
        {{ edit ? "Редактировать атрибут подкатегории" : "Новый атрибут подкатегории" }}
      </DialogTitle>

      <div class="space-y-2 mt-4">
        <default-input
          v-model="data.title"
          name="title"
          label="Название атрибут подкатегории"
          :error="v$.title.$invalid && v$.title.$dirty"
        />
      </div>
      <div class="space-y-2 mt-4">
        <default-input
          v-model="data.slug"
          name="slug"
          label="Код атрибут подкатегории (slug)"
          :error="v$.slug.$invalid && v$.slug.$dirty"
          :disabled="edit"
        />
      </div>
      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn md:m-t-0 xs:m-t-0" @click="close">
          {{ $t('subcategory.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">
          {{ $t('category.dialog.save') }}
        </button>
      </div>
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
import { useRoute } from 'vue-router'
const route = useRoute()
const { toggle, id, lang } = storeToRefs(usefull)
defineProps(['options'])

const data = ref({
  attributeCategory: '',
  slug: '',
  title: ''
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  slug: { required },
  title: { required },
}

const close = () => {
  usefull.setToggle(false, 0);
  data.value = {
    attributeCategory: '',
    slug: '',
    title: ''
  }
  v$.value.$reset()
  edit.value = false 
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { atributStore } from '@/stores/data/atribut'
const store = atributStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      data.value.attributeCategory = route.params.id
      await store.saveAtribut({ ...data.value }, t)
    } else {
      data.value.attributeCategory = route.params.id
      console.log("atribut",data.value, route.params.id );
      
      await store.addAtribut({ ...data.value }, t)
    }
    
    close()
  } else {
    console.log(data.value)
  }
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getAtribut(id.value, lang.value)
      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        attributeCategory: res.data?.attributeCategory,
        slug: res.data?.slug || '',
        title: res.data?.title || ''
      }
    }
  }
)

watch(
  () => toggle.value,
  () => {
    data.value = {
      attributeCategory: '',
      slug: '',
      title: ''
    }
    v$.value.$reset()
    edit.value = false 
  }
)
</script>
