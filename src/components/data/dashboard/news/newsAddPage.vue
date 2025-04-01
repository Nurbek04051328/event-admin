<template>
  <div class="h-[100%] overflow-hidden m-4 flex flex-col flex-1">
    <div class="flex items-center justify-between mb-4 ">
      <div class="flex items-center">
        <button  
          @click="$router.push({ name: 'news' })" 
          class="w-[30px] h-[30px] rounded-full bg-[#F5F0FF] mr-[16px] flex justify-center items-center hover:bg-[#9E55EC] hover:text-white"
          >
            <ChevronLeftIcon class="size-7" />
        </button>
        <div as="h3" class="text-[22px] font-bold leading-6 text-[#483D5B]">
          Добавить новую новость
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
                v-model:content="data.text" 
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
              <filter-select
                v-model="data.category"
                name="category"
                :label="t('subcategory.dialog.category')"
                :options="category_store.categories || []"
                option_title="title"
                :error="
                  v$.category.$invalid && v$.category.$dirty ? t('subcategory.dialog.notcategory') : null
                "
              />
            </div>
          </div>
          <div class="flex w-full xm:block">
            <div class="space-y-2 mt-4 w-full">
              <filter-select
                v-model="data.subcategory"
                name="category"
                label="Выберите подкатегорию"
                :options="subcategory_store.subcategories || []"
                option_title="title"
                :error="
                  v$.subcategory.$invalid && v$.subcategory.$dirty ? t('subcategory.dialog.notcategory') : null
                "
              />
            </div>
          </div>
          <div class="flex items-center w-full xm:block">
            <div class="space-y-2 mt-4 w-full">
              <uploadPhoto
                title="Изображения новости"
                placeholder="Загрузить изображение новости"
                v-model="data.cover"
                base_url="route/upload/news"
              />
            </div>
          </div>
          <div class="flex flex-col items-center w-full xm:block">
            <!-- Hashtag Input -->
            <div class="space-y-2 mt-4 w-full">
              <label class="block text-sm font-medium text-[#645A77]">Хештеги</label>
              <input 
                type="text" 
                v-model="hashtagInput"
                @input="fetchHashtags"
                @keydown.enter.prevent="addHashtag"
                placeholder="Нажмите Enter, чтобы добавить хештег..." 
                class="mt-1 block w-full px-3 text-[#645A77] py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-[#9E55EC] focus:outline-0"
              />
              <div v-if="suggestedHashtags.length" class="bg-white shadow-md border rounded mt-2 p-2">
                <p v-for="(tag, index) in suggestedHashtags" :key="index" 
                  @click="addHashtagFromSuggestion(tag)"
                  class="cursor-pointer hover:bg-gray-100 p-1 rounded">
                  #{{ tag }}
                </p>
              </div>
            </div>

            <!-- Ko'rsatilgan hashtaglar -->
            <div v-if="data.tags.length" class="mt-3 flex flex-wrap gap-2">
              <span 
                v-for="(tag, index) in data.tags" 
                :key="index"
                class="bg-[#F3EBFC] text-[#9E55EC] px-2 py-1 rounded-full text-sm flex gap-1"
              >
                #{{ tag }}
                <button @click="removeHashtag(index)" class="text-[#FF5558] hover:text-red-700">×</button>
              </span>
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


import { categoryStore } from '@/stores/data/categories'
const category_store = categoryStore()

import { subcategoryStore } from '@/stores/data/subcategories'
const subcategory_store = subcategoryStore()

import { tagStore } from '@/stores/data/hashtags'
const hashtags_store = tagStore()

import { newsStore } from '@/stores/data/news'
const store = newsStore()

import { useRouter } from 'vue-router'
const router = useRouter()



const data = ref({
  title: '',
  text: '',
  category: '',
  subcategory: '',
  cover: [],
  tags:[]
})


import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  category: { required },
  subcategory: { required },
  text: { required },
}
const v$ = useVuelidate(rules, data)




const hashtagInput = ref('')
const suggestedHashtags = ref([])

const fetchHashtags = async () => {
  if (hashtagInput.value.length > 1) {
    try {
      const response = await hashtags_store.getHashtags({ title: hashtagInput.value })
      console.log("sss", response);
      // Backendga hashtagni qidirish uchun so'rov yuboramiz
      // const response = await fetch(`/api/hashtags?query=${hashtagInput.value}`)
      // const result = await response.json()
      // suggestedHashtags.value = result.hashtags
    } catch (error) {
      console.error('Ошибка при получении хештегов:', error)
    }
  } else {
    suggestedHashtags.value = []
  }
}

const addHashtag = () => {
  const tag = hashtagInput.value.trim().replace(/\s+/g, '_')
  if (tag && !data.value.tags.includes(tag)) {
    data.value.tags.push(tag)
  }
  hashtagInput.value = ''
  suggestedHashtags.value = []
}

const addHashtagFromSuggestion = (tag) => {
  if (!data.value.tags.includes(tag)) {
    data.value.tags.push(tag)
  }
  hashtagInput.value = ''
  suggestedHashtags.value = []
}

const removeHashtag = (index) => {
  data.value.tags.splice(index, 1)
}






const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    console.log("ketayotgan daat", data.value );
    console.log("ketayotgan t",   );
    
    
    const payload = { ...data.value }
    await store.addNews(payload)
    router.push({ name: 'news' })
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
    category: '',
    subcategory: '',
    text: '',
    cover: [],
    tags: [],
  }
  v$.value.$reset()
}

const close = () => {
  router.push({ name: 'news' })
  clear()
}


watch(() => data.value.category, async (newCategory) => {
  if (newCategory) {
    await subcategory_store.getSubcategories({ category: newCategory });
  }
});



onMounted(async () => {
  await category_store.getCategories({ limit: 0 })
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