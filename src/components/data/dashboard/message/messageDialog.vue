<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[30%] sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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
        Создать чат
      </DialogTitle>

      <div>
        <TabList :list="links" @tab-changed="changeTab" :active="currentTab || 'organizator'"/>
      </div>
      <div class="space-y-2 mt-4 mb-6" v-if="currentTab == 'organizator'">
        <select
          v-model="id"
          class="select"
          @change="ChangeId()"
        >
          <option disabled value="" selected hidden>
            Выберите Организатора
          </option> 
          <option v-for="opt in organizer?.data" :key="opt._id" :value="opt._id">
            {{ opt.lname }} {{ opt.name }}
          </option>
        </select>
      </div>
      <div class="space-y-2 mt-4 mb-6" v-if="currentTab == 'user'">
        <select
          v-model="id"
          class="select"
          @change="ChangeId()"
        >
          <option disabled value="" selected hidden>
            Выберите Пользователя
          </option> 
          <option v-for="opt in user?.data" :key="opt._id" :value="opt._id">
            <div>

              <img class="mx-auto h-[10px] w-[10px] flex-shrink-0 rounded-full" :src="`${url}/${opt.cover?.at(0) || opt.face?.at(0)}`" alt="">
              {{ opt.lname }} {{ opt.name }}
            </div>
          </option>
        </select>
      </div>
      <!-- <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn md:m-t-0 xs:m-t-0" @click="close">
          {{ $t('subcategory.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">
          {{ $t('category.dialog.save') }}
        </button>
      </div> -->
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { DialogPanel, DialogTitle } from '@headlessui/vue'
import TabList from '@/components/data/dashboard/message/tabButtons.vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
const url = import.meta.env.VITE_URL
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
import { usersStore } from '@/stores/data/users'
const user_store = usersStore()
const { user } = storeToRefs(user_store)
import { organizerStore } from '@/stores/user/organizer'
const organizer_store = organizerStore()
const { organizer } = storeToRefs(organizer_store)
import { messageStore } from '@/stores/data/message'
const store = messageStore()

import { useRouter } from 'vue-router';

const router = useRouter();



const id = ref('')



const close = () => {
  id.value = ''
  usefull.setToggle(false, 0)
}


const links = [
  { name: 'OrganizerChatroom', title: 'Организаторы', role: 'organizator' },
  { name: 'UserChatroom', title: 'Пользователи', role: 'user' },
]


let currentTab = ref("organizator"); 
const changeTab = async(tabName) => {
  console.log("tabName", tabName);
    currentTab.value = tabName;
    await getData()
  
};






const ChangeId = async () => {
  const data = await store.getOneChatroom(id.value)
  console.log("datadata", data);
  close()
  router.push({ name: 'showChat', params: { id: data?._id } });
}

const getData = async () => {
  if(currentTab.value == "organizator") {
    await organizer_store.getorganizers({ limit: 0})
  } else {
    await user_store.getUsers({ limit: 0 })
  }
}


onMounted(async () => {
  await getData()
})

</script>