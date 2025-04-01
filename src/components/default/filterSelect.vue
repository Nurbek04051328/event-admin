<template>
  <Combobox as="div" v-model="selectedPerson">
    <ComboboxLabel class="block text-sm font-medium leading-6 text-[#645A77]">{{ label }}</ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxButton class="inset-y-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ComboboxInput
          class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-[#645A77] shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9E55EC] focus:outline-0"
          :placeholder="placeholder"
          @input="onInput"
          :display-value="(person) => getPersonTitleById(person)"
          autocomplete="off"
        />
        <ChevronUpDownIcon class="absolute right-0 h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredPeople.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="person in filteredPeople"
          :key="person._id"
          :value="person._id"
          as="template"
          v-slot="{ active, selected }"
        >
          <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-[#9E55EC] text-white' : 'text-gray-800']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person[option_title] }}
            </span>
            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Выберите из списка',
  },
  name: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  option_title: {
    type: String,
    default: 'title', // Default to 'title', but can be overridden
  },
  error: {
    type: [String, Boolean],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  suffix: {
    type: String,
    default: '',
  },
})

// Internal state for the search query and selected person ID
const query = ref('')
const selectedPerson = ref(null)

// Define emit for updating v-model
const emit = defineEmits(['update:modelValue'])

// Computed array of filtered options based on the search query
const filteredPeople = computed(() => {
  return query.value === ''
    ? props.options
    : props.options.filter((person) => person[props.option_title].toLowerCase().includes(query.value.toLowerCase()))
})

// Function to get the title of a person by their ID (for display purposes)
function getPersonTitleById(id) {
  const person = props.options.find((p) => p._id === id)
  return person ? person[props.option_title] : ''
}

// Function to handle input change and update the search query
function onInput(event) {
  query.value = event.target.value
}

// Watch for changes to selectedPerson and emit only the ID
watch(selectedPerson, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>