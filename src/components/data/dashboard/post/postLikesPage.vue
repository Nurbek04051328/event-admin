<template>
  <div v-if="store.likes.data?.length > 0" class="flex flex-col overflow-hidden">
    <div class="w-full overflow-y-auto flex-1 text-[13px] px-4 py-2">
      <div v-for="like of store.likes.data" :key="like._id" class="p-2">
        <span class="font-bold text-[#2e2d30] mr-2"> {{ like?.user?.lname }} {{ like?.user?.name }} </span>
        <span class="font-bold text-[#645A77] mr-2"> поставил лайк </span>
        <span class="font-bold text-[#645A77] mr-2">- {{ convertDateShort(like?.createdAt, 'full') }} </span>
      </div>
    </div>
    <div class="pb-2">
      <paginate
        v-if="store.likes.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.likes.count / limit)"
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
  <div v-else class="text-center mt-14">Пока нет лайков</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import paginate from 'vuejs-paginate-next'
const route = useRoute()
const id = ref('')
const limit = ref(30)
const page = ref(1)

import { postStore } from '@/stores/data/post'
const store = postStore()
import { convertDateShort } from '@/helpers/func'

// import { convertDateShort } from '@/helpers/func'

const clickCallback = async (value) => {
  page.value = value
  await getData()
}

const getData = async () => {
  if (!id.value) return false
  await store.getLikePost(
    route.params.id,
    {
      limit: limit.value,
      page: page.value,
    }
  )
}

onMounted(() => {
  id.value = route.params.id
  getData()
})
</script>
<style lang=""></style>