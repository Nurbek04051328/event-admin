<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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
        {{ edit ? $t('social.dialog.edit') : $t('social.dialog.title') }}
      </DialogTitle>

      <div class="space-y-2 mt-4">
        <default-input
          v-model="data.title"
          name="title"
          :label="t('social.dialog.name')"
          :error="v$.title.$invalid && v$.title.$dirty"
        />
      </div>
      <div class="space-y-2 mt-4">
        <upload-photo
          :title="t('social.dialog.icon')"
          :placeholder="t('social.dialog.placeholder')"
          v-model="data.icon"
          base_url="route/upload/social"
          :error="v$.icon.$invalid && v$.icon.$dirty"
        />
      </div>
      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn md:m-t-0 xs:m-t-0" @click="close">
          {{ $t('social.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">{{ $t('social.dialog.save') }}</button>
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
import uploadPhoto from '@/components/default/uploadPhoto.vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const { toggle, id } = storeToRefs(usefull)
defineProps(['options'])

const data = ref({
  icon: [],
  title: ''
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  icon: { required },
  title: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { socialStore } from '@/stores/data/social'
const store = socialStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      await store.saveSocial({ ...data.value }, t)
    } else await store.addSocial({ ...data.value }, t)
    close()
  } else {
    console.log(data.value)
  }
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0) {
      const res = await store.getSocial(id.value)
      // if (res.status == 200) {
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        icon: res.data?.icon || [],
        title: res.data?.title || ''
      }
      // }
    }
  }
)

watch(
  () => toggle.value,
  () => {
    data.value = {
      icon: [],
      title: ''
    }
  }
)

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    icon: [],
    title: ''
  }
}
</script>
