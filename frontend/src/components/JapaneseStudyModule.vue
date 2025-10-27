<template>
  <CmdCard title="日本語学習" :show-console="true" console-placeholder="入力練習">
    <div class="study-grid">
      <div 
        v-for="category in categories" 
        :key="category" 
        class="study-card" 
        :class="{ active: activeCategory === category }"
      >
        <div class="card-header">{{ category }}</div>
        <ul class="study-list">
          <li 
            v-for="study in getStudiesByCategory(category)" 
            :key="study.id" 
            class="study-item"
          >
            {{ study.content }}
          </li>
        </ul>
      </div>
    </div>
  </CmdCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CmdCard from './CmdCard.vue'
import JapaneseStudyService from '../services/JapaneseStudyService'

const studies = ref<any[]>([])
const activeCategory = ref('')
const categories = ref([
  '文句',
  '文法',
  '必要な覚える単語',
  '聞き取れない単語',
  '話題'
])

onMounted(async () => {
  try {
    studies.value = await JapaneseStudyService.getAllStudies()
  } catch (error) {
    console.error('获取日本語学習内容失败:', error)
  }
})

const getStudiesByCategory = (category: string) => {
  return studies.value.filter(study => study.category === category)
}

const handleCommand = (command: string) => {
  // 解析命令，例如 "学习 文法" -> 激活 "文法" 卡片
  if (command.startsWith('学习')) {
    const categoryKeyword = command.substring(2).trim()
    switch (categoryKeyword) {
      case '文句':
        activeCategory.value = '文句'
        break
      case '文法':
        activeCategory.value = '文法'
        break
      case '必要な覚える単語':
        activeCategory.value = '必要な覚える単語'
        break
      case '聞き取れない単語':
        activeCategory.value = '聞き取れない単語'
        break
      case '话题':
        activeCategory.value = '話題'
        break
      default:
        activeCategory.value = ''
    }
  } else {
    activeCategory.value = ''
  }
}

// 监听来自 CmdCard 的命令事件
defineExpose({ handleCommand })
</script>

<style scoped>
.study-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 12px;
  height: 100%;
}

.study-card {
  background: #000;
  border: 1px solid #00ff00;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.study-card.active {
  border-color: #ffff00;
  box-shadow: 0 0 10px #ffff00;
}

.study-card .card-header {
  padding: 8px;
  border-bottom: 1px solid #00ff00;
  font-weight: bold;
  color: #00ff00;
}

.study-list {
  list-style: none;
  margin: 0;
  padding: 8px;
  flex: 1;
  overflow-y: auto;
}

.study-item {
  padding: 6px;
  border-bottom: 1px dashed #00ff00;
  word-break: break-all;
}

.study-item:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .study-grid {
    grid-template-columns: 1fr;
  }
}
</style>