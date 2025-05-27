<template>
  <div v-if="store.comments.data?.length > 0" class="flex flex-col overflow-hidden w-full">
    <div class="w-full overflow-y-auto flex-1 text-[13px] px-4 py-2">
      <div v-for="comment of store.comments.data" :key="comment._id" class="p-2 w-full">
        <div class="flex items-center gap-2 mb-2 w-full">
          <img
            v-if="comment?.cover?.length > 0"
            :src="`${url}/comment?.cover[0]`"
            class="w-8 h-8 rounded-full object-cover"
            alt="avatar"
          />
          <img
            v-else
            src="@/assets/images/not-user.png"
            class="w-8 h-8 rounded-full object-cover"
            alt="avatar"
          />
          <div>
            <div class=" flex justify-between "> 
              <div class="font-bold text-[#2e2d30]">
                {{ comment?.author?.lname }} {{ comment?.author?.name }}
              </div>
              <div class="ml-4">
                {{ convertDateShort(comment?.createdAt) }}
              </div>
            </div>
            <div class="font-bold text-[#847997]"> <pre>{{ comment?.comment }}</pre> </div>
          </div>

        </div>
        <!-- купил
        <span 
          class="mr-2"
          :class="ticket.status == 0 ? 'bg-[#FFECD9] text-[#FF7E00] rounded-lg px-2':
            ticket.status == 1 ? 'bg-[#DCF7DD] text-[#119A21] rounded-lg px-2': 
            ticket.status == 2 ? 'bg-[#FFE6E6] text-[#FF5558] rounded-lg px-2': 'bg-[#F5F1FB] text-[#9E55EC] rounded-lg px-2'
            "
        >
          {{ ticket.status == 0 ? 'Ожидание транзакции' : '' }}
          {{ ticket.status == 1 ? 'Успешно приобретен' : '' }}
          {{ ticket.status == 2 ? 'Возврат/Отменен' : '' }}
        </span> на
        <span class="font-bold text-[#9E55EC]">
          {{ ticket.event?.title }}
        </span>
        <span v-if="ticket.entryFee == 0" class="font-bold"> бесплатно </span>
        <span v-if="ticket.entryFee > 0" class="font-bold"
          >по сумме {{ ticket.entryFee }} сум
        </span>

        в
        <span class="font-bold">
          {{ convertDateShort(ticket.updatedAt, 'full') }}
        </span> -->
      </div>
    </div>
    <div class="pb-2">
      <paginate
        v-if="store.comments.count > limit"
        v-model="page"
        :page-count="Math.ceil(store.comments.count / limit)"
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
  <div v-else class="text-center mt-14">Пока нет комментариев</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import paginate from 'vuejs-paginate-next'
const url = import.meta.env.VITE_URL
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
  await store.getCommentsPosts(
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
