<template>
  <div class="gap-2 flex items-center">
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
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { biletStore } from '@/stores/data/bilet'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
const store = biletStore()

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
</script>
<style lang=""></style>