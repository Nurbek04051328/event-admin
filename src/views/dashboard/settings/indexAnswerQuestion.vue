<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <head-part
      :count="answerQuestion_store.answerQuestionsCount"
    >
    </head-part>
    <div class="p-4 pb-0 w-full overflow-auto flex-1">
      <AnswerQuestionTable
        :options="{
          languages
        }"
        :page="page" :limit="limit"
      />
      <AnswerQuestionDialog
        :options="{
          languages
        }"
      />
    </div>
  </div>
  
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AnswerQuestionTable from '@/components/settings/answerQuestion/answerQuestionTable.vue'
import AnswerQuestionDialog from '@/components/settings/answerQuestion/answerQuestionDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)


const page = ref(1)
const limit = ref(30)

import { answerQuestionStore } from '@/stores/data/answerQuestion'
const answerQuestion_store = answerQuestionStore()

onMounted(async () => {
  try {
    await language_store.getlanguages({ limit: 0 })
    await answerQuestion_store.getAnswerQuestions({ limit: limit.value, page: page.value })
  } catch (err) {
    console.error('Mounted error:', err)
  }
})
</script>
<style lang=""></style>
