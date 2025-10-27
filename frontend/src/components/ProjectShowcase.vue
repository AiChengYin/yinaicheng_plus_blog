<template>
  <div class="cmd-container">
    <header class="cmd-header">
      <h1>网易云计费系统项目总结</h1>
    </header>
    
    <div class="cmd-content">
      <div class="projects-layout">
        <!-- 左侧项目列表 -->
        <div class="projects-list">
          <div 
            v-for="project in projects" 
            :key="project.id" 
            class="project-item"
            :class="{ active: selectedProject && selectedProject.id === project.id }"
            @click="selectProject(project)"
          >
            <div class="project-name">{{ project.projectCategory }}</div>
          </div>
        </div>
        
        <!-- 右侧项目详情 -->
        <div class="project-detail">
          <div class="detail-content" v-if="selectedProject">
            <h2 class="detail-title">{{ selectedProject.projectCategory }}</h2>
            <div class="detail-description" v-html="renderedDescription"></div>
            <div class="detail-tech-stack" v-if="selectedProject.technologyStack">
              <h3>技术栈</h3>
              <p>{{ selectedProject.technologyStack }}</p>
            </div>
          </div>
          <div class="detail-placeholder" v-else>
            <p>请选择一个项目查看详情</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 命令行输入区域 -->
    <div class="console">
      <span class="prompt">&gt;</span>
      <input 
        type="text" 
        placeholder="入力練習"
        @keydown.enter="handleCommand"
        v-model="commandInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import ProjectService from '../services/ProjectService'

const projects = ref<any[]>([])
const selectedProject = ref<any>(null)
const commandInput = ref('')

// 示例数据，用于测试
const sampleProjects = [
  {
    id: "1",
    projectCategory: "网易云计算计费出账",
    content: "# 项目简介\n\n负责网易云计算平台的计费出账系统开发，主要功能包括：\n\n- 资源使用量统计与计算\n- 账单生成与导出\n- 计费策略配置与管理\n\n## 技术栈\n\n- Java Spring Boot\n- MySQL\n- Redis\n- RabbitMQ\n\n## 项目成果\n\n- 系统稳定性达到99.99%\n- 支持日处理百万级账单数据\n- 实现计费准确率达到99.9%",
    technologyStack: "Java, Spring Boot, MySQL, Redis, RabbitMQ"
  },
  {
    id: "2",
    projectCategory: "网易数帆云公共项目",
    content: "# 项目概述\n\n参与网易数帆云公共组件开发，主要贡献包括：\n\n- 用户认证与权限管理系统\n- 日志收集与分析平台\n- 监控告警系统\n\n## 使用技术\n\n- Go语言\n- Docker\n- Kubernetes\n- Prometheus\n\n## 项目亮点\n\n- 实现了统一认证，减少各业务线重复开发\n- 日志分析平台提升故障排查效率80%\n- 监控系统覆盖90%以上核心服务",
    technologyStack: "Go, Docker, Kubernetes, Prometheus"
  },
  {
    id: "3",
    projectCategory: "三叉戟智能集运平台",
    content: "# 项目背景\n\n为物流公司开发的智能集运管理平台，主要功能：\n\n- 货物追踪与状态更新\n- 运输路线优化\n- 成本分析与报表\n\n## 技术选型\n\n- Vue.js\n- Node.js\n- MongoDB\n- WebSocket\n\n## 项目价值\n\n- 运输效率提升30%\n- 成本降低15%\n- 客户满意度提升至95%",
    technologyStack: "Vue.js, Node.js, MongoDB, WebSocket"
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

const selectProject = (project: any) => {
  selectedProject.value = project
}

const renderedDescription = computed(() => {
  if (!selectedProject.value) return ''
  return marked(selectedProject.value.content || '')
})

const handleCommand = () => {
  // 简单的命令解析
  const cmd = commandInput.value.trim()
  if (cmd.startsWith('查看')) {
    const projectName = cmd.substring(2).trim()
    const project = projects.value.find(p => p.projectCategory.includes(projectName))
    if (project) {
      selectProject(project)
    }
  }
  commandInput.value = ''
}
</script>

<style scoped>
.cmd-container {
  background: #000;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.cmd-header {
  padding: 12px;
  border-bottom: 1px solid #00ff00;
  font-weight: bold;
}

.cmd-header h1 {
  margin: 0;
  font-size: 24px;
}

.cmd-content {
  flex: 1;
  padding: 12px;
  overflow: hidden;
}

.projects-layout {
  display: flex;
  height: 100%;
  gap: 12px;
}

.projects-list {
  flex: 1;
  border: 1px solid #00ff00;
  border-radius: 6px;
  overflow-y: auto;
  max-width: 300px;
}

.project-item {
  padding: 12px;
  border-bottom: 1px dashed #00ff00;
  cursor: pointer;
}

.project-item:last-child {
  border-bottom: none;
}

.project-item:hover,
.project-item.active {
  background-color: rgba(0, 255, 0, 0.1);
}

.project-name {
  font-weight: bold;
}

.project-detail {
  flex: 3;
  border: 1px solid #00ff00;
  border-radius: 6px;
  overflow-y: auto;
  padding: 12px;
}

.detail-content h2 {
  margin-top: 0;
  border-bottom: 1px solid #00ff00;
  padding-bottom: 8px;
}

.detail-content h3 {
  color: #00ff00;
  margin: 16px 0 8px 0;
}

.detail-description :deep(p) {
  margin: 8px 0;
  line-height: 1.6;
}

.detail-description :deep(ul),
.detail-description :deep(ol) {
  padding-left: 20px;
}

.detail-description :deep(li) {
  margin: 4px 0;
}

.detail-description :deep(code) {
  background: rgba(0, 255, 0, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
}

.detail-description :deep(pre) {
  background: #001a00;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

.detail-description :deep(pre code) {
  background: none;
  padding: 0;
}

.detail-description :deep(strong) {
  color: #ffff00;
}

.detail-description :deep(em) {
  color: #00ffff;
}

.detail-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #008000;
}

.console {
  border-top: 1px solid #00ff00;
  padding: 8px;
  display: flex;
  gap: 6px;
  background: #000;
}

.prompt {
  color: #0f0;
}

.console input {
  flex: 1;
  background: #000;
  border: none;
  outline: none;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
}

.console input::placeholder {
  color: #008000;
}

@media (max-width: 768px) {
  .projects-layout {
    flex-direction: column;
  }
  
  .projects-list {
    max-width: 100%;
    max-height: 200px;
  }
}
</style>