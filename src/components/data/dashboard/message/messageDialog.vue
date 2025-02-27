<template>
  <default-modal>
    <DialogPanel
      class="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[30%] sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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
      <DialogTitle as="h3" class="text-[22px] mb-4 font-semibold leading-6 text-[#645A77]">
        Создать чат
      </DialogTitle>

      <div>
        <TabList :list="links" @tab-changed="changeTab" :active="currentTab || 'organizator'"/>
      </div>
      <div class="space-y-2 mt-4 mb-6 relative" v-if="currentTab == 'organizator'">
        <input
            type="text"
            v-model="searchOrganizerText"
            placeholder="Введите имя пользователя"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9E55EC]"
          />
          <ul
            v-if="resultsOrganizer.length > 0"
            class="absolute w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-50"
          >
            <li
              v-for="user in resultsOrganizer"
              :key="user._id"
              @click="selectUser(user)"
              class="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                v-if="user?.cover.length>0 || user?.face.length>0"
                class="h-8 w-8 rounded-full mr-2"
                :src="`${url}/${user.cover?.at(0) || user.face?.at(0)}`"
                alt=""
              />
              <img v-else src="@/assets/images/not-user.jpg" alt="" class="w-8 rounded-full">
              <span>{{ user.lname }} {{ user.name }}</span>
            </li>
          </ul>
      </div>
      <div class="space-y-2 mt-4 mb-6 relative" v-if="currentTab == 'user'">
        <div class="relative mt-4 mb-6">
          <input
            type="text"
            v-model="searchUserText"
            placeholder="Введите имя пользователя"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul
            v-if="resultsUser.length > 0"
            class="absolute w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10"
          >
            <li
              v-for="user in resultsUser"
              :key="user._id"
              @click="selectUser(user)"
              class="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                v-if="user?.cover.length>0 || user?.face.length>0"
                class="h-8 w-8 rounded-full mr-2"
                :src="`${url}/${user.cover?.at(0) || user.face?.at(0)}`"
                alt=""
              />
              <img v-else src="@/assets/images/not-user.jpg" alt="" class="w-8 rounded-full">
              <span>{{ user.lname }} {{ user.name }}</span>
            </li>
          </ul>
        </div>
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
import { ref, onMounted, watch } from 'vue'
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


const resultsUser = ref([])
const resultsOrganizer = ref([])
const searchUserText = ref('')
const searchOrganizerText = ref('')






const close = () => {
  // hammmasini tozalash

  searchUserText.value = ''
  searchOrganizerText.value = ''
  resultsUser.value = []
  resultsOrganizer.value = []
  usefull.setToggle(false, 0)
}


const links = [
  { name: 'OrganizerChatroom', title: 'Организаторы', role: 'organizator' },
  { name: 'UserChatroom', title: 'Пользователи', role: 'user' },
]


let currentTab = ref("organizator"); 
const changeTab = async(tabName) => {
    currentTab.value = tabName;
    await getData()
  
};











const selectUser = async (val) => {
  console.log(val);
  
  const data = await store.getOneChatroom(val._id)
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



// Search inputs

const closeSearch = () => {
  searchUserText.value = ''
  resultsUser.value = []
}

// Search Users and Organizers
const search = async(value, role) => {
  if (value?.length < 4) return false
  if(role == 'user') {
    await user_store.getUsers({search:value})
    resultsUser.value = user.value.data
  }
  if(role == 'organizer') {
    await organizer_store.getorganizers({search:value})
    resultsOrganizer.value = organizer.value.data
  }
};


watch(
  () => searchUserText.value,
  (to) => {
    if (to?.length == 0) {
      closeSearch()
      return false
    }
    if (to?.length > 3) {
      search(to, 'user')
    }
  }
)

watch(
  () => searchOrganizerText.value,
  (to) => {
    if (to?.length == 0) {
      closeSearch()
      return false
    }
    if (to?.length > 3) {
      search(to, 'organizer')
    }
  }
)

onMounted(async () => {
  await getData()
})

</script>