<template>
  <select
    :id="name"
    :name="name"
    v-model="model"
    :placeholder="placeholder"
    class="select"
    @change="$emit('change', model)"
  >
    <option value="" class="text-gray-500" selected disabled>
      {{ placeholder || 'Ro`yhatdan tanlang' }}
    </option>
    <option v-for="opt of options" :key="opt._id" :value="opt._id">
      {{ opt[option_title] }}
    </option>
  </select>
</template>
<script setup>
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
])
defineEmits(['change'])
import { XCircleIcon } from '@heroicons/vue/24/outline'
</script>
<style lang=""></style>
