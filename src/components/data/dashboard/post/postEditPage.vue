<template>
  <div class="h-[100%] overflow-hidden m-4 flex flex-col flex-1">
    <div class="flex items-center justify-between mb-4 ">
      <div class="flex items-center">
        <button  
          @click="$router.push({ name: 'posts' })" 
          class="w-[30px] h-[30px] rounded-full bg-[#F5F0FF] mr-[16px] flex justify-center items-center hover:bg-[#9E55EC] hover:text-white"
          >
            <ChevronLeftIcon class="size-7" />
        </button>
        <div as="h3" class="text-[22px] font-bold leading-6 text-[#483D5B]">
          Редактировать пост
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
          <div class="flex items-center w-full xm:block">
            <div class="space-y-2 mt-2 w-full">
              <QuillEditor  
                v-model:content="data.comment" 
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
                v-model="data.event"
                name="event"
                label="Выберите мероприятие"
                :options="event_store.events || []"
                option_title="title"
              />
            </div>
          </div>
          <div class="flex items-center w-full xm:block">
            <div class="space-y-2 mt-2 w-full">
              <uploadPhotos
                title="Изображения пост"
                placeholder="Загрузить изображение пост"
                v-model="data.posts"
                base_url="route/upload/post"
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
import uploadPhotos from '@/components/default/uploadPhotos.vue'

// Quill Editor import
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'


import { eventStore } from '@/stores/data/event'
const event_store = eventStore()




import { postStore } from '@/stores/data/post'
const store = postStore()

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


const data = ref({
  event: '',
  comment: '',
  posts:[]
})


import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  comment: { required },
  posts: { required },
}
const v$ = useVuelidate(rules, data)





const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    console.log("ketayotgan save daat", data.value );
    const payload = { ...data.value }
    await store.savePost(payload)
    router.push({ name: 'posts' })
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
  try {
    data.value = {
      event: '',
      comment: '',
      posts: [],
      _id: undefined // Add this to properly clear the ID
    }
    v$.value.$reset()
  } catch (error) {
    console.error('Error clearing data:', error)
  }
}

const close = async() => {
  try {
    // First clear the data
    clear()
    // Then navigate
    await router.push({ name: 'posts' })
  } catch (error) {
    console.error('Error closing:', error)
  }
}


onMounted(async () => {
  try {
    await event_store.getEvents({ limit: 0 })
    
    if (route.params.id) {
      const res = await store.getPost(route.params.id)
      if (res) {
        console.log("route.params.id", route.params.id);
        // Clear existing data first
        console.log("res.data", res);
        console.log("res.data", );
        clear()
        
        // Then set new data
        data.value = {
          ...res,
          _id: route.params.id,
          event: res?.event?._id || '',
          comment: res?.comment || '',
          posts: res?.posts || [],
          // posts: Array.isArray(res?.posts) ? [...res.posts] : [],
          // Add any other fields from res.data that you need
        }
      }
    }
  } catch (error) {
    console.error('Error loading data:', error)
    // If there's an error, ensure we close properly
    await close()
  }
})
</script>

<style>
  .custom-quill-editor {
    border: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    height: 600px; 
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