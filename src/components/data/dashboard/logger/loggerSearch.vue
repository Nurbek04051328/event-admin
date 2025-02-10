<template>
  <div class="space-x-2 flex items-center">
    <defaultSelect
      v-model="search.status"
      name="status"
      :options="statuses || []"
      option_title="value"
      placeholder="Выберите статус"
    />
    <button class="edit-btn w-auto px-3 py-3  xm-max:px-[10px] xm-max:py-[8px]" @click="clear">
      <XMarkIcon class="size-4" />
    </button>
    <button class="success-btn w-auto px-3 py-3 xm-max:px-[10px] xm-max:py-[8px]" @click="findMe">
      <MagnifyingGlassIcon class="size-4" />
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
  search.value = {}
}
</script>
<style lang=""></style>