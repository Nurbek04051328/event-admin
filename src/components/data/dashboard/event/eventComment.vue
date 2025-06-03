<template>
  <div v-if="comments.length > 0" class="flex flex-col overflow-hidden">
    <div class="w-full overflow-y-auto flex-1 text-[13px]">
      <div
        v-for="(item, reviewIdx) in comments"
        :key="item._id"
        class="gap-4 text-sm text-gray-500"
        :class="[reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-2']"
      >
        <h3
          @click="$router.push({ name: 'user-wallet', params: { id: item?.user?._id } })"
          class="font-medium text-[#483D5B] cursor-pointer"
        >
          {{ item?.user?.lname }} {{ item?.user?.lname }}
        </h3>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <StarIcon
              v-for="rating in [0, 1, 2, 3, 4]"
              :key="rating"
              :class="[
                item.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                'h-5 w-5 flex-shrink-0'
              ]"
              aria-hidden="true"
            />
          </div>
          <div>
            {{ convertDateShort(item?.createdAt, 'full') }}
          </div>
        </div>
        <div v-if="item.files?.length > 0" class="mt-2 flex gap-2">
          <div v-for="(image, index) of item.files" :key="index" class="flex gap-2">
            <img
              :src="`${url}/${image.resizedPath}`"
              alt="comment image"
              class="object-contain w-[40px] h-[40px] size-full cursor-pointer rounded-md"
              @click="openFaceBox(image?.outputPath, $event)"
            />
          </div>
        </div>
        <div class="prose prose-sm mt-1 max-w-none text-gray-500" v-html="item?.comment" />
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-5">Комментариев пока нет</div>
  <VueEasyLightbox
    :visible="visible"
    :imgs="[currentImage]"
    @hide="closeFaceBox"
  />
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { convertDateShort } from '@/helpers/func'
import { StarIcon } from '@heroicons/vue/20/solid'
import { eventStore } from '@/stores/data/event'
import VueEasyLightbox from 'vue-easy-lightbox';
const store = eventStore()
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
const { comments } = storeToRefs(store)
const url = import.meta.env.VITE_URL


// Lightbox holati
const visible = ref(false);
const currentImage = ref('');

const openFaceBox = (imageUrl, event) => {
  event.stopPropagation();
  currentImage.value = `${url}/${imageUrl}`;
  visible.value = true;
};

// Lightboxni yopish funksiyasi
const closeFaceBox = () => {
  visible.value = false;
  currentImage.value = '';
};


onMounted(async () => {
  await store.getComments(route.params.id)
})
</script>
<style lang=""></style>
