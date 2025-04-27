<template>
  <div class="loading-page">
    <h1>Loading...</h1>
    <div class="spinner"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  color: #333;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #9E55EC;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>




<!-- ticketPackage.title
ticketPackage.commissionRate -->
