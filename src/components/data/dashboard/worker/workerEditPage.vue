<template>
  <div class="h-full w-full overflow-auto">
    <div class="flex items-center justify-between my-6 mx-4 sm:block">
      <div class="flex items-center">
        <button  
          @click="$router.push({ name: 'workers' })"
          class="w-[30px] h-[30px] rounded-full bg-[#F5F0FF] mr-[16px] flex justify-center items-center hover:bg-[#9E55EC] hover:text-white"
          >
            <ChevronLeftIcon class="size-7" />
        </button>
        <div as="h3" class="text-[22px] font-bold leading-6 text-[#483D5B] sm:text-[18px]">
          {{ $t('worker.dialog.edit') }}
        </div>
      </div>
      <div class="flex gap-2 sm:mt-3 sm:justify-end">
        <div class="flex gap-2 items-center justify-end sm:gap-0">
          <button 
            type="button" 
            class="close-btn h-[40px] min-w-[100px] rounded-[16px] sm:min-w-[200px] xm:min-w-[150px]" 
            @click="close"
          >
            {{ $t('worker.dialog.close') }}
          </button>
          <button 
            type="button" 
            class="send-btn rounded-[16px] h-[40px] min-w-[100px] sm:min-w-[200px] xm:min-w-[150px]" 
            @click="send"
          >
            {{ $t('worker.dialog.save') }}
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8 p-8 mx-4 bg-white rounded-[16px] lg:col-span-12">
        <div class="flex w-full xm:block">
          <div class="space-y-2 w-full mr-3">
            <default-input
              v-model="data.lname"
              name="lname"
              :placeholder="t('worker.dialog.lname')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              :error="v$.lname.$invalid && v$.lname.$dirty"
            />
          </div>
          <div class="space-y-2 w-full ml-1 xm:ml-0 xm:mt-3">
            <default-input
              v-model="data.name"
              name="name"
              :placeholder="t('worker.dialog.name')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              :error="v$.name.$invalid && v$.name.$dirty"
            />
          </div>
        </div>
        <div class="flex items-center w-full xm:block">
          
          <div class="space-y-2 mt-4 w-full mr-3">
            <default-input
              v-model="data.login"
              name="login"
              :placeholder="t('worker.dialog.login')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              :error="v$.login.$invalid && v$.login.$dirty"
            />
          </div>
          <div class="space-y-2 mt-4 w-full">
            <default-input
              v-model="data.password"
              name="password"
              :placeholder="t('worker.dialog.password')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              :error="v$.password?.$invalid && v$.password?.$dirty"
            />
          </div>
        </div>
        <div class="flex items-center w-full xm:block">
          <div class="space-y-2 mt-4 w-full mr-3">
            <phone-maska
              v-model="data.phone"
              name="phone"
              :placeholder="t('worker.dialog.phone')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              :error="v$.phone.$invalid && v$.phone.$dirty"
            />
          </div>
          <div class="space-y-2 mt-4 w-full">
            <default-select
              v-model="data.role"
              name="role"
              :placeholder="t('worker.dialog.role')"
              :options="roles || []"
              :customClass="'rounded-[16px] text-[16px] py-[13px] px-[16px]'"
              option_title="title"
              :error="v$.role.$invalid && v$.role.$dirty"
              @change="changeRole(data.role)"
            />
          </div>
        </div>
        <div class="mt-7 text-[19px]  text-[#483D5B] font-semibold sm:text-[15px]">Категории сотрудника</div>
        <div class="flex w-full xm:block">
          <div class="space-y-2 mt-2 w-full mr-3">
            <array-select
              v-model="data.categories"
              name="categories"
              label="Выберите категорию"
              :placeholder="t('worker.dialog.category')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              @input="filterSubcat(data.categories)"
              :options="categories || []"
              option_title="title"
              :error="v$.categories?.$invalid && v$.categories?.$dirty"
            />
          </div>
          <div class="space-y-2 mt-2 w-full ml-1 xm:ml-0">
            <array-select
              v-model="data.subcategories"
              name="subcategories"
              label="Выберите подкатегорию"
              :placeholder="t('worker.dialog.subcategory')"
              :customClass="'h-[50px] rounded-[16px] text-[16px] py-[20px] px-[16px]'"
              :options="subcategories || []"
              option_title="title"
            />
          </div>
        </div>
  
        <div class="flex w-full xm:block">
          
        </div>
  
        <div class="mt-7 mb-2 text-[19px]  text-[#483D5B] font-semibold sm:text-[15px]">Доступы:</div>
        <div class="flex w-full xm:block" >
          <div class="space-y-4 mt-2 w-full mr-3">
            <div class="text-[#645A77] text-[17px] font-semibold sm:text-[14px]">
              Организаторы:
            </div>
            <div class="text-sm space-y-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 text-[#645A77] accent-[#9E55EC]" value="show" false-value="hide" type="checkbox" v-model="organizer.show" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Просмотр</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="status" false-value="hide" type="checkbox" v-model="organizer.status" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Менять статус</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="metric" false-value="hide" type="checkbox" v-model="organizer.metric" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Персональные данные</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="chat" false-value="hide" type="checkbox" v-model="organizer.chat" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Чат</span>
              </label>
            </div>
          </div>
          <div class="space-y-4 mt-2 w-full ml-3 xm:ml-0">
            <div class="text-[#645A77] text-[17px] font-semibold sm:text-[14px]">
              Пользователи:
            </div>
            <div class="text-sm space-y-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="show" type="checkbox" v-model="user.show" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Просмотр</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="status" type="checkbox" v-model="user.status" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Менять статус</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="metric" type="checkbox" v-model="user.metric" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Персональные данные</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="chat" type="checkbox" v-model="user.chat" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Чат</span>
              </label>
            </div>
          </div>
          <div class="space-y-4 mt-2 w-full mr-3">
            <div class="text-[#645A77] text-[17px] font-semibold sm:text-[14px]">
              Мероприятие:
            </div>
            <div class="text-sm space-y-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="show" type="checkbox" v-model="event.show" :disabled="isRole !== 'moderator'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Просмотр</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="status" type="checkbox" v-model="event.status" :disabled="isRole !== 'moderator'" />
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Менять статус</span>
              </label>
            </div>
          </div>
        </div>
        <div class="flex w-full xm:block" >
          <div class="space-y-4 mt-2 w-full mr-3">
            <div class="text-[#645A77] text-[17px] font-semibold sm:text-[14px]">
              Новости:
            </div>
            <div class="text-sm space-y-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 text-[#645A77] accent-[#9E55EC]" value="show"  type="checkbox" v-model="news.show" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Просмотр</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="status"  type="checkbox" v-model="news.status" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Менять статус</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="edit"  type="checkbox" v-model="news.edit" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Изменить данные</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="create" type="checkbox" v-model="news.create" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Добавить</span>
              </label>
            </div>
          </div>
          <div class="space-y-4 mt-2 w-full ml-3 xm:ml-0">
            <div class="text-[#645A77] text-[17px] font-semibold sm:text-[14px]">
              Посты:
            </div>
            <div class="text-sm space-y-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="show" type="checkbox" v-model="post.show" :disabled="isRole !== 'content_manager'"/>
              <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Просмотр</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="status" type="checkbox" v-model="post.status" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Менять статус</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="edit" type="checkbox" v-model="post.edit" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Изменить данные</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input class="mr-1 accent-[#9E55EC]" value="create" type="checkbox" v-model="post.create" :disabled="isRole !== 'content_manager'"/>
                <span class="hover:text-[#9E55EC] text-[16px] font-normal text-[#645A77] sm:text-[13px]">Добавить </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
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


const isRole = ref('')
const changeRole = async (role) => {
  isRole.value = role
}


const data = ref({
  name: '',
  lname: '',
  phone: '',
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
const news = ref({
  show: false,
  status: false,
  edit: false,
  create: false,
})
const post = ref({
  show: false,
  status: false,
  edit: false,
  create: false,
})



const formatAccessData = (data) => {
  console.log("data", data);
  console.log("data333", Object.keys(data).filter((key) => data[key]));
  
  return Object.keys(data).filter((key) => data[key]);
}



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

const roles = [
  {
    _id: 'moderator',
    title: 'Модератор'
  },
  {
    _id: 'content_manager',
    title: 'Контент менеджер'
  },
  {
    _id: 'accountant',
    title: 'Бухгалтер'
  }
]

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    const payload = { ...data.value }
    if (data.value.role) {
      if (!data.value.subcategories.length) delete payload.subcategories
      if (!data.value.password) delete payload.password
    }
    let access = {}
    if (data.value.role === 'moderator') {
      access = {
        organizer: formatAccessData(organizer.value),
        user: formatAccessData(user.value),
        event: formatAccessData(event.value),
      }
    } else if (data.value.role === 'content_manager') {
      access = {
        news: formatAccessData(news.value),
        post: formatAccessData(post.value),
      }
    } else if (data.value.role === 'accountant') {
      access = {}
    }
    payload.access = access;
    console.log("workerEditdata", payload);
    

    console.log();
    
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
  news.value = {
    show: false,
    status: false,
    edit: false,
    create: false,
  }
  post.value = {
    show: false,
    status: false,
    edit: false,
    create: false,
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
  await subcategory_store.getSubcategories({ limit: 0, type: true })
  if(route.params.id) {
    const res = await store.getWorker(route.params.id)
    console.log("workerEditResdata", res.data);
    
    data.value = {
      ...res.data,
      _id: route.params.id,
      categories: Array.isArray(res.data?.categories) ? res.data.categories : [],
      subcategories: Array.isArray(res.data?.subcategories) ? res.data.subcategories : [],
    }
    isRole.value = res.data?.role

  
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
      news.value = {
        show: res.data.access?.news.includes('show') || false,
        status: res.data.access?.news.includes('status') || false,
        edit: res.data.access?.news.includes('edit') || false,
        create: res.data.access?.news.includes('create') || false,
      };
      post.value = {
        show: res.data.access?.post.includes('show') || false,
        status: res.data.access?.post.includes('status') || false,
        edit: res.data.access?.post.includes('edit') || false,
        create: res.data.access?.post.includes('create') || false,
      };
    }
  }
})
</script>
<style lang=""></style>
