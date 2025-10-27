<template>
  <div class="blog-detail">
    <div class="cmd-card">
      <header class="card-header">
        <button class="back-button" @click="goBack">← 返回</button>
        <h1 class="blog-title">{{ blog.title }}</h1>
      </header>
      <div class="card-content">
        <div class="blog-meta">
          <span class="meta-item">分类: {{ blog.categoryLevel1 }} / {{ blog.categoryLevel2 }}</span>
          <span class="meta-item">发布时间: {{ formatDate(blog.createTime) }}</span>
        </div>
        <div class="blog-content" v-html="renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  blog: any
}>()

const router = useRouter()

// 简单的 Markdown 渲染函数
const renderMarkdown = (markdown: string) => {
  // 替换段落
  let html = markdown.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  
  // 替换标题
  html = html.replace(/^<p>### (.*?)/gm, '<h3>$1</h3><p>')
  html = html.replace(/^<p>## (.*?)/gm, '<h2>$1</h2><p>')
  html = html.replace(/^<p># (.*?)/gm, '<h1>$1</h1><p>')
  
  // 替换粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 替换代码块
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  
  // 替换行内代码
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  
  return html
}

const renderedContent = computed(() => {
  return renderMarkdown(props.blog.content || '')
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.blog-detail {
  padding: 20px;
  background-color: #000;
  min-height: 100vh;
}

.cmd-card {
  background: #000;
  border: 1px solid #00ff00;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  font-family: monospace;
}

.card-header {
  padding: 12px;
  border-bottom: 1px solid #00ff00;
  color: #00ff00;
  position: relative;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 12px;
  background: transparent;
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 5px 10px;
  cursor: pointer;
  font-family: monospace;
}

.back-button:hover {
  background: rgba(0, 255, 0, 0.1);
}

.blog-title {
  text-align: center;
  margin: 0;
  font-size: 24px;
}

.card-content {
  flex: 1;
  padding: 20px;
  color: #00ff00;
  overflow-y: auto;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #00ff00;
  margin-bottom: 20px;
  font-size: 14px;
}

.meta-item {
  color: #008000;
}

.blog-content {
  line-height: 1.6;
}

.blog-content h1,
.blog-content h2,
.blog-content h3 {
  color: #00ff00;
  margin: 20px 0 10px 0;
}

.blog-content p {
  margin: 10px 0;
}

.blog-content code {
  background: rgba(0, 255, 0, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
}

.blog-content pre {
  background: #001a00;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
}

.blog-content pre code {
  background: transparent;
  padding: 0;
}
</style>