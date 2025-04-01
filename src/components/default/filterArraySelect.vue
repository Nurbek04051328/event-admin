<template>
  <Combobox as="div" @change="onInput" v-model="selectedPersons" multiple>
    <ComboboxLabel
      v-if="label"
      class="block text-sm font-medium leading-6 text-gray-900"
      :class="[
        {
          'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
        }
      ]"
      >
    </ComboboxLabel
    >
    <div class="relative mt-2">
      <ComboboxButton
      class="inset-y-0 w-full flex items-center rounded-r-md focus:outline-none"
      >
        <ComboboxInput
          class="w-full border-0 bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9E55EC] sm:text-sm sm:leading-6"
          :placeholder="placeholder"
          v-model:query="query"
          autocomplete="off"
          @change="onInput"
          :class="customClass"
          :display-value="
            () => selectedPersons.map((personId) => getPersonTitleById(personId)).join(', ')
          "
        />
        <ChevronUpDownIcon class=" absolute right-0 h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9 z-10',
              active ? 'bg-[#9E55EC] text-white' : 'text-gray-900'
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person[option_title] }}
            </span>
            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600'
              ]"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
  <span v-if="error">
    <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
  </span>
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
  ComboboxOptions
} from '@headlessui/vue'


const props = defineProps({
  label: {
    type: String,
    required: true,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Выберите из списка'
  },
  name: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  option_title: {
    type: String,
    default: 'title' // Default to 'title', but can be overridden
  },
  error: {
    type: [String, Boolean],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  suffix: {
    type: String,
    default: ''
  }
})

// Internal state for the search query and selected person ID
const query = ref('')
const selectedPersons = defineModel()

// Define emit for updating v-model
// const emit = defineEmits(['update:modelValue'])
const emit = defineEmits(['input'])
// Computed array of filtered options based on the search query
const filteredPeople = computed(() => {
  return query.value === ''
    ? props.options
    : props.options.filter((person) =>
        person[props.option_title].toLowerCase().includes(query.value.toLowerCase())
      )
})

// Function to get the title of a person by their ID (for display purposes)
function getPersonTitleById(id) {
  const person = props.options.find((p) => p._id === id)
  return person ? person[props.option_title] : ''
}

// Function to handle input change and update the search query
function onInput(event) {
  console.log("event", event);
  
  query.value = event.target.value
}


watch(selectedPersons, (newValue) => {
  emit('input', newValue)
})


</script>
