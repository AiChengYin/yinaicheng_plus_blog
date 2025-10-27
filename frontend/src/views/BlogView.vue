<script setup lang="ts">
import TechBlog from '@/components/TechBlog.vue'
</script>

<template>
  <div class="blog-view">
    <TechBlog />
  </div>
</template>

<style scoped>
.blog-view {
  padding: 0;
  background-color: #000;
  min-height: calc(100vh - 60px);
  width: 100%;
}
</style>