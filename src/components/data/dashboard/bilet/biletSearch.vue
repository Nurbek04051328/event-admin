<template>
  <div class="gap-2 flex items-center">
    <!-- <defaultSelect
      v-model="search.status"
      name="status"
      :options="statuses || []"
      option_title="value"
      placeholder="Выберите статус"
    />
    <filterSelect
      v-model="search.organizer"
      name="organizer"
      :options="organizer__store.organizer.data || []"
      option_title="lname name"
      placeholder="Выберите организер"
    /> -->
    <defaultSelect
      v-model="search.status"
      name="status"
      :options="statuses || []"
      option_title="value"
      placeholder="Выберите статус"
    />
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
// import { useRouter } from 'vue-router'
import { biletStore } from '@/stores/data/bilet'
import { ref } from 'vue'
const store = biletStore()

// Filter uchun ma'lumotlar
import { organizerStore } from '@/stores/user/organizer'
const organizer__store = organizerStore()

const search = ref({
  status: ''
})
// const router = useRouter()


const statuses = [
  {
    _id: 0,
    value: "В процессе",
  },
  {
    _id: 1,
    value: "Куплено",
  },
  {
    _id: 2,
    value: "Отказ",
  },
  {
    _id: 3,
    value: "Использовано",
  },
]



const findMe = async () => {
  await store.getBilets({
    ...search.value
  })
}

const clear = async() => {
  await store.getBilets({})
  search.value = {
    status:''
  }
}



onMounted(async () => {
  await organizer__store.getorganizers()
})
</script>
<style lang=""></style>