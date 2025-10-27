<template>
  <div class="home">
    <div class="modules-grid">
      <ProfileModule />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileModule from '@/components/ProfileModule.vue'
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #000;
  min-height: 100vh;
  width: 100%;
}

.modules-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
}

@media (max-width: 768px) {
  .home {
    padding: 10px;
  }
}
</style>