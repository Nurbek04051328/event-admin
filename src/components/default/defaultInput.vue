<template>
  <div class="space-y-2">
    <label v-if="label" :for="name" class="block text-sm font-medium leading-6 text-[#645A77]"
      >{{ label }}
    </label>
    <div class="relative rounded-md shadow-sm">
      <input
        :type="type"
        :id="name"
        autocomplete="off"
        v-model="model"
        :placeholder="placeholder"
        class="input-text text-[#645A77]"
        :class="[
          customClass,
          {
            'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
          }
        ]"
        :min="min"
        :disabled="disabled"
      />
    </div>
  </div>
  <span v-if="error">
    <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
  </span>
</template>
<script setup>
const model = defineModel()
defineProps(['label', 'placeholder', 'min', 'name', 'enter', 'error', 'disabled', 'suffix', 'type', 'customClass'])
</script>
<style lang=""></style>
