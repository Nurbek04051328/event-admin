<template>
  <div class="gap-2 flex items-center">
    <filterSelect
      v-model="search.user"
      name="user"
      :options="user__store.user.data || []"
      :option_title="[`name`, `lname`]"
      :class="['w-full z-[99]'] "
      placeholder="Выберите пользовател"
      @change="findMe"
    />
    <filterSelect
      v-model="search.event"
      name="evet"
      :options="event__store.events || []"
      option_title="title"
      :class="['w-full z-[99]'] "
      placeholder="Выберите мероприятия"
      @change="findMe"
    />
    <!-- <filterSelect
      v-model="search.status"
      name="status"
      :options="postStatus || []"
      option_title="title"
      :class="['w-full z-[99]'] "
      placeholder="Выберите статус"
      @change="findMe"
    /> -->
    <button class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg w-auto p-2" @click="clear">
      <XMarkIcon class="size-5" />
    </button>
    <button class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg w-auto p-2" @click="findMe">
      <MagnifyingGlassIcon class="size-5" />
    </button>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { postStatus } from '@/helpers/vars'
import { postStore } from '@/stores/data/post'
import { ref } from 'vue'
const store = postStore()

// Filter uchun ma'lumotlar
import { usersStore } from '@/stores/data/users'
const user__store = usersStore()
import { eventStore } from '@/stores/data/event'
const event__store = eventStore()

const search = ref({
  status: '',
  user: '',
  event: ''
})
// const router = useRouter()



const findMe = async () => {
  console.log('search.value', search.value)
  await store.getPosts({
    ...search.value
  })
}

const clear = async() => {
  await store.getPosts({})
  search.value = {
    status:'',
    user: '',
    event: ''
  }
}



onMounted(async () => {
  await user__store.getUsers({ limit: 0, type:"all"})
  await event__store.getEvents()
})
</script>
<style lang=""></style>