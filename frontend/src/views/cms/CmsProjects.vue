<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectService from '@/services/ProjectService'

const projects = ref<any[]>([])
const newProject = ref({
  content: '',
  projectCategory: '网易云计算计费出账'
})
const categories = [
  '网易云计算计费出账',
  '网易数帆云公共项目',
  '三叉戟智能集运平台',
  '洋山四期大数据运营效率分析系统',
  '基于流量回放的自动化回归测试工具'
]

onMounted(async () => {
  await loadProjects()
})

const loadProjects = async () => {
  try {
    projects.value = await ProjectService.getAllProjects()
  } catch (error) {
    console.error('加载项目内容失败:', error)
  }
}

const addProject = async () => {
  try {
    await ProjectService.addProject(newProject.value)
    newProject.value.content = ''
    await loadProjects()
  } catch (error) {
    console.error('添加项目内容失败:', error)
  }
}

const deleteProject = async (id: string) => {
  try {
    await ProjectService.deleteProject(id)
    await loadProjects()
  } catch (error) {
    console.error('删除项目内容失败:', error)
  }
}
</script>

<template>
  <div class="cms-projects">
    <h2>プロジェクト紹介管理</h2>
    
    <div class="form">
      <h3>添加新项目</h3>
      <div class="form-group">
        <label>内容:</label>
        <textarea v-model="newProject.content" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label>项目分类:</label>
        <select v-model="newProject.projectCategory">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <button @click="addProject">添加</button>
    </div>
    
    <div class="list">
      <h3>现有项目</h3>
      <div v-for="project in projects" :key="project.id" class="project-item">
        <div class="project-content">
          <strong>{{ project.projectCategory }}</strong>: {{ project.content }}
        </div>
        <button @click="deleteProject(project.id)" class="delete-btn">删除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cms-projects {
  padding: 1rem;
}

.form {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.list {
  margin-top: 2rem;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.project-content {
  flex: 1;
}
</style>