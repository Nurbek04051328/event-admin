<template>
  <div >
    <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }} </label>
    <div class="relative  rounded-md shadow-sm">
      <input
        :id="name"
        autocomplete="off"
        v-model="model"
        :placeholder="placeholder"
        v-maska="phoneMask"
        class="input-text"
        :class="[
          customClass,
          {
            'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
          }
        ]"
      />
    </div>
    <span v-if="error">
      <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
    </span>
  </div>
</template>
<script setup>
import { vMaska } from 'maska/vue'
const model = defineModel()
defineProps(['label', 'placeholder', 'name', 'maska', 'enter', 'error', 'disabled', 'suffix', 'customClass'])
const phoneMask = '+998 (##) ###-##-##'
</script>
<style lang=""></style>
