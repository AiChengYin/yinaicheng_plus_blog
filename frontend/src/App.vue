<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
</script>

<template>
  <div class="app-container">
    <header class="cmd-navbar">
      <div class="navbar-content">
        <div class="navbar-title">個人ブログ</div>
        <nav class="navbar-links">
          <RouterLink to="/">ホーム</RouterLink>
          <RouterLink to="/japanese">日本語学習</RouterLink>
          <RouterLink to="/projects">プロジェクト紹介</RouterLink>
          <RouterLink to="/blog">技術ブログ</RouterLink>
          <RouterLink to="/interview">面接ブログ</RouterLink>
          <RouterLink to="/speakingPractice">会話練習</RouterLink>
          <!-- 暂时移除CMS模块 -->
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
}

.cmd-navbar {
  background: #000;
  color: #00ff00;
  border-bottom: 1px solid #00ff00;
  font-family: monospace;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  max-width: 100%;
  margin: 0 auto;
}

.navbar-title {
  font-weight: bold;
  font-size: 18px;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.navbar-links a {
  color: #00ff00;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
}

.navbar-links a.router-link-exact-active {
  color: #000;
  background: #00ff00;
}

.navbar-links a:hover {
  border-color: #00ff00;
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 10px;
  }
  
  .navbar-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>