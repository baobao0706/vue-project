<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="home-container">
    <h1>欢迎回来，{{ userStore.username }}</h1>
    <p>您已成功登录系统</p>
  </div>
  
</template>

<style scoped>
.home-container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

p {
  font-size: 16px;
  color: #666;
}
</style> 