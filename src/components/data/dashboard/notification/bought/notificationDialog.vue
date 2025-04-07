<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[400px]"
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
        {{ edit ? 'Редактировать уведомление' : 'Добавить новая уведомление' }}
      </DialogTitle>
      <div class="flex w-full xs-max:flex-col">
        <div class="space-y-2 mt-4 w-full mr-1">
          <DefaultSelect
            v-model="data.userId"
            :options="
              organizer.organizer?.data.map((o) => {
                return {
                  _id: o._id,
                  title: `${o.lname} ${o.name}`
                }
              })
            "
            option_title="title"
            @change="getevents"
            name="type"
            label="Организатор"
          />
          <DefaultSelect
            v-model="data.event"
            :options="events"
            option_title="title"
            name="events"
            label="Мероприятие"
          />
          <DefaultSelect
            v-model="data._id"
            :options="notifpack_store.notifpackages"
            option_title="title"
            name="packages"
            label="Пакеты"
          />

          <default-input
            v-model="data.title"
            name="title"
            label="Заголовок"
            :error="v$.title?.$invalid && v$.title?.$dirty"
          />
          <DefaultTextarea
            v-model="data.desc"
            name="description"
            label="Текст"
            :error="v$.desc?.$invalid && v$.desc?.$dirty"
          />
        </div>
      </div>

      <div class="mt-6 flex flex-row gap-2">
        <button type="button" class="close-btn md:m-t-0 xs:m-t-0" @click="close">
          {{ $t('ticketPackage.dialog.close') }}
        </button>
        <button type="button" class="send-btn" @click="send">
          {{ $t('ticketPackage.dialog.save') }}
        </button>
      </div>
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useFullStore } from '@/stores/usefull/modal'

const usefull = useFullStore()
const { toggle} = storeToRefs(usefull)

const data = ref({
  userId: ''
})

import { organizerStore } from '@/stores/user/organizer'
const organizer = organizerStore()

const events = ref([])

import { notifpackageStore } from '@/stores/data/notifPackage'
const notifpack_store = notifpackageStore()

const getevents = async () => {
  const res = await organizer.getorganizerEvents(data.value.userId)
  console.log(res)
  events.value = [...res.events]
}

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  desc: { required }
}

const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { notificationStore } from '@/stores/data/notification'
import DefaultSelect from '@/components/default/defaultSelect.vue'
import DefaultTextarea from '@/components/default/defaultTextarea.vue'
const store = notificationStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    console.log(data.value)
    data.value.count =
      notifpack_store.notifpackages.find((n) => n._id == data.value._id)?.count || 0
    await store.sendNotification(data.value)
    close()
  } else {
    console.log(data.value)
  }
}

const close = () => {
  usefull.setToggle(false, 0)
  data.value = {
    userId: '',
    event: '',
    _id: '',
    title: '',
    desc: ''
  }
  v$.value.$reset()
}

watch(
  () => toggle.value,
  () => {
    data.value = {
      userId: '',
      event: '',
      _id: '',
      title: '',
      desc: ''
    }
  }
)
</script>
