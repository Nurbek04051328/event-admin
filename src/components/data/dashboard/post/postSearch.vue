<template>
  <div>
    <!-- Mobile button  -->
    <div class="hidden items-center md:flex">
      <button
        class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg p-2 w-auto"
        @click="showFilter = true"
      >
        <MagnifyingGlassIcon class="size-5" />
      </button>
    </div>

    <!--Desktop: Inputs and buttons -->
    <div class="gap-2 flex items-center md:hidden">
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
      <button class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg w-auto p-2" @click="clear">
        <XMarkIcon class="size-5" />
      </button>
      <button class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg w-auto p-2" @click="findMe">
        <MagnifyingGlassIcon class="size-5" />
      </button>
    </div>

    <!--Mobile Filter Modal -->
    <transition name="fade">
      <div
        v-if="showFilter"
        class="fixed top-0 right-0 w-[50%] h-full bg-white z-50 flex flex-col p-4 xm:w-[80%] shadow-lg"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-[#483D5B]">Фильтр</h2>
          <button @click="clearModal" class="p-2 text-[#FF5558]">
            <XMarkIcon class="size-6" />
          </button>
        </div>

        <div class="flex flex-col space-y-4">
          <filterSelect
            v-model="search.user"
            name="user"
            :options="user__store.user.data || []"
            :option_title="[`name`, `lname`]"
            :class="['w-full z-[99]'] "
            placeholder="Выберите пользовател"
          />
          <filterSelect
            v-model="search.event"
            name="evet"
            :options="event__store.events || []"
            option_title="title"
            :class="['w-full z-[19]'] "
            placeholder="Выберите мероприятия"
          />

          <button
            class="bg-[#DCF7DD] text-[#119A21] hover:bg-[#119A21] hover:text-white rounded-lg py-2"
            @click="() => { findMe(); showFilter = false }"
          >
            Применить
          </button>
          <button
            class="bg-[#FFECD9] text-[#FF7E00] hover:bg-[#FF7E00] hover:text-white rounded-lg py-2"
            @click="() => { clear(); showFilter = false }"
          >
            Очистить
          </button>
        </div>
      </div>
    </transition>
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
  user: '',
  event: ''
})

const showFilter = ref(false)
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
    user: '',
    event: ''
  }
}

const clearModal = () => {
  showFilter.value = false
  search.value = {
    user: '',
    event: ''
  }
}

onMounted(async () => {
  await user__store.getUsers({ limit: 0, type:"all"})
  await event__store.getEvents()
})
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>