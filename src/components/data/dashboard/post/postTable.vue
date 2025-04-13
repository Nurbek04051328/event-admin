<template>
  <div class="flex-1 h-full w-full overflow-auto rounded-[16px]">
    <div class="grid lg:grid-cols-3 grid-cols-6 md:grid-cols-2 gap-4">
      <div v-for="post of posts.data" :key="post._id" class="bg-white rounded-[16px] p-2 space-y-2">
        <div class="relative">
          <div
            :class="[
              'absolute z-10  left-2 top-2 text-white px-2 py-1 rounded-md',
              postStatus.find((p) => p._id == post.status)?.class
            ]"
          >
            {{ postStatus.find((p) => p._id == post.status)?.title }}
          </div>
          <button
            class="edit-btn absolute right-2 top-2 z-10 size-8"
            @click="changeStatus(post._id)"
          >
            <PencilIcon class="size-4" />
          </button>
          <swiper
            v-if="post?.posts?.length"
            :slides-per-view="1"
            :loop="true"
            class="rounded-[12px] overflow-hidden object-cover aspect-square"
          >
            <swiper-slide v-for="cover of post.posts" :key="cover">
              <img :src="`${url}/${cover?.resizedPath}`" alt="" class="w-full h-80 object-cover" />
            </swiper-slide>
          </swiper>
        </div>

        <div class="flex items-center gap-1">
          <UserIcon class="size-4 text-gray-500" />
          <div class="font-semibold">{{ post.user?.lname }} {{ post.user?.name }}</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <CalendarIcon class="size-4 text-gray-500" />
            <div class="font-semibold">{{ moment(post.createdAt).format('DD.MM.YYYY HH:mm') }}</div>
          </div>
          <div class="flex items-center gap-1">
            <EyeIcon class="size-4 text-gray-500" />
            <div class="font-semibold">{{ post.sequence }}</div>
          </div>
        </div>
        <div class="">
          <div class="text-sm">Описание</div>
          <div class="font-semibold">{{ post.comment }}</div>
        </div>
      </div>
    </div>
  </div>
  <PostStatus title="Поменять статус поста" @answer="answerStatus" v-model="toggle" />
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const url = import.meta.env.VITE_URL
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toggle = ref(false)
defineProps(['options', 'page', 'limit'])

import { postStore } from '@/stores/data/post'
import { storeToRefs } from 'pinia'
const store = postStore()
const { posts } = storeToRefs(store)

const _id = ref('')
import moment from 'moment'
import { CalendarIcon, EyeIcon, PencilIcon, UserIcon } from '@heroicons/vue/20/solid'
import PostStatus from './postStatus.vue'
import { postStatus } from '@/helpers/vars'

const changeStatus = async (id) => {
  _id.value = id
  toggle.value = true
}

const answerStatus = async ({ answer, ...value }) => {
  if (answer) {
    await store.changeStatus({ _id: _id.value, ...value })
  }
  close()
}

const close = () => {
  toggle.value = false
  _id.value = ''
}
</script>
<style lang=""></style>
