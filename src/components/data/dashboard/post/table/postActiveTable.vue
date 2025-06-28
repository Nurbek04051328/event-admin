<template>
  <div class="p-4 pb-0 w-full overflow-auto flex-1">
    <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
      <div v-if="posts.data.length" class="grid lg:grid-cols-3 grid-cols-6 md:grid-cols-2 gap-4">
        <div v-for="post of posts.data" :key="post._id" class="bg-white rounded-[16px] p-2 space-y-2">
          <div class="relative">
            <div
            @click="changeStatus(post._id)"
              :class="[
                'absolute z-10 cursor-pointer left-2 top-2 text-white px-2 py-1 rounded-md',
                postStatus.find((p) => p._id == post.status)?.class
              ]"
            >
              {{ postStatus.find((p) => p._id == post.status)?.title }}
            </div>
            <button
              class="edit-btn absolute right-2 top-2 z-10 size-8"
              @click="$router.push({ name: 'postEdit', params: { id: post._id } })"
            >
              <PencilIcon class="size-4" />
            </button>
            <swiper
              v-if="post?.posts?.length"
              :slides-per-view="1"
              :loop="post.posts.length > 1"
              class="rounded-[12px] overflow-hidden object-cover aspect-square"
            >
              <swiper-slide v-for="cover of post?.posts" :key="cover">
                <img :src="`${url}/${cover?.resizedPath}`" alt="" class="w-full h-80 object-cover" />
              </swiper-slide>
            </swiper>
            <div v-if="post?.event" class="absolute z-10 bottom-2 left-2 right-2 w-fit bg-gray-200 border border-gray-200 rounded-md px-1 py-1">
              {{ post?.event?.title }}
            </div>
          </div>
          <div class="cursor-pointer flex flex-col justify-between" @click="$router.push({ name: 'post-comments', params: { id: post?._id } })">
            <div class="flex items-center gap-1">
              <UserIcon class="size-4 text-gray-500" />
              <!-- <pre>{{ post }}</pre> -->
              <div class="font-semibold">{{ post?.user?.lname }} {{ post?.user?.name }}</div>
            </div>
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center gap-1">
                <CalendarIcon class="size-4 text-gray-500" />
                <div class="font-semibold">{{ moment(post?.createdAt).format('DD.MM.YYYY HH:mm') }}</div>
              </div>
              <div class="flex items-center gap-1">
                <EyeIcon class="size-4 text-gray-500" />
                <div class="font-semibold">{{ post?.views }}</div>
              </div>
            </div>
          </div>
          <!-- <div class="">
            <div class="text-sm">Описание</div>
            <div class="font-semibold description-text">{{ post.comment }}</div>
          </div> -->
        </div>
      </div>
      <div v-else class="flex mt-20 justify-center text-gray-500 text-xl h-full">
        Пока постов нет
      </div>
    </div>
    <PostStatus title="Поменять статус поста" @answer="answerStatus" v-model="toggle" />
  </div>
  <div class="pl-4 pb-2">
    <paginate
      v-if="store.posts.count > limit"
      v-model="page"
      :page-count="Math.ceil(store.posts.count / limit)"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :page-class="'page-item'"
      :container-class="'pagination_next shadow'"
    />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import paginate from 'vuejs-paginate-next'
import { useRouter } from 'vue-router'
const router = useRouter()
const url = import.meta.env.VITE_URL
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps(['options', 'page', 'limit'])

import { postStore } from '@/stores/data/post'
import { storeToRefs } from 'pinia'
const store = postStore()
const { posts } = storeToRefs(store)

const toggle = ref(false)
const _id = ref('')
import moment from 'moment'
import { CalendarIcon, EyeIcon, PencilIcon, UserIcon } from '@heroicons/vue/20/solid'
import PostStatus from '@/components/data/dashboard/post/postStatus.vue'
import { postStatus } from '@/helpers/vars'

const changeStatus = async (id) => {
  _id.value = id
  toggle.value = true
}

const answerStatus = async ({ answer, ...value }) => {
  if (answer) {
    await store.changeStatus({ _id: _id.value, ...value })
  }
  await getData()
  close()
}

const close = () => {
  toggle.value = false
  _id.value = ''
}



// Pagination
const page = ref(1)
const limit = ref(30)



const clickCallback = async (value) => {
  page.value = value
  await getData()
}




const getData = async () => {
  await store.getPosts({ limit: limit.value, page: page.value, status: 'active' })
}

onMounted(async () => {
  await getData()
})



</script>
<style>
.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>