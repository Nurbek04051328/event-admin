<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[70%] lg:w-[80%]  xm:w-[100%]"
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
      <div class="flex w-full xs-max:flex-col">
        <div class="space-y-2 mt-4 w-full mr-1">
          <filter-select
            v-model="data.category"
            name="category"
            :label="t('subcategory.dialog.category')"
            :options="newscategory_store.newCategories || []"
            option_title="title"
            :error="
              v$.category.$invalid && v$.category.$dirty ? t('subcategory.dialog.notcategory') : null
            "
          />
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
          <uploadPhoto
            title="Изображения новости"
            placeholder="Загрузить изображение новости"
            v-model="data.cover"
            base_url="route/upload/news"
          />
        </div>
        <div class="space-y-2 mt-4 mb-10 w-full ml-1">
          <QuillEditor v-model:content="data.text" contentType="html" :options="editorOptions" />
        </div>
      </div>
      <div>
        
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

// Quill Editor import
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const { t } = useI18n()
const usefull = useFullStore()
const { toggle, id, lang } = storeToRefs(usefull)
import { newsCategoryStore } from '@/stores/data/newscategory'
const newscategory_store = newsCategoryStore()

const data = ref({
  title: '',
  text: '',
  slug: '',
  cover: [],
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  category: { required },
  text: { required },
  slug: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { newsStore } from '@/stores/data/news'
const store = newsStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      console.log("ketdiiiiedit", data.value, t);
      
      await store.saveNews({ ...data.value },t)
    } else {
      console.log("ketdiiiiadd", data.value);
      await store.addNews({ ...data.value }, t)
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
    category: '',
    text: '',
    slug: '',
    cover: [],
  }
  v$.value.$reset()
}


// Quill Editor options
const editorOptions = ref({
  theme: 'snow',
  placeholder: 'Введите текст...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image']
    ]
  }
})

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getOneNews(id.value, lang.value)
      console.log('res', res)

      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        title: res.data?.title || '',
        category: res.data?.category || '',
        text: res.data?.text || '',
        slug: res.data?.slug || '',
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
      category: '',
      text: '',
      slug: '',
      cover: [],
    }
  }
)
</script>
