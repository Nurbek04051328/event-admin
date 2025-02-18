<template>
  <label :for="name" class="block text-xs font-medium leading-6 text-[#645A77]">{{ label }}</label>
  <select
    :id="name"
    :name="name"
    v-model="model"
    class="select"
    :class="{
      'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
    }"
    @change="$emit('change', model)"
  >
    <option value="" disabled selected>{{ placeholder || '' }}</option>
    <option v-for="opt of options" :key="opt._id" :value="opt._id">
      {{ opt[option_title] }}
    </option>
  </select>
  <span v-if="error">
    <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
  </span>
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
  'suffix'
])
defineEmits(['change'])
</script>
<style lang=""></style>
