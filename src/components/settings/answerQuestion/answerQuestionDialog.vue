<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all  w-[60%]"
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
        {{ edit ? 'Редактировать вопрос ответа' : 'Новая вопрос ответа' }}
      </DialogTitle>
      <div class="space-y-2 mt-4">
        <default-textarea
          v-model="data.question"
          name="question"
          label="Вопрос"
          :error="v$.question?.$invalid && v$.question?.$dirty"
        />
      </div>
      <div class="space-y-2 mt-2 w-full">
        <label class="block text-sm font-medium leading-6 text-[#645A77]">
          Ответ
        </label>
        <QuillEditor  
          v-model:content="data.answer" 
          contentType="html" 
          :options="editorOptions"
          class="custom-quill-editor"
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
// Изображение категории Загрузить изображение категории
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const { toggle, id, lang } = storeToRefs(usefull)

// Quill Editor import
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

defineProps(['options'])

const data = ref({
  question: '',
  answer: '',
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  question: { required },
  answer: { required },
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { answerQuestionStore } from '@/stores/data/answerQuestion'
const answerQuestion_store = answerQuestionStore()


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



const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      await answerQuestion_store.saveAnswerQuestion({ ...data.value }, t)
    } else {
      await answerQuestion_store.addAnswerQuestion({ ...data.value }, t)
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
      const res = await answerQuestion_store.getAnswerQuestion(id.value, lang.value)
      console.log("res", res.data);
      
      edit.value = true
      data.value = {
        ...res.data,
        _id: id.value,
        question: res.data?.question || '',
        answer: res.data?.answer || ''
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
      question: '',
      answer: '',
    }
    v$.value.$reset()
    edit.value = false 
  }
)

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    question: '',
    answer: ''
  }
  v$.value.$reset()
  edit.value = false 
}
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