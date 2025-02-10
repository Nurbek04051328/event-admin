<template>
  <div class="flex-1 h-full w-full overflow-auto">
    <div class="flex mt-6 ml-3">
        <button  @click="$router.push({ name: 'workers' })">
          <ArrowLongLeftIcon class="size-5 mr-3" />
        </button>
        <div as="h3" class="text-lg font-semibold leading-6 text-gray-900">
          {{ $t('worker.dialog.edit') }}
        </div>
      </div>
    <div class="p-8 w-[55%] m-auto">
      
      <div class="flex w-full xm:block">
        <div class="space-y-2 mt-4 w-full mr-3">
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
        <div class="space-y-2 mt-4 w-full mr-3">
          <phone-maska
            v-model="data.phone"
            name="phone"
            :label="t('worker.dialog.phone')"
            :error="v$.phone.$invalid && v$.phone.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-3">
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
        <div class="space-y-2 mt-4 w-full mr-3">
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
        <div class="space-y-2 mt-4 w-full mr-3">
          <default-input
            v-model="data.login"
            name="login"
            :label="t('worker.dialog.login')"
            :error="v$.login.$invalid && v$.login.$dirty"
          />
        </div>
        <div class="space-y-2 mt-4 w-full ml-3">
          <default-input
            v-model="data.password"
            name="password"
            :label="t('worker.dialog.password')"
            :error="v$.password?.$invalid && v$.password?.$dirty"
          />
        </div>
      </div>

      <div class="mt-7 mb-2 text-lg  text-gray-700 font-medium">Доступы</div>
      <div class="flex w-full xm:block">
        <div class="space-y-4 mt-2 w-full mr-3">
          <div>
            Организаторы:
          </div>
          <div class="text-sm space-y-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="show"  type="checkbox" v-model="organizer.show" />
              <span class="hover:text-[#9E55EC]">Просмотр</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="status"  type="checkbox" v-model="organizer.status" />
              <span class="hover:text-[#9E55EC]">Менять статус</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="metric"  type="checkbox" v-model="organizer.metric" />
              <span class="hover:text-[#9E55EC]">Персональные данные</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="chat"  type="checkbox" v-model="organizer.chat" />
              <span class="hover:text-[#9E55EC]">Чат</span>
            </label>
          </div>
        </div>
        <div class="space-y-4 mt-2 w-full ml-3">
          <div>
            Пользователи:
          </div>
          <div class="text-sm space-y-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="show" type="checkbox" v-model="user.show" />
              <span class="hover:text-[#9E55EC]">Просмотр</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="status" type="checkbox" v-model="user.status" />
              <span class="hover:text-[#9E55EC]">Менять статус</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="metric" type="checkbox" v-model="user.metric" />
              <span class="hover:text-[#9E55EC]">Персональные данные</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="chat" type="checkbox" v-model="user.chat" />
              <span class="hover:text-[#9E55EC]">Чат</span>
            </label>
          </div>
        </div>
      </div>
      <div class="flex w-full xm:block mt-1">
        <div class="space-y-4 mt-2 w-full mr-3">
          <div>
            Мероприятие:
          </div>
          <div class="text-sm space-y-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="show" type="checkbox" v-model="event.show" />
              <span class="hover:text-[#9E55EC]">Просмотр</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input class="mr-1 accent-[#9E55EC]" value="status" type="checkbox" v-model="event.status" />
              <span class="hover:text-[#9E55EC]">Менять статус</span>
            </label>
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn mt-0" @click="close">
          {{ $t('worker.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">{{ $t('worker.dialog.save') }}</button>
      </div>
    </div>
    <div></div>
  </div>
  
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ArrowLongLeftIcon } from '@heroicons/vue/20/solid'
import { workerStore } from '@/stores/data/workers'
const store = workerStore()
import { subcategoryStore } from '@/stores/data/subcategories'
import { categoryStore } from '@/stores/data/categories'
const category_store = categoryStore()
const subcategory_store = subcategoryStore()
const { categories } = storeToRefs(category_store)
const { subcategories } = storeToRefs(subcategory_store)
import { useRouter, useRoute  } from 'vue-router'
const router = useRouter()
const route = useRoute()
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



// Dostup
const organizer = ref({
  show: false,
  status: false,
  metric: false,
  chat: false,
})
const user = ref({
  show: false,
  status: false,
  metric: false,
  chat: false,
})
const event = ref({
  show: false,
  status: false
})

const formatAccessData = (organizer) => {
  return Object.keys(organizer).filter((key) => organizer[key]);
}



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
  if (data.value.password) {
    // Tahrirlashda faqat agar parol kiritilgan bo'lsa
    baseRules.password = {
      minLength: minLength(5, { message: t('worker.dialog.password_min_length') })
    }
  }
  return baseRules
})
import { useVuelidate } from '@vuelidate/core'
const v$ = useVuelidate(rules, data)



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
    if (!data.value.password) delete payload.password
    
    const access = {
      organizer: formatAccessData(organizer.value),
      user: formatAccessData(user.value),
      event: formatAccessData(event.value),
    };
    payload.access = access;
    console.log("payload", payload);
    
    await store.saveWorker(payload, t)
    router.push({ name: 'workers' })
    clear()
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
  // Dostup
  organizer.value ={
    show: false,
    status: false,
    metric: false,
    chat: false,
  }
  user.value = {
    show: false,
    status: false,
    metric: false,
    chat: false,
  }
  event.value = {
    show: false,
    status: false
  }
  v$.value.$reset()
}

const close = () => {
  router.push({ name: 'workers' })
  clear()
}

watch(
  () => data.value.categories,
  (newCategories) => {
    if (data.value.categories.length > 0) {
      filterSubcat(newCategories)
    }
  }
)


onMounted(async () => {
  await category_store.getCategories({ limit: 0, type: true })
  if(route.params.id) {
    const res = await store.getWorker(route.params.id)
    console.log("editres", res.data);
    
    if (res.data.role == 'moderator') isManager.value = true
    else isManager.value = false
    data.value = {
      ...res.data,
      _id: route.params.id,
      categories: res.data?.categories || [],
      subcategories: res.data?.subcategories || []
    }

    // Access ma'lumotlarini qayta ishlash
    if (res.data.access) {
      
      // Accesslarni belgilash
      organizer.value = {
        show: res.data.access?.organizer.includes('show') || false,
        status: res.data.access?.organizer.includes('status') || false,
        metric: res.data.access?.organizer.includes('metric') || false,
        chat: res.data.access?.organizer.includes('chat') || false,
      };

      user.value = {
        show: res.data.access?.user.includes('show') || false,
        status: res.data.access?.user.includes('status') || false,
        metric: res.data.access?.user.includes('metric') || false,
        chat: res.data.access?.user.includes('chat') || false,
      };

      event.value = {
        show: res.data.access?.event.includes('show') || false,
        status: res.data.access?.event.includes('status') || false,
      };
    }
  }
})
</script>
<style lang=""></style>
