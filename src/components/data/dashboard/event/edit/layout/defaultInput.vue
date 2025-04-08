<template>
  <div class="space-y-2">
    <label v-if="label" :for="name" class="block text-sm font-medium leading-6 text-gray-900">
      <span class="text-red-600" v-if="error?.toString()?.length > 0">*</span>
      {{ label }}
    </label>
    <div class="relative rounded-md shadow-none">
      <input
        :type="type"
        :id="name"
        autocomplete="off"
        v-model="model"
        :disabled="disabled"
        :placeholder="placeholder"
        class="input-text"
        @keypress.enter="$emit('enter')"
        @input="$emit('input', $event.target.value)"        
      />
      
    </div>
  </div>
</template>
<script setup>
const model = defineModel()
defineProps([
  'label',
  'placeholder',
  'name',
  'enter',
  'error',
  'disabled',
  'suffix',
  'type',
  'disabled',
])
import { XCircleIcon } from '@heroicons/vue/24/outline'
defineEmits(['enter', 'input'])
</script>
<style lang=""></style>
