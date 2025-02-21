<template>
  <div class="divide-y-2 divide-gray-100 text-sm flex flex-col overflow-hidden">
    <!-- <pre>{{ store.logger.data[0] }}</pre> -->
    <div v-if="store.logger.data?.length > 0" class="flex flex-col overflow-hidden">
      <div class="overflow-auto">
        <div v-for="log of store.logger.data" :key="log._id" class="p-2 flex justify-between items-center" >
          <div> поменял права <span>{{ log?.user?.role == 'organizer'? 'Организатора' : "Пользователя"}}</span> 
            <span class="font-bold text-[#483D5B] ml-2">
              {{ log?.user?.lname }}
              {{ log?.user?.name }}
            </span>
            <span :class="actions.find((a) => a._id == log.lastChanged)?.class" class="mx-2">
              {{ actions.find((a) => a._id == log.lastChanged)?.label }}
            </span>
            на
            <span :class="actions.find((a) => a._id == log.action)?.class" class="mx-2">
              {{ actions.find((a) => a._id == log.action)?.label }}
            </span>
            в <span class="font-bold">{{ convertDateShort(log.createdAt, 'full') }}</span>
            <div v-if="log.description" class="text-xs mt-1">Примечение: {{ log.description }}</div>
          </div>
          <div class="mr-2">
            <a :href="`${url}/${log?.face}`" v-if="log?.face" target="_blank">
              <img  :src="`${url}/${log?.face}`" alt="user face photo" class="h-11 w-11 rounded-lg object-cover">
            </a>
            <div v-else>нет фото</div>
          </div>
        </div>
      </div>
      <div class="pl-4 pb-2">
          <paginate
            v-if="store.logger.count > limit"
            v-model="page"
            :page-count="Math.ceil(store.logger.count / limit)"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Пред'"
            :next-text="'След'"
            :page-class="'page-item'"
            :container-class="'pagination_next shadow'"
          />
      </div>
    </div>
    <div v-else class="text-center mt-14">
      Пока нет история
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const url = import.meta.env.VITE_URL
import paginate from 'vuejs-paginate-next'
// const props = defineProps(['page', 'limit'])
const route = useRoute()
const id = ref('')
const limit = ref(30)
const page = ref(1)

import { loggerStore } from '@/stores/user/logger'
const store = loggerStore()
import { convertDateShort } from '@/helpers/func'



const actions = [
  {
    _id: 'organizer',
    mode: 'organizer',
    label: 'Проверено',
    class: 'success-tag'
  },
  {
    _id: 'revoke',
    mode: 'organizer',
    label: 'Отказано',
    class: 'danger-tag'
  },
  {
    _id: 'pending',
    mode: 'organizer',
    label: 'В ожидание',
    class: 'warning-tag'
  },
  {
    _id: 'limited',
    mode: 'organizer',
    label: 'Органичен',
    class: 'primary-tag'
  },
  {
    _id: 'allow',
    mode: 'organizer',
    label: 'Активировано',
    class: 'success-tag'
  },
  {
    _id: 'adult',
    mode: 'user',
    label: 'Взрослый',
    class: 'success-tag'
  },
  {
    _id: 'minor',
    mode: 'user',
    label: 'Несовершеннолетный',
    class: 'warning-tag'
  }
]



const clickCallback = async (value) => {
  page.value = value
  await getLoggers()
}


const getLoggers = async () => {
  if (!id.value) return false
  await store.userLogger({
    limit: limit.value,
    page: page.value,
    actionFrom: id.value
  })
}

onMounted(() => {
  id.value = route.params.id
  getLoggers()
})
</script>
<style lang=""></style>
