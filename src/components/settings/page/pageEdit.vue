<template>
  <div class="h-[100%] overflow-hidden m-4 flex flex-col flex-1">
    <div class="flex items-center justify-between mb-4 ">
      <div class="flex items-center">
        <button  
          @click="$router.push({ name: 'page' })" 
          class="w-[30px] h-[30px] rounded-full bg-[#F5F0FF] mr-[16px] flex justify-center items-center hover:bg-[#9E55EC] hover:text-white"
          >
            <ChevronLeftIcon class="size-7" />
        </button>
        <div as="h3" class="text-[22px] font-bold leading-6 text-[#483D5B]">
          Добавить новая cтраница
        </div>
      </div>
      <div class="flex gap-2">
        <div class="flex gap-2 items-center">
          <button type="button" class="close-btn mt-0 h-[40px] min-w-[100px] rounded-[16px]" @click="close">
            Отмена
          </button>
          <button type="button" class="send-btn rounded-[16px] h-[40px] min-w-[100px]" @click="send">Добавить</button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 h-[100%] overflow-hidden">
      <div class="col-span-8 p-8 bg-white rounded-[16px] flex flex-col overflow-hidden">
        <div class="h-full flex-1 overflow-auto">
          <div class="flex w-full xm:block">
            <div class="space-y-2 w-full">
              <default-input
                v-model="data.title"
                name="title"
                label="Название"
                :error="v$.title?.$invalid && v$.title?.$dirty"
              />
            </div>
          </div>
          <div class="flex items-center w-full xm:block">
            <div class="space-y-2 mt-2 w-full">
              <label class="block text-sm font-medium leading-6 text-[#645A77]">
                Техт
              </label>
              <QuillEditor  
                v-model:content="data.desc" 
                contentType="html" 
                :options="editorOptions"
                class="custom-quill-editor"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-4 p-8 bg-white rounded-[16px] flex flex-col overflow-hidden">
        <div class="h-full flex-1 overflow-auto">
          <div class="flex w-full xm:block">
            <div class="space-y-2 w-full">
              <default-input
                v-model="data.slug"
                name="slug"
                label="Код страница (slug)"
                :error="v$.slug.$invalid && v$.slug.$dirty"
              />
            </div>
          </div>
          <div class="flex items-center w-full xm:block">
            <div class="space-y-2 mt-4 w-full">
              <uploadPhoto
                title="Изображение"
                placeholder="Загрузить изображение страница"
                v-model="data.cover"
                base_url="route/upload/page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import uploadPhoto from '@/components/default/uploadPhoto.vue'

// Quill Editor import
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { pageStore } from '@/stores/data/page'
const store = pageStore()

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


const data = ref({
  title: '',
  desc: '',
  slug: '',
  cover: [],
})


import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  slug: { required },
}
const v$ = useVuelidate(rules, data)


const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    console.log("ketayotgan daat", data.value );
    // const payload = { ...data.value }
    await store.savePage({ ...data.value }, t)
    router.push({ name: 'page' })
    clear()
  } else {
    console.log(data.value)
  }
}


// Quill Editor options
const editorOptions = ref({
  theme: 'snow',
  placeholder: 'Введите текст...',
  strictMode: true,
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

const clear = () => {
  data.value = {
    title: '',
    desc: '',
    slug: '',
    cover: [],
  }
  v$.value.$reset()
}

const close = () => {
  router.push({ name: 'page' })
  clear()
}


// Slug generatsiyasi
watch(
  () => data.value.title,
  (newTitle) => {
    if (newTitle) {
      data.value.slug = newTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') 
        .replace(/[^a-z0-9\-]/g, '') 
    } else {
      data.value.slug = ''
    }
  }
)




onMounted(async () => {
  if(route.params.id) {
    const res = await store.getPage(route.params.id, route.params.lang)
    console.log("res", res);
    
    data.value = {
      ...res.data,
      _id: route.params.id,
      language: route.params.lang,
      title: res.data?.title || '',
      desc: res.data?.desc || '',
      slug: res.data?.slug || '',
      cover: res.data?.cover || [],
    }
  }
})
</script>
<style>
  .custom-quill-editor {
    border: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    height: 500px; 
    display: flex;
    flex-direction: column;
  }

  .custom-quill-editor .ql-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .ql-toolbar{
    border: 1px solid #ddd;
    border-radius: 8px 8px 0 0; 
    background-color: #f8f9fa;
  }

  .custom-quill-editor .ql-editor {
    flex: 1;
    overflow-y: auto; /* Ichki scroll bo‘lishi */
    max-height: 100%;
    min-height: 100px; /* Eng kichik balandlik */
    padding-bottom: 16px; /* Pastki joy bo‘sh bo‘lib qolishi uchun */
  }
</style>