<template>
  <ul role="list" class="divide-y divide-gray-100 w-full p-4">
    <li v-for="person in store.chatrooms.data" :key="person" class="relative flex justify-between gap-x-6 py-4">
      <div class="relative flex justify-between gap-x-6" v-if="person?.participants.filter(participant => participant.role === role).length > 0 || role == 'all'">
        <div class="flex flex-1 gap-x-4" >
          <div
            class="h-12 w-12 flex-none rounded-full flex items-center justify-center text-white font-bold"
            :style="person.img ? '' : { backgroundColor: randomColor(person.userName) }"
          >
            <img
              v-if="person.cover.length > 0"
              class="h-12 w-12 flex-none rounded-full bg-gray-50"
              :src="`${url}/${person?.cover[0]}`"
              alt="Profile image"
            />
            <span v-else>
              {{ person.userName.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              <router-link :to="{ name: 'showChat', params: { id: person._id } }" class="cursor-pointer">
                <span class="absolute inset-x-0 -top-px bottom-0" />
                {{ person?.userName }}
              </router-link>
            </p>
            <p class="mt-1 flex text-xs leading-5 text-gray-500">
              <a :href="`mailto:${person.email}`" class="relative truncate hover:underline">
                Ohirgi gapi xabarni...
              </a>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-x-4">
          <div class="sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
            <p v-if="person % 2 == 0" class="mt-1 text-xs leading-5 text-gray-500">
              Last seen <time :datetime="new Date()">{{ new Date().toLocaleDateString() }}</time>
            </p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
              <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p class="text-xs leading-5 text-gray-500">Online</p>
            </div>
          </div>
          <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { onMounted } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
const props = defineProps(['role'])
import { messageStore } from '@/stores/data/message'
const store = messageStore()
const url = import.meta.env.VITE_URL

const getData = async () => {
  if(props.role == 'all') {
    await store.getChatrooms()
  } else {
    await store.getChatrooms({role:props.role})
  }
}

const randomColor = (name) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#C70039', '#581845', '#2ECC71'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

onMounted(async () => {
  await getData()
})
</script>
<style lang=""></style>