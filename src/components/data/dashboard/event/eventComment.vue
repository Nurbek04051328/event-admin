<template>
  <div v-if="comments.length > 0" class="flex flex-col overflow-hidden">
    <div class="w-full overflow-y-auto flex-1 text-[13px]">
      <div v-for="(item, reviewIdx) in comments" :key="item._id" class="grid grid-cols-6 gap-4 space-x-1 text-sm text-gray-500" :class="[reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-2']">
        <div class="col-span-1 flex items-center" >
          <div class="flex items-center justify-center py-[7px] px-[10px] rounded-full bg-[#F3EBFC]">

            <img src="@/assets/images/header-user.svg" alt="" class="h-8 w-6  inline-block" />
          </div>
        </div>
        <div class="col-span-5">
          <h3
            @click="$router.push({ name: 'user-wallet', params: { id: item?.user?._id } })"
            class="font-medium text-[#483D5B] cursor-pointer"
          >
              {{ item?.user?.lname }} {{ item?.user?.lname }}
          </h3>
          <!-- <p>
            <time >{{ convertDateShort(item?.createdAt, 'full') }}</time>
          </p> -->

          <div class="mt-2 flex items-center justify-between w-full" >
            <div class="flex items-center">
              <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[item.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
            </div>
            <div>
              <p>
                <time >{{ convertDateShort(item?.createdAt, 'full') }}</time>
              </p>
            </div>
          </div>
          <p class="sr-only">{{ item.rating }} out of 5 stars</p>

          <div class="prose prose-sm mt-4 max-w-none text-gray-500" v-html="item?.comment" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-5">Комментариев пока нет</div>
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