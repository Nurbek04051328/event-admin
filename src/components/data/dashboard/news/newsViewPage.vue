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
          Страница новости
        </div>
      </div>
      <!-- <div class="flex gap-2">
        <div class="flex gap-2 items-center">
          <button type="button" class="close-btn mt-0 h-[40px] min-w-[100px] rounded-[16px]" @click="close">
            Отмена
          </button>
          <button type="button" class="send-btn rounded-[16px] h-[40px] min-w-[100px]" @click="send">Добавить</button>
        </div>
      </div> -->
    </div>
    <div class="grid grid-cols-12 gap-4 h-[100%] overflow-hidden">
      <div class="col-span-3 p-5 bg-white rounded-[16px] flex flex-col overflow-auto">
        <div v-if="data?.cover?.length > 0" class="flex w-full">
          <img :src="`${url}/${data?.cover?.at(0)}`" alt="" class="w-full rounded-[12px] object-center aspect-square cursor-pointer" />
        </div>
        <div class="flex w-full flex-col  mt-4" v-if="data?.author">
          <label class="block text-sm font-medium leading-6 text-[#99969f]">
            Создатель
          </label>
          <div class="flex items-center gap-1">
            <UserIcon class="size-6 mr-2 text-gray-400" />
            <div class="font-semibold">{{ data?.author?.lname }} {{ data?.author?.name }}</div>
          </div>
        </div>
        <div class="flex w-full mt-2" v-if="data?.category">
          <div class="space-y-1 w-full">
            <label class="block text-sm font-medium leading-6 text-[#99969f]">
              Категория
            </label>
            <div class="font-semibold">{{ data?.category }}</div>
          </div>
        </div>
        <div class="flex w-full mt-2" v-if="data?.subcategory">
          <div class="space-y-1 w-full">
            <label class="block text-sm font-medium leading-6 text-[#99969f]">
              Подкатегория
            </label>
            <div class="font-semibold">{{ data?.subcategory }}</div>
          </div>
        </div>
        <div class="flex w-full mt-2" v-if="data?.tags?.length > 0">
          <div class="space-y-1 w-full">
            <label class="block text-sm font-medium leading-6 text-[#99969f]">
              Теги
            </label>
            <div class="flex flex-wrap gap-2 mt-1">
              <div class="font-medium flex items-center bg-[#F3EBFC] rounded-md px-2 py-1 text-sm" v-for="tag in data?.tags" :key="tag">
                #{{ tag }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full mt-2" v-if="data?.status">
          <div class="space-y-1 w-full">
            <label class="block text-sm font-medium leading-6 text-[#99969f]">
              Статус
            </label>
            <div :class=" data?.status == 'active' ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-3 py-1 w-[70px] text-sm' : 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-3 py-1 w-[90px] text-sm'">{{ data?.status == 'active' ? "Актив" : "Не актив" }}</div>
          </div>
        </div>
        <div class="flex w-full flex-col mt-2"  v-if="data?.createdAt">
          <label class="block text-sm font-medium leading-6 text-[#99969f]">
            Дата создания
          </label>
          <div class="flex items-center gap-1 mt-1">
            <CalendarIcon class="size-5 mr-2 text-gray-400" />
            <div class="font-semibold">{{ moment(postInfo?.post?.createdAt).format('DD.MM.YYYY HH:mm') }}</div>      

          </div>
        </div>
      </div>
      <div class="col-span-9 bg-white rounded-[16px] flex flex-col overflow-hidden">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref, onMounted } from 'vue'
import 'swiper/css'
import { CalendarIcon, UserIcon } from '@heroicons/vue/20/solid'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import TabList from '@/components/default/tabList.vue'
const url = import.meta.env.VITE_URL




import { newsStore } from '@/stores/data/news'
const store = newsStore()



import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


const data = ref({})


const links = [
  {
    name: 'ru',
    title: 'Русский'
  },
  {
    name: 'en',
    title: 'English'
  },
  {
    name: 'uz',
    title: "O'zbekcha"
  }
]




onMounted(async () => {
  if(route.params.id) {
    const res = await store.getViewNews(route.params.id, 'ru')
    console.log("res", res);
    console.log("route", route);
    
    data.value = res
  }
})
</script>
<style>

</style>