<template>
  <div class="flex justify-between items-center gap-2 pr-6" @click="open = true">
    <div>
      <div class="subtitle mb-[10px]">
        {{ t('3.location_desc') }}
      </div>
      <div class="text">
        {{ t('3.location_desc_text') }}
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
              class="relative max-h-dvh transform flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:p-6"
            >
              <div class="flex-1 overflow-hidden flex flex-col">
                <DialogTitle
                  as="h3"
                  class="text-base font-semibold leading-6 text-gray-900 space-y-[10px] px-4 pb-4 pt-5"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      {{ t('3.location_desc') }}
                    </div>
                    <button
                      @click="((open = false), (data.locationDesc = ''))"
                      class="bg-event-white-3 rounded-[10px] focus:outline-none py-2 px-[18px] text-event-700"
                    >
                      {{ t('close') }}
                    </button>
                  </div>
                </DialogTitle>
                <div class="px-4 space-y-4 flex-1 overflow-auto">
                  <div>
                    {{ t('3.location_type_info') }}
                  </div>
                  <DefaultTextarea v-model="data.locationDesc" :max="200" name="locationDesc" />
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
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const data = defineModel()
const open = ref(false)
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

import api from '@/helpers/api'
import DefaultTextarea from '../layout/defaultTextarea.vue'
const search = ref('')
const list = ref([])
const attr = computed(() => {
  return list.value?.filter((l) =>
    l?.attributes?.some((i) => i?.title?.toLowerCase().includes(search.value?.toLowerCase()))
  )
})

const countAttr = computed(() => {
  return data.value.attributes?.reduce((a, b) => a + b.values?.length, 0)
})

const setValues = (e) => {
  let index = data.value.attributes?.findIndex((v) => v.category == e.target.name)
  if (index == -1) {
    data.value.attributes.push({ category: e.target.name, values: [e.target.value] })
    return
  }

  if (data.value.attributes[index].values?.includes(e.target.value)) {
    data.value.attributes[index].values = data.value.attributes[index].values.filter(
      (b) => b != e.target.value
    )
    if (data.value.attributes[index]?.values?.length == 0) {
      data.value.attributes.splice(index, 1)
    }
    return
  }
  data.value.attributes[index].values.push(e.target.value)

  console.log(e.target.name, e.target.value)
}

onMounted(async () => {
  const { data } = await api.get('/api/default/all-attribute-category', {
    params: {
      slugs: [
        'attachment',
        'place-of-residence',
        'sports-and-fitness-center',
        'government-or-educational-institution'
      ]
    }
  })
  console.log(data)
  list.value = [...data]
})
</script>
<style lang=""></style>
