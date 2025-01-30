<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <div class="text-base font-medium">Список комментарий</div>
    <div v-if="comments.length > 0" class="space-y-2 flex-1 overflow-auto">
      <div v-for="(item, reviewIdx) in comments" :key="item._id" class="flex space-x-4 text-sm text-gray-500">
        <div class="flex-none py-10">
          <img src="@/assets/images/not-user.jpg" alt="" class="h-10 w-10 rounded-full bg-gray-100" />
        </div>
        <div :class="[reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10']">
          <h3
            @click="$router.push({ name: 'user-logger', params: { id: item?.user?._id } })"
            class="font-medium text-gray-900 cursor-pointer"
          >
              {{ item?.user?.lname }} {{ item?.user?.lname }}
          </h3>
          <p>
            <time >{{ convertDateShort(item?.createdAt, 'full') }}</time>
          </p>

          <div class="mt-4 flex items-center">
            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[item.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
          </div>
          <p class="sr-only">{{ item.rating }} out of 5 stars</p>

          <div class="prose prose-sm mt-4 max-w-none text-gray-500" v-html="item?.comment" />
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-5">Комментариев пока нет</div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { convertDateShort } from '@/helpers/func'
import { StarIcon } from '@heroicons/vue/20/solid'
import { eventStore } from '@/stores/data/event';
const store = eventStore();
const url = import.meta.env.VITE_URL
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
const { comments } = storeToRefs(store);


onMounted(async() => {
  await store.getComments(route.params.id)
})
</script>
<style lang=""></style>