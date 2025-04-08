<template>
  <div class="flex justify-between items-center gap-2 pr-6" @click="open = true">
    <div>
      <div class="subtitle mb-[10px]">
        {{ t('6.drink_title') }}
      </div>
      <div class="text">
        {{ t('6.drink_desc') }}
      </div>
    </div>
    <ChevronRightIcon class="size-6 text-event-500" />
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative max-h-dvh transform flex flex-col overflow-hidden rounded-lg bg-white text-left transition-all w-full sm:p-6"
            >
              <div class="flex-1 overflow-hidden flex flex-col">
                <DialogTitle
                  as="h3"
                  class="text-base font-semibold leading-6 text-gray-900 space-y-[10px] px-4 pb-4 pt-5"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      {{ t('6.drink_title') }}
                    </div>
                    <button
                      @click="open = false"
                      class="bg-event-white-3 rounded-[10px] focus:outline-none py-2 px-[18px] text-event-700"
                    >
                      {{ t('close') }}
                    </button>
                  </div>
                </DialogTitle>
                <div class="px-4 pb-4 space-y-4 flex-1 overflow-auto">
                  <div v-for="item of list" :key="item._id">
                    <div class="grid grid-cols-2 gap-3">
                      <div
                        v-for="a of item?.attributes"
                        :key="a._id"
                        class="flex items-start gap-[6px]"
                      >
                        <input
                          :id="a._id"
                          aria-describedby="comments-description"
                          :name="item._id"
                          type="checkbox"
                          :value="a._id"
                          @change="setValues"
                          :checked="
                            data.provideAttributes.some(
                              (b) => b.category == item._id && b.values?.includes(a._id)
                            )
                          "
                          class="h-4 w-4 mt-1 rounded border-gray-300 text-main focus:ring-main"
                        />
                        <label :for="a._id" class="font-medium text-gray-900">{{ a.title }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 pb-4 pt-5 bg-white">
                <button type="button" class="w-full btn" @click="open = false">
                  {{ t('save') }}
                  <ChevronRightIcon class="size-5" />
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const data = defineModel()
const open = ref(false)
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

import api from '@/helpers/api'
const search = ref('')
const list = ref([])

const setValues = (e) => {
  let index = data.value.provideAttributes?.findIndex((v) => v.category == e.target.name)
  if (index == -1) {
    data.value.provideAttributes.push({
      category: e.target.name,
      values: [e.target.value]
    })
    return
  }

  if (data.value.provideAttributes[index].values?.includes(e.target.value)) {
    data.value.provideAttributes[index].values = data.value.provideAttributes[index].values.filter(
      (b) => b != e.target.value
    )
    if (data.value.provideAttributes[index]?.values?.length == 0) {
      data.value.provideAttributes.splice(index, 1)
    }
    return
  }
  data.value.provideAttributes[index].values.push(e.target.value)
}

onMounted(async () => {
  const { data } = await api.get('/api/default/all-attribute-category', {
    params: {
      slugs: ['drinks']
    }
  })
  console.log(data)
  list.value = [...data]
})
</script>
<style lang=""></style>
