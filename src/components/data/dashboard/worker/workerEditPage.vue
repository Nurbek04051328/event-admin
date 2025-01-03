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
            <div>
              <input class="mr-1" true-value="show" false-value="hide" type="checkbox" v-model="organizer.show" />
              Просмотр
            </div>
            <div>
              <input class="mr-1" true-value="status" false-value="hide" type="checkbox" v-model="organizer.status" />
              Менять статус
            </div>
            <div>
              <input class="mr-1" true-value="metric" false-value="hide" type="checkbox" v-model="organizer.metric" />
              Персональные данные
            </div>
            <div>
              <input class="mr-1" true-value="chat" false-value="hide" type="checkbox" v-model="organizer.chat" />
              Чат
            </div>
          </div>
        </div>
        <div class="space-y-4 mt-2 w-full ml-3">
          <div>
            Пользователи:
          </div>
          <div class="text-sm space-y-2">
            <div>
              <input class="mr-1" value="show" type="checkbox" v-model="user.show" />
              Просмотр
            </div>
            <div>
              <input class="mr-1" value="status" type="checkbox" v-model="user.status" />
              Менять статус
            </div>
            <div>
              <input class="mr-1" value="metric" type="checkbox" v-model="user.metric" />
              Персональные данные
            </div>
            <div>
              <input class="mr-1" value="chat" type="checkbox" v-model="user.chat" />
              Чат
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full xm:block mt-1">
        <div class="space-y-4 mt-2 w-full mr-3">
          <div>
            Мероприятие:
          </div>
          <div class="text-sm space-y-2">
            <div>
              <input class="mr-1" value="show" type="checkbox" v-model="event.show" />
              Просмотр
            </div>
            <div>
              <input class="mr-1" value="status" type="checkbox" v-model="event.status" />
              Менять статус
            </div>
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
import { ref, computed, onMounted } from 'vue'
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

    console.log("organizer", organizer.value);
    console.log("user", user.value);
    console.log("event", event.value);
    const access = {
      organizer: formatAccessData(organizer.value),
      user: formatAccessData(user.value),
      event: formatAccessData(event.value),
    };
    
    console.log("accsess",access);
    payload.access = access;
    console.log("payload", payload);
    await store.addWorker(payload, t)
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
  v$.value.$reset()
}


onMounted(async () => {
  await category_store.getCategories({ limit: 0, type: true })
})
</script>
<style lang=""></style>
