<script setup lang="ts">
import { ref, onMounted } from 'vue'
import JapaneseStudyService from '@/services/JapaneseStudyService'

const studies = ref<any[]>([])
const newStudy = ref({
  content: '',
  category: '文句'
})
const categories = ['文句', '每日文法', '新单词', '复习单词', '练习话题']

onMounted(async () => {
  await loadStudies()
})

const loadStudies = async () => {
  try {
    studies.value = await JapaneseStudyService.getAllStudies()
  } catch (error) {
    console.error('加载日本語学習内容失败:', error)
  }
}

const addStudy = async () => {
  try {
    await JapaneseStudyService.addStudy(newStudy.value)
    newStudy.value.content = ''
    await loadStudies()
  } catch (error) {
    console.error('添加日本語学習内容失败:', error)
  }
}

const deleteStudy = async (id: string) => {
  try {
    await JapaneseStudyService.deleteStudy(id)
    await loadStudies()
  } catch (error) {
    console.error('删除日本語学習内容失败:', error)
  }
}
</script>

<template>
  <div class="cms-japanese">
    <h2>日本語学習管理</h2>
    
    <div class="form">
      <h3>添加新内容</h3>
      <div class="form-group">
        <label>内容:</label>
        <textarea v-model="newStudy.content" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label>分类:</label>
        <select v-model="newStudy.category">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <button @click="addStudy">添加</button>
    </div>
    
    <div class="list">
      <h3>现有内容</h3>
      <div v-for="study in studies" :key="study.id" class="study-item">
        <div class="study-content">
          <strong>{{ study.category }}</strong>: {{ study.content }}
        </div>
        <button @click="deleteStudy(study.id)" class="delete-btn">删除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cms-japanese {
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

.study-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.study-content {
  flex: 1;
}
</style>