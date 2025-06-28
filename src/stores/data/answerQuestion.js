import { ref  } from 'vue'
import { defineStore } from 'pinia'
import { useNotification } from '../usefull/notification'
import api from '@/helpers/api'

const base_url = '/answer-questions'

export const answerQuestionStore = defineStore('answerQuestionStore', () => {
  const answerQuestions = ref([])
  const answerQuestionsCount = ref(0)
  const notification = useNotification()

  const getAnswerQuestions = async (params) => {
    console.log(params);
    
    const { data } = await api.get(base_url, {params})
console.log(data);

    answerQuestions.value = data?.items;
    answerQuestionsCount.value = data?.count;
  }

  const addAnswerQuestion = async (answerQuestion, t) => {
    console.log("answwer",answerQuestion);
    
    const { data } = await api.post(base_url, answerQuestion)
    console.log("data",data);
    
    answerQuestions.value = [data,...answerQuestions.value]
    answerQuestionsCount.value += 1
    notification.setNotif(true, t('story.add'), 'success')
  }

  const removeAnswerQuestion = async (id, t) => {
    await api.delete(`${base_url}/${id}`)
    answerQuestions.value = answerQuestions.value.filter((item) => item._id !== id)
    answerQuestionsCount.value > 0 ? (answerQuestionsCount.value -= 1) : 0
    notification.setNotif(true, t('story.delete'), 'info')
  }

  const saveAnswerQuestion = async (category, t) => {
    const { data } = await api.put(`${base_url}`, category)
    answerQuestions.value = answerQuestions.value.map((pay) => {
      if (pay._id == data._id) return data
      return pay
    })
    notification.setNotif(true, t('story.update'), 'info')
  }

  const getAnswerQuestion = async (id, language) => {
    return await api.get(`${base_url}/${id}/${language}`)
  }

  const changeStatus = async (id, status) => {
      let {data} = await api.get(`${base_url}/status/${id}/${status}`)
      if (data) {
        answerQuestions.value = answerQuestions.value.map(reg => {
          if (reg._id == id) return {
              ...reg,
              status: status
          }
          return reg
        })
      }
    }


  return {
    answerQuestions,
    answerQuestionsCount,
    getAnswerQuestions,
    addAnswerQuestion,
    removeAnswerQuestion,
    saveAnswerQuestion,
    getAnswerQuestion,
    changeStatus
  }
})