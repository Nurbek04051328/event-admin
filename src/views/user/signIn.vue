<template>
  <div class="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
    <div class="bg-white rounded-lg p-12 shadow-sm" style="width: 450px">
      <div class="sm:mx-auto sm:w-full flex-col sm:max-w-sm flex justify-center items-center gap-2">
        <img src="../../assets/logo/logo.png" alt="" class="w-16" />
        <div class="text-2xl font-bold">Eventum</div>
      </div>
      <div class="mt-10 mx-auto w-full max-w-80">
        <form @submit.prevent="submit" class="space-y-3">
          <div>
            <label for="login" class="block text-sm font-medium leading-6 text-gray-900"
              >Логин</label
            >
            <div class="mt-2">
              <input
                id="login"
                name="login"
                type="login"
                v-model="user.login"
                placeholder=""
                autocomplete="off"
                class="input-text h-11"
                :class="{
                  'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500':
                    v$.login.$invalid && v$.login.$dirty
                }"
              />
            </div>
            <span v-if="v$.login.$invalid && v$.login.$dirty">
              <p class="mt-2 text-xs text-red-600" id="email-error">Обезательная поля</p>
            </span>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >Пароль</label
              >
            </div>
            <div class="mt-2 flex rounded-md">
              <div class="relative flex flex-grow items-stretch focus-within:z-10">
                <input
                  id="password"
                  name="password"
                  :type="toggle ? 'text' : 'password'"
                  v-model="user.password"
                  autocomplete="current-password"
                  class="input-text h-11"
                  aria-invalid="true"
                  :class="{
                    'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500':
                      v$.password.$invalid && v$.password.$dirty
                  }"
                />
                <button
                  type="button"
                  @click="toggle = !toggle"
                  class="absolute right-0 inline-flex p-3"
                >
                  <EyeIcon v-if="!toggle" class="size-5 text-gray-400" />
                  <EyeSlashIcon v-else class="size-5 text-gray-400" />
                </button>
              </div>
            </div>
            <span v-if="v$.password.$invalid && v$.password.$dirty">
              <p class="mt-2 text-xs text-red-600" id="email-error">Обезательная поля</p>
            </span>
          </div>
          <div>
            <button
              type="submit"
              class="w-full mt-8 p-2 rounded-md text-white"
              style="background: linear-gradient(to right, #ff7e5f, #7a30fb)"
            >
              Войти
            </button>
          </div>
        </form>
        <!-- <button
          class="w-full mt-8 p-2 rounded-md text-white"
          style="background: linear-gradient(to right, #ff7e5f, #7a30fb)"
          @click="authenticateWithUSB"
        >
          Войти c fleshkoy
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { authStore } from '@/stores/user/auth'
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

  const rules = {
    login: { required },
    password: { required }
  }

  const store = authStore()
  const toggle = ref(false)

  const user = ref({
    login: '',
    password: ''
  })

  
  const v$ = useVuelidate(rules, user)
  
  const submit = async () => {
    v$.value.$touch()
    if (!v$.value.$invalid) {
      await store.login(user.value)
    }
  }


// const errorMessage = ref('');
// const authenticateWithUSB  = async () => {
//   if (!navigator.usb) {
//     console.error('WebUSB API is not supported in this browser.');
//     return;
//   }
//   try {
//     // WebUSB API orqali fleshka qurilmasini tanlash
//     const device = await navigator.usb.requestDevice({ filters: [] });
//     console.log('Device found:', device);


//     // Fleshka qurilmasining seriya raqamini olish
//     const usbSerial = device.serialNumber || 'UNKNOWN_SERIAL';

//     console.log("seriya" , usbSerial);
    
//     // Backendga so'rov yuborish
//     // const response = await fetch('http://localhost:3000/authenticate-usb', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({ serial: usbSerial }),
//     // });

//     // const result = await response.json();

//     // if (result.success) {
//     //   window.location.href = '/dashboard'; // Dashboardga o'tkazish
//     // } else {
//     //   errorMessage.value = 'Unauthorized USB device.';
//     // }
//   } catch (error) {
//     console.error('Error during USB authentication:', error);
//     errorMessage.value = 'Failed to authenticate with USB.';
//   }
// }
</script>

