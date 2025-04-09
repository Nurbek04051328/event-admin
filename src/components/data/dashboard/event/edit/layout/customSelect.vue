<template>
  <Listbox as="div" v-model="model">
    <div :class="['relative mt-2', clean ? 'flex gap-2 items-center' : '']">
      <ListboxButton
        class="grid w-full cursor-default grid-cols-1 bg-white text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-[1px] pl-4 py-3 pr-4 rounded-2xl"
      >
        <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <span class="block truncate">{{
            options.find((o) => o._id == model)?.[option_title] || 'Выбрать'
          }}</span>
        </span>
        <ChevronUpDownIcon
          class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          aria-hidden="true"
        />
      </ListboxButton>
      <button v-if="clean && model" @click="handleClear">
        <XMarkIcon class="size-5" />
      </button>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-0 border-[1px] shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in options"
            :key="item._id"
            :value="item._id"
            v-slot="{ active }"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white outline-hidden' : 'text-gray-900',
                'relative cursor-default py-2 pr-9 pl-3 select-none'
              ]"
            >
              <div class="flex items-center">
                <span
                  :class="[
                    model == item._id ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate'
                  ]"
                  >{{ item[option_title] }}</span
                >
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/16/solid'

const model = defineModel()
defineProps([
  'label',
  'placeholder',
  'name',
  'options',
  'option_title',
  'name_value',
  'error',
  'disabled',
  'suffix',
  'mini',
  'default',
  'clean'
])

const emit = defineEmits(['change', 'clear'])

const handleClear = () => {
  emit('clear')
}

watch(model, () => {
  emit('change')
})

import { XCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
</script>
