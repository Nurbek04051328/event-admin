<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[40%] lg:w-[80%]  xm:w-[100%]"
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
        {{ edit ? "Редактировать новостную категорию" : "Добавить новую новостную категорию" }}
      </DialogTitle>

        <div class="space-y-2 mt-4 w-full mr-1">
          <default-input
            v-model="data.title"
            name="title"
            label="Название"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <uploadPhoto
            title="Изображения категория новостей"
            placeholder="Загрузить изображение категория новостей"
            v-model="data.icon"
            base_url="route/upload/newscategory"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <default-textarea
            v-model="data.description"
            name="description"
            label="Текст"
            :rows="8"
            :error="v$.description?.$invalid && v$.description?.$dirty"
          />
        </div>

      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn md:m-t-0 xs:m-t-0" @click="close">
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
  icon: [],
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  description: { required },
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { newsCategoryStore } from '@/stores/data/newscategory'
const store = newsCategoryStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      await store.saveNewsCategory({ ...data.value },t)
    } else {
      console.log("ketdiiiiadd", data.value);
      await store.addNewsCategory({ ...data.value }, t)
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
    icon: [],
  }
  v$.value.$reset()
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      console.log(id.value, lang.value);
      
      const res = await store.getNewsCategory(id.value, lang.value)
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        title: res.data?.title || '',
        description: res.data?.description || '',
        icon: res.data?.icon || [],
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
      icon: [],
    }
  }
)
</script>
