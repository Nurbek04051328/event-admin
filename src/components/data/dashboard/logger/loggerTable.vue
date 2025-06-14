<template>
  <div class="ring-1 w-full rounded-[16px] ring-gray-300  overflow-auto">
    <table class="w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="th-first">№</th>
          <th scope="col" class="th" width="400">URL</th>
          <th scope="col" class="th">Метод</th>
          <th scope="col" class="th">Ф И О</th>
          <th scope="col" class="th" width="150">Вход</th>
        </tr>
      </thead>
      <tbody class="bg-white overflow-auto">
        <tr
          v-for="(item, itemIdx) in store.routeLoggers?.data"
          :key="item?._id"
          :class="itemIdx % 2 === 0 ? undefined : 'bg-gray-50'"
        >
          <td class="td-first">
            {{ (page - 1) * limit + itemIdx + 1 }}
          </td>
          <td class="td" width="800">
            <div v-if="isImageUrl(item.url)">
              <a :href="item.url" target="_blank" class="text-blue-600 underline">{{ removeQueryParams(item.url) }}</a>
            </div>
            <div v-else>
              {{ removeQueryParams(item.url) }}
            </div>
          </td>
          <td class="td">
            <div class="flex items-center gap-2">
              <span
                :class="{
                  'text-green-600 font-semibold': item.method === 'POST',
                  'text-blue-600 font-semibold': item.method === 'GET',
                  'text-yellow-600 font-semibold': item.method === 'PUT',
                  'text-red-600 font-semibold': item.method === 'DELETE',
                  'text-gray-600': !['GET', 'POST', 'PUT', 'DELETE'].includes(item.method)
                }"
              >
                {{ item.method }}
              </span>

              <!-- Hoverable info menu -->
              <Menu as="div" class="relative">
                <MenuButton class="text-gray-500 hover:text-black text-sm underline">
                  Детали
                </MenuButton>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute z-50 right-0 mt-2 w-[320px] rounded-md bg-white p-3 shadow-lg ring-1 ring-gray-900/5 focus:outline-none text-left"
                  >
                    <!-- User info -->
                    <MenuItem v-if="item?.user">
                      <div class="text-sm text-black mb-2">
                        👤 <strong>{{ item.user.lname }} {{ item.user.name }}</strong>
                      </div>
                    </MenuItem>

                    <!-- POST body -->
                    <MenuItem v-if="item.method === 'POST' && item.body">
                      <div class="text-xs text-gray-600 whitespace-pre-wrap break-words">
                        <strong>POST Body:</strong>
                        <pre>{{ JSON.stringify(item.body, null, 2) }}</pre>
                      </div>
                    </MenuItem>

                    <!-- GET query -->
                    <MenuItem v-if="item.method === 'GET' && item.query">
                      <div class="text-xs text-gray-600 whitespace-pre-wrap break-words">
                        <strong>Query:</strong>
                        <pre>{{ JSON.stringify(item.query, null, 2) }}</pre>
                      </div>
                    </MenuItem>

                    <!-- Timestamp -->
                    <MenuItem>
                      <div class="text-xs text-gray-500 mt-2">
                        🕒 {{ convertDateShort(item.timestamp, 'full') }}
                      </div>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </td>
          <td class="td">{{ item?.user?.lname}} {{ item?.user?.name}}</td>
          <td class="td-last">{{ convertDateShort(item?.createdAt, 'full') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { convertDateShort } from '@/helpers/func'
const url = import.meta.env.VITE_URL
defineProps(['page', 'limit'])
import { loggerStore } from '@/stores/user/logger'
const store = loggerStore()

function removeQueryParams(url) {
  return url.split('?')[0];
}
function isImageUrl(url) {
  return /\.(webp|png|jpg|jpeg|gif|svg)$/.test(url);
}



// const methodClass = {
//   GET: 'text-blue-700',
//   POST: 'text-green-700',
//   PATCH: 'text-amber-700',
//   DELETE: 'text-red-700',
//   PUT: 'text-yellow-700',
// }

// const linkTitles = {
//   GET: {
//     '/api/logger': 'Logger sahifasiga kirdi',
//     '/api/student/upload': 'Fayl yukladi',
//     '/api/user/show': 'Foydalanuvchi sahifasini ko`rdi',
//     '/api/student/show': 'Abiturient arizasini ko`rdi',
//     '/api/statistics/usergroup': 'Guruh statistikasini',
//     '/api/user/get-users': 'Foydalanuvchilar sahifasini ko`rdi',
//     '/api/education-view': 'Ta`lum turi sahifasida bo`ldi',
//     '/api/report': 'Shartnomalar sahifasida bo`ldi',
//     '/api/student': 'Abiturientlar sahifasida bo`ldi',
//     '/api/statistics/studentstatus': 'Arizalar holati bo`yicha statistikani ko`rdi',
//     '/api/voucher/all': 'Voucher sahifasida bo`ldi',
//     '/api/offExam': 'Imtihonlar sahifasida bo`ldi',
//     '/api/voucher/check': 'Voucherni tekshirildi',
//     '/api/voucher/generate': 'Voucher generatsiya qildi',
//     '/api/message/all': 'SMSlar sahifasida bo`ldi',
//     '/api/statistics/report': 'Shartnomalar statistikasi sahifasida bo`ldi',
//     '/api/statistics/daily': 'Kunlik statistika sahifada bo`ldi',
//   },
//   POST: {
//     '/api/report/generate': 'Shartnoma generatsiya qildi',
//     '/api/student': 'Yangi hujjat qo`shdi',
//   },
//   PUT: {
//     '/api/student': 'Abiturient ma`lumot o`zgartirdi',
//   },
//   PATCH: {
//     '/api/student/': 'Hujjat holatini o`zgartirdi',
//   },
// }

// const convertUrlToText = (obj) => {
//   for (let key in linkTitles[obj.method]) {
//     if (obj.url.startsWith(key)) {
//       if (key == '/api/student/show')
//         return `${obj?.student?.secondName} ${obj?.student?.name} ${obj?.student?.thirdName} arizasini ko'rdi`
//       if (key == '/api/student/' && obj.method == 'PATCH')
//         return `Hujjat holatini "${studentStatus[obj?.body?.status]?.title}"ga o'zgartirdi`

//       return linkTitles[obj.method][key]
//     }
//   }
// }


</script>
<style lang=""></style>
