<template>
  <div class="project-container">
    <header>プロジェクト紹介</header>

    <main class="project-main">
      <!-- 项目列表区 -->
      <section class="project-list">
        <div class="section-header">项目列表</div>
        <ul>
          <li 
            v-for="project in projects" 
            :key="project.id"
            @click="showDetail(project)"
            :class="{ active: selectedProject && selectedProject.id === project.id }"
          >
            {{ project.projectCategory }}
          </li>
        </ul>
      </section>

      <!-- 项目详情区 -->
      <section class="project-detail">
        <div class="section-header">项目详情</div>
        <div class="detail-content">
          <div v-if="selectedProject" class="project-content" v-html="renderedContent"></div>
          <div v-else class="placeholder">请选择一个项目查看详细信息...</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import ProjectService from '../services/ProjectService'

const projects = ref<any[]>([])
const selectedProject = ref<any>(null)

// 示例数据，用于测试
const sampleProjects = [
  {
    id: "1",
    projectCategory: "网易云计费系统项目总结",
    content: `
# 网易云计费系统项目总结 🚀
- 项目目标：实现云资源使用量的精确计费与自动化出账。
- 技术栈：Java / Spring Boot / MyBatis / MySQL / Redis / Kafka / Kubernetes / ELK。
- 成果：计费精度提升，账单透明度提高，单任务生成效率约提升 15%。
- 收获：深入理解了 **高并发计费系统** 的设计要点、稳定性与扩展性。
    `
  },
  {
    id: "2",
    projectCategory: "流量回放平台",
    content: `
# 流量回放平台 🔄
- 功能：模拟真实业务流量，用于测试和回归验证。
- 技术：Go / Kafka / Docker。
- 成果：帮助 QA 团队快速复现问题，大幅缩短测试周期。
    `
  },
  {
    id: "3",
    projectCategory: "智能TOS系统",
    content: `
# 智能 TOS 系统 📦
- 功能：用于港口作业调度和数字孪生。
- 技术：Java / Spring Cloud / Vue。
- 成果：提升港口作业效率 20%，助力智慧港口建设。
    `
  }
]

onMounted(async () => {
  try {
    projects.value = await ProjectService.getAllProjects()
    // 如果没有获取到数据，使用示例数据
    if (projects.value.length === 0) {
      projects.value = sampleProjects
    }
    // 默认选择第一个项目
    if (projects.value.length > 0) {
      selectedProject.value = projects.value[0]
    }
  } catch (error) {
    console.error('获取プロジェクト紹介内容失败:', error)
    // 出错时使用示例数据
    projects.value = sampleProjects
    if (projects.value.length > 0) {
      selectedProject.value = projects.value[0]
    }
  }
})

const showDetail = (project: any) => {
  selectedProject.value = project
}

const renderedContent = computed(() => {
  if (!selectedProject.value) return ''
  return marked(selectedProject.value.content || '')
})
</script>

<style scoped>
.project-container {
  margin: 0;
  background: #000;
  color: #0f0;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
}

header {
  padding: 12px;
  border-bottom: 1px solid #0f0;
  font-weight: bold;
  font-size: 18px;
}

.project-main {
  flex: 1;
  display: flex;
  padding: 12px;
  gap: 12px;
}

.project-list {
  flex: 1;
  border: 1px solid #0f0;
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

.section-header {
  padding: 8px 12px;
  border-bottom: 1px solid #0f0;
  font-weight: bold;
  background: rgba(0, 30, 0, 0.5);
}

.project-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.project-list li {
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px dashed #0f0;
}

.project-list li:last-child {
  border-bottom: none;
}

.project-list li:hover,
.project-list li.active {
  background: rgba(0, 255, 0, 0.2);
}

.project-detail {
  flex: 2;
  border: 1px solid #0f0;
  display: flex;
  flex-direction: column;
}

.detail-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #008000;
}

.project-content h1,
.project-content h2,
.project-content h3 {
  color: #0f0;
  border-bottom: 1px dashed #0f0;
  padding-bottom: 4px;
  margin: 16px 0 8px 0;
}

.project-content p {
  margin: 8px 0;
  line-height: 1.5;
}

.project-content ul {
  padding-left: 20px;
}

.project-content li {
  margin: 4px 0;
}

.project-content code {
  background: rgba(0, 255, 0, 0.1);
  padding: 2px 4px;
  border: 1px solid #0f0;
  border-radius: 3px;
}

.project-content pre {
  background: #001a00;
  padding: 12px;
  border: 1px solid #0f0;
  border-radius: 5px;
  overflow-x: auto;
  margin: 12px 0;
}

.project-content pre code {
  background: transparent;
  padding: 0;
  border: none;
}

@media (max-width: 768px) {
  .project-main {
    flex-direction: column;
  }
  
  .project-list {
    max-width: none;
  }
}
</style>