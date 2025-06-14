<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <div id="app" class="full-height">
    <RouterView />
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>
