<template>
  <div class="space-x-2 flex items-center">
    <div class="w-[300px]">
      <default-input v-model="search.title" placeholder="Поиск по имени" @enter="findMe" />
    </div>
    <div>
      <filterSelect
        v-model="search.queryType"
        name="type"
        :options="eventTypes"
        option_title="title"
        :class="['w-full z-[99]'] "
        placeholder="Выберите статус"
        @change="findMe"
      />
    </div>
    <button class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg w-auto p-2" @click="clear">
      <XMarkIcon class="size-5" />
    </button>
    <button class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg w-auto p-2" @click="findMe">
      <MagnifyingGlassIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { eventStore } from '@/stores/data/event'
const store = eventStore()

const search = ref({
  title: '',
  queryType: ''
})
// const router = useRouter()


const eventTypes = [
  {
    _id: 'private',
    title: 'Приватные',
  },
  {
    _id: 'forAdult',
    title: 'Для взрослых',
  },
  {
    _id: 'forAll',
    title: 'Без возрастного ограничения',
  },
  {
    _id: 'upcoming',
    title: 'Предстоящее',
  },
  {
    _id: 'ongoing',
    title: 'Текущее',
  },
  {
    _id: 'completed',
    title: 'Завершенное',
  },
  {
    _id: 'canceled',
    title: 'Отмененное',
  },
  {
    _id: 'archive',
    title: 'Архивированное',
  },
  {
    _id: 'denied',
    title: 'Отказан',
  },
  {
    _id: 'approve',
    title: 'Подтвержденный',
  },
  {
    _id: 'process',
    title: 'В проверке',
  },
  {
    _id: 'allowSave',
    title: 'Разрешено сохранить',
  },
  {
    _id: 'allowShare',
    title: 'Разрешено поделиться',
  },
  {
    _id: 'free',
    title: 'Бесплатный',
  },
  {
    _id: 'notFree',
    title: 'Платный',
  },
  {
    _id: 'groupFalse',
    title: 'Без группы',
  },
  {
    _id: 'groupTrue',
    title: 'Есть группы',
  },
  {
    _id: 'hostTrue',
    title: 'Хост',
  },
  {
    _id: 'hostFalse',
    title: 'Не хост',
  },
  {
    _id: 'myselfSpend',
    title: 'Сам организатор',
  },
  {
    _id: 'teamSpend',
    title: 'С командой',
  },
]


const findMe = async () => {
  await store.getEvents({
    page: 1,
    ...search.value
  })
}

const clear = () => {
  search.value = { title: '',queryType: '' }
  findMe()
}
</script>
<style lang=""></style>