<template>
  <div class="cmd-container">
    <header class="cmd-header">
      <h1>面试专栏</h1>
    </header>
    
    <div class="cmd-content">
      <main class="interview-main">
        <!-- 第一列：分类列表 -->
        <section class="category-section">
          <div class="section-header">分类</div>
          <ul class="category-list">
            <li 
              v-for="category in categories" 
              :key="category" 
              :class="{ active: selectedCategory === category }"
              @click="selectCategory(category)"
            >
              {{ category }}
            </li>
          </ul>
        </section>

        <!-- 第二列：标题列表 -->
        <section class="titles-section">
          <div class="section-header">标题</div>
          <ul class="titles-list">
            <li 
              v-for="interview in interviewsByCategory" 
              :key="interview.id" 
              :class="{ active: selectedInterview && selectedInterview.id === interview.id }"
              @click="selectInterview(interview)"
            >
              {{ interview.title }}
            </li>
          </ul>
        </section>

        <!-- 第三列：内容详情 -->
        <section class="content-section">
          <div class="section-header">内容详情</div>
          <div class="content-detail" v-if="selectedInterview" v-html="renderedContent"></div>
          <div class="content-placeholder" v-else>请选择一个标题查看内容…</div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import InterviewService, { Interview } from '@/services/InterviewService'

const categories = ref<string[]>([])
const interviewsByCategory = ref<Interview[]>([])
const selectedCategory = ref<string | null>(null)
const selectedInterview = ref<Interview | null>(null)

// 获取所有分类
const fetchCategories = async () => {
  try {
    categories.value = await InterviewService.getAllCategories()
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

// 根据分类获取面试记录
const fetchInterviewsByCategory = async (category: string) => {
  try {
    interviewsByCategory.value = await InterviewService.getInterviewsByCategory(category)
  } catch (error) {
    console.error(`获取分类 ${category} 的面试记录失败:`, error)
  }
}

// 选择分类
const selectCategory = (category: string) => {
  selectedCategory.value = category
  selectedInterview.value = null
  fetchInterviewsByCategory(category)
}

// 选择面试记录
const selectInterview = (interview: Interview) => {
  selectedInterview.value = interview
}

// 渲染的Markdown内容
const renderedContent = computed(() => {
  if (!selectedInterview.value) return ''
  return marked(selectedInterview.value.content || '')
})

// 组件挂载时获取分类
onMounted(() => {
  fetchCategories()
})
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
  border-bottom: 1px solid #0f0;
  font-weight: bold;
  font-size: 18px;
}

.cmd-header h1 {
  margin: 0;
  font-size: 24px;
}

.cmd-content {
  flex: 1;
  padding: 8px;
  overflow: hidden;
}

.interview-main {
  flex: 1;
  display: grid;
  grid-template-columns: 200px 250px 1fr;
  gap: 8px;
  height: 100%;
}

.category-section,
.titles-section,
.content-section {
  border: 1px solid #0f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.section-header {
  padding: 6px;
  border-bottom: 1px solid #0f0;
  font-weight: bold;
  background: rgba(0, 30, 0, 0.5);
}

.category-list,
.titles-list {
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.category-list li,
.titles-list li {
  padding: 6px;
  cursor: pointer;
  border-bottom: 1px dashed #0f0;
}

.category-list li:hover,
.titles-list li:hover {
  background: rgba(0, 255, 0, 0.2);
}

.category-list li.active,
.titles-list li.active {
  background: rgba(0, 200, 0, 0.3);
}

.content-section {
  display: flex;
  flex-direction: column;
}

.content-detail {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  line-height: 1.6;
}

.content-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #008000;
}

.content-detail h1,
.content-detail h2,
.content-detail h3 {
  color: #0f0;
  border-bottom: 1px dashed #0f0;
  padding-bottom: 4px;
  margin: 16px 0 8px 0;
}

.content-detail p {
  margin: 8px 0;
}

.content-detail ul {
  padding-left: 20px;
}

.content-detail li {
  margin: 4px 0;
}

.content-detail code {
  background: rgba(0, 255, 0, 0.1);
  padding: 2px 4px;
  border: 1px solid #0f0;
  border-radius: 3px;
}

.content-detail pre {
  background: #001a00;
  padding: 12px;
  border: 1px solid #0f0;
  border-radius: 5px;
  overflow-x: auto;
  margin: 12px 0;
}

.content-detail pre code {
  background: transparent;
  padding: 0;
  border: none;
}

@media (max-width: 1200px) {
  .interview-main {
    grid-template-columns: 150px 200px 1fr;
  }
}

@media (max-width: 768px) {
  .interview-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
  }
  
  .cmd-content {
    padding: 4px;
  }
}
</style>