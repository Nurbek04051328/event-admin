<template>
  <div>
    <input
      type="text"
      v-model="formattedAmount"
      @input="handleInput"
      @focus="onFocus"
      placeholder="0.00"
    />
    <p>Raw value: {{ amount }} UZS</p>
    <p>Formatted: {{ formattedAmount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const amount = ref(0)
const formattedAmount = ref('')

// Uzbekistani Som currency formatting
const currencyOptions = {
  style: 'currency',
  currency: 'UZS', // Uzbekistani Som currency code
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

const formatter = new Intl.NumberFormat('uz-UZ', currencyOptions) // Using Uzbek locale

const formatCurrency = () => {
  formattedAmount.value = formatter.format(amount.value)
}

const handleInput = (event) => {
  let value = event.target.value

  // Remove everything except numbers and decimal point
  value = value.replace(/[^0-9.]/g, '')

  // Ensure only one decimal point
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }

  // Limit decimal places to 2
  if (parts[1] && parts[1].length > 2) {
    value = parts[0] + '.' + parts[1].slice(0, 2)
  }

  // Update values
  amount.value = parseFloat(value) || 0
  formattedAmount.value = value
  formatCurrency()
}

const onFocus = () => {
  // Show raw number without currency formatting when focused
  formattedAmount.value = amount.value.toString()
}

// Initialize
formatCurrency()
</script>

<style scoped>
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
