<template>
  <default-modal @close="close">
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[50%] lg:w-[80%]  xm:w-[100%]"
    >
      <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button
          type="button"
          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
          @click="close"
        >
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
        {{ edit ? $t('worker.dialog.edit') : $t('worker.dialog.title') }}
      </DialogTitle>
      <div class="flex w-full xm:block">
        <div class="space-y-2 mt-4 w-full mr-1">
          <default-input
            v-model="data.lname"
            name="lname"
            :label="t('worker.dialog.lname')"
            :error="v$.lname.$invalid && v$.lname.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <default-input
            v-model="data.name"
            name="name"
            :label="t('worker.dialog.name')"
            :error="v$.name.$invalid && v$.name.$dirty"
          />
        </div>
      </div>
      <div class="flex w-full xm:block">
        <div class="space-y-2 mt-4 w-full mr-1">
          <phone-maska
            v-model="data.phone"
            name="phone"
            :label="t('worker.dialog.phone')"
            :error="v$.phone.$invalid && v$.phone.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <default-select
            v-model="data.role"
            name="role"
            :label="t('worker.dialog.role')"
            :options="roles || []"
            option_title="title"
            :error="v$.role.$invalid && v$.role.$dirty"
            @change="changeRole(data.role)"
          />
        </div>
      </div>
      <div class="flex w-full xm:block" v-if="isManager" >
        <div class="space-y-2 mt-4 w-full mr-1">
          <array-select
            v-model="data.categories"
            name="categories"
            :label="t('worker.dialog.category')"
            @input="filterSubcat(data.categories)"
            :options="categories || []"
            option_title="title"
            :error="v$.categories?.$invalid && v$.categories?.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <array-select
            v-model="data.subcategories"
            name="subcategories"
            :label="t('worker.dialog.subcategory')"
            :options="subcategories || []"
            option_title="title"
          />
        </div>
      </div>

      <div class="flex w-full xm:block">
        <div class="space-y-2 mt-4 w-full mr-1">
          <default-input
            v-model="data.login"
            name="login"
            :label="t('worker.dialog.login')"
            :error="v$.login.$invalid && v$.login.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-1">
          <default-input
            v-model="data.password"
            name="password"
            :label="t('worker.dialog.password')"
            :error="v$.password?.$invalid && v$.password?.$dirty"
          />
        </div>
      </div>

      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn mt-0" @click="close">
          {{ $t('worker.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">{{ $t('worker.dialog.save') }}</button>
      </div>
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const edit = ref(false)
const { toggle, id } = storeToRefs(usefull)
defineProps(['options'])

const isManager = ref(false)
const changeRole = async (role) => {
  if (role == 'moderator') isManager.value = true
  else isManager.value = false
}

const data = ref({
  name: '',
  lname: '',
  phone: '',
  // email: '',
  login: '',
  password: '',
  role: '',
  categories: [],
  subcategories: []
})

const roles = [
  {
    _id: 'manager',
    title: 'manager'
  },
  {
    _id: 'moderator',
    title: 'moderator'
  }
]

import { required, minLength } from '@vuelidate/validators'

const rules = computed(() => {
  const baseRules = {
    name: { required },
    lname: { required },
    phone: { required },
    login: { required },
    role: { required }
  }
  if (data.value.role === 'moderator') {
    baseRules.categories = { required }
  }
  if (!edit.value) {
    baseRules.password = {
      required,
      minLength: minLength(5, { message: t('worker.dialog.password_min_length') })
    }
  } else if (data.value.password) {
    // Tahrirlashda faqat agar parol kiritilgan bo'lsa
    baseRules.password = {
      minLength: minLength(5, { message: t('worker.dialog.password_min_length') })
    }
  }
  return baseRules
})
import { useVuelidate } from '@vuelidate/core'
const v$ = useVuelidate(rules, data)

import { workerStore } from '@/stores/data/workers'
import { subcategoryStore } from '@/stores/data/subcategories'
import { categoryStore } from '@/stores/data/categories'
const store = workerStore()
const category_store = categoryStore()
const subcategory_store = subcategoryStore()
const { categories } = storeToRefs(category_store)
const { subcategories } = storeToRefs(subcategory_store)

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    const payload = { ...data.value }

    // Agar role `manager` bo'lsa va categories yoki subcategories bo'sh bo'lsa, ularni o'chirib tashlaymiz
    if (data.value.role === 'manager') {
      if (!data.value.categories.length) delete payload.categories
      if (!data.value.subcategories.length) delete payload.subcategories
    }
    if (data.value.role === 'moderator') {
      if (!data.value.subcategories.length) delete payload.subcategories
    }
    if (edit.value && !data.value.password) {
      console.log('kirdi')

      delete payload.password
      console.log('chiqdi', payload)
    }
    if (edit.value) {
      console.log('pay', payload)

      await store.saveWorker(payload, t)
    } else {
      await store.addWorker(payload, t)
    }
    // close()
  } else {
    console.log(data.value)
  }
}
const filterSubcat = async (selectedCategories) => {
  data.value.subcategories = subcategories.value.filter((subcategory) =>
    selectedCategories.includes(subcategory.categoryId)
  )
  await subcategory_store.getSubcategories({
    category: { $in: selectedCategories },
    type: true
  })
}
const clear = () => {
  data.value = {
    name: '',
    lname: '',
    phone: '',
    // email: '',
    login: '',
    password: '',
    role: '',
    categories: [],
    subcategories: []
  }
  v$.value.$reset()
}
const close = () => {
  usefull.setToggle(false, 0)
  clear()
}

watch(
  () => id?.value,
  async () => {
    if (id?.value) {
      const res = await store.getWorker(id.value)
      edit.value = true
      if (res.data.role == 'moderator') isManager.value = true
      else isManager.value = false
      console.log(res.data)

      data.value = {
        ...res.data,
        _id: id.value,
        categories: res.data?.categories || [],
        subcategories: res.data?.subcategories || []
      }
    }
  }
)

watch(
  () => toggle.value,
  async () => {
    if (!toggle.value) clear()
  }
)

watch(
  () => data.value.categories,
  (newCategories) => {
    if (data.value.categories.length > 0) {
      filterSubcat(newCategories)
    }
  }
)
</script>
