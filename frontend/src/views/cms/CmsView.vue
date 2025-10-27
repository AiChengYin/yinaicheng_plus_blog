<script setup lang="ts">
import { ref } from 'vue'
import CmsJapaneseStudy from './CmsJapaneseStudy.vue'
import CmsProjects from './CmsProjects.vue'
import CmsBlog from './CmsBlog.vue'

const activeTab = ref('japanese')
</script>

<template>
  <div class="cms">
    <h1>CMS管理系统</h1>
    
    <div class="tabs">
      <button 
        :class="{ active: activeTab === 'japanese' }" 
        @click="activeTab = 'japanese'"
      >
        日本語学習管理
      </button>
      <button 
        :class="{ active: activeTab === 'projects' }" 
        @click="activeTab = 'projects'"
      >
        プロジェクト紹介管理
      </button>
      <button 
        :class="{ active: activeTab === 'blog' }" 
        @click="activeTab = 'blog'"
      >
        技術ブログ管理
      </button>
    </div>
    
    <div class="tab-content">
      <CmsJapaneseStudy v-if="activeTab === 'japanese'" />
      <CmsProjects v-if="activeTab === 'projects'" />
      <CmsBlog v-if="activeTab === 'blog'" />
    </div>
  </div>
</template>

<style scoped>
.cms {
  padding: 2rem;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
}

.tabs button {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #ddd;
  border-bottom: none;
  cursor: pointer;
  margin-right: 0.5rem;
}

.tabs button.active {
  background-color: #f0f0f0;
  font-weight: bold;
}

.tab-content {
  min-height: 400px;
}
</style>