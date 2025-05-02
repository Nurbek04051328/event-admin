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
          Страница поста
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
      
      <div class="col-span-6 p-5 bg-white rounded-[16px] flex flex-col overflow-hidden">
        
        <div class="h-full flex flex-col flex-1 overflow-auto">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-5 flex w-full">
              <swiper
                v-if="postInfo?.post?.posts?.length"
                :slides-per-view="1"
                :loop="true"
                class="rounded-[12px] overflow-hidden object-cover aspect-square"
              >
                <swiper-slide v-for="cover of postInfo?.post?.posts" :key="cover">
                  <img :src="`${url}/${cover?.resizedPath}`" alt="" class="w-full h-auto object-center cursor-pointer" />
                </swiper-slide>
              </swiper>
            </div>
            <div class="col-span-7 flex flex-col w-full text-base">
              <div class="flex w-full" v-if="postInfo?.post?.event">
                <div class="space-y-1 w-full">
                  <label class="block text-sm font-medium leading-6 text-[#99969f]">
                    Мероприятие
                  </label>
                  <div class="font-semibold">{{ postInfo?.post?.event?.title }}</div>
                </div>
              </div>
              <div class="flex w-full flex-col space-y-2 mt-5" v-if="postInfo?.post?.user">
                <label class="block text-sm font-medium leading-6 text-[#99969f]">
                  Создатель
                </label>
                <div class="flex items-center gap-1 mt-1">
                  <UserIcon class="size-6 mr-2 text-gray-400" />
                  <div class="font-semibold">{{ postInfo?.post?.user?.lname }} {{ postInfo?.post?.user?.name }}</div>
                </div>
              </div>
              <div class="flex w-full flex-col mt-5">
                <label class="block text-sm font-medium leading-6 text-[#99969f]">
                  Дата создания
                </label>
                <div class="flex items-center gap-1 mt-1">
                  <CalendarIcon class="size-6 mr-2 text-gray-400" />
                  <div class="font-semibold">{{ moment(postInfo?.post?.createdAt).format('DD.MM.YYYY HH:mm') }}</div>      
    
                </div>
              </div>
              <div class="flex w-full flex-col  mt-7">
                <div class="flex items-center gap-4 mt-1">
                  <div  class="flex items-center gap-1">
                    <EyeIcon class="size-6 text-gray-400" />
                    <div class="font-semibold text-lg">{{ postInfo?.views }}</div>
                  </div>
                  <div  class="flex items-center gap-1">
                    <HeartIcon class="size-6 text-gray-400" />
                    <div class="font-semibold text-lg">{{ postInfo?.likes }}</div>
                  </div>
                  <div  class="flex items-center gap-1">
                    <ChatBubbleOvalLeftIcon class="size-6 text-gray-400" />
                    <div class="font-semibold text-lg">{{ postInfo?.comments}}</div>
                  </div>
                </div>
              </div>
          </div>
          <!-- <pre>{{ postInfo }}</pre> -->
            
          </div>
          <div class="flex items-center w-full mt-5">
            <div class="space-y-2  w-full">
              <label class="block text-base font-medium leading-6 text-[#99969f]">
                Техт
              </label>
              <div v-html="postInfo?.post?.comment" class="prose max-w-none text-base"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-6 bg-white rounded-[16px] flex flex-col overflow-hidden">
        <TabList :list="links" />
        <router-view />
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { CalendarIcon, EyeIcon, UserIcon, ChevronLeftIcon, ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/vue/20/solid'

import moment from 'moment'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const url = import.meta.env.VITE_URL
import TabList from '@/components/default/tabList.vue'



import { eventStore } from '@/stores/data/event'
const event_store = eventStore()




import { postStore } from '@/stores/data/post'
const store = postStore()

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


let postInfo = ref({})


const links = [
  {
    name: 'post-comments',
    title: 'Комментарии'
  },
  {
    name: 'post-likes',
    title: 'Лайки'
  },
  {
    name: 'post-views',
    title: 'Просмотры'
  }
]



onMounted(async () => {
  if(route.params.id) {
    postInfo.value = await store.getInfoPost(route.params.id)
    const res1 = await store.getViewPost(route.params.id)
    const res2 = await store.getLikePost(route.params.id)
  }
})
</script>
<style>

</style>