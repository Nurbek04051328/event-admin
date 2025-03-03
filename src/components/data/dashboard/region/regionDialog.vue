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
        {{ edit ? 'Редактировать' : 'Добавить' }}
      </DialogTitle>

      <div class="space-y-2 mt-4">
        <default-input
          v-model="data.title"
          name="title"
          label="Название"
          :error="v$.title.$invalid && v$.title.$dirty"
        />
      </div>
      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn" @click="close">
          {{ $t('category.dialog.close') }}
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
// import uploadPhoto from '@/components/default/uploadPhoto.vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const { toggle, id, lang } = storeToRefs(usefull)
defineProps(['options'])

const data = ref({
  title: ''
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { regionStore } from '@/stores/data/regions'
const store = regionStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      console.log('savecat', data.value)

      await store.saveRegion({ ...data.value }, t)
    } else {
      console.log('addcat', data.value)

      await store.addRegion({ ...data.value }, t)
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
      const res = await store.getRegion(id.value, lang.value)
      console.log('res', res.data)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        slug: res.data?.slug || '',
        title: res.data?.title || ''
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
      slug: '',
      title: ''
    }
    v$.value.$reset()
    edit.value = false
  }
)

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    slug: '',
    title: ''
  }
  v$.value.$reset()
  edit.value = false
}
</script>
