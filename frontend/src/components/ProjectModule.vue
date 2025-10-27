<template>
  <CmdCard title="プロジェクト紹介" :show-console="true" console-placeholder="入力練習">
    <div class="project-grid">
      <div 
        v-for="project in projects" 
        :key="project.id" 
        class="project-card"
        @click="viewProject(project)"
      >
        <div class="project-header">
          <h3 class="project-title">{{ project.projectCategory }}</h3>
        </div>
        <div class="project-content">
          <p class="project-description">{{ project.content }}</p>
          <div class="project-tech-stack" v-if="project.technologyStack">
            <span class="tech-label">技术栈:</span>
            <span class="tech-content">{{ project.technologyStack }}</span>
          </div>
        </div>
      </div>
    </div>
  </CmdCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CmdCard from './CmdCard.vue'
import ProjectService from '../services/ProjectService'

const projects = ref<any[]>([])

onMounted(async () => {
  try {
    projects.value = await ProjectService.getAllProjects()
  } catch (error) {
    console.error('获取プロジェクト紹介内容失败:', error)
  }
})

const viewProject = (project: any) => {
  // 这里可以触发路由跳转到项目详情页
  console.log('查看项目:', project)
  // 示例：router.push(`/projects/${project.id}`)
}
</script>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  padding: 12px;
  height: 100%;
}

.project-card {
  background: #000;
  border: 1px solid #00ff00;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
}

.project-card:hover {
  background-color: rgba(0, 255, 0, 0.1);
}

.project-header {
  border-bottom: 1px solid #00ff00;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.project-title {
  margin: 0;
  font-size: 18px;
  color: #00ff00;
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.project-description {
  margin: 0;
  color: #00ff00;
  word-break: break-all;
  flex: 1;
}

.project-tech-stack {
  display: flex;
  gap: 5px;
  font-size: 12px;
}

.tech-label {
  color: #008000;
  font-weight: bold;
}

.tech-content {
  color: #00ff00;
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>