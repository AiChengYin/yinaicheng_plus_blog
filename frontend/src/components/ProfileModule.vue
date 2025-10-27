<template>
  <CmdCard title="自己紹介" :show-console="false">
    <div class="profile-content" v-html="renderedMarkdown"></div>
  </CmdCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CmdCard from './CmdCard.vue'

// 简单的 Markdown 渲染函数（实际项目中可以使用专门的库如 marked.js）
const renderMarkdown = (markdown: string) => {
  // 替换标题
  let html = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 替换粗体
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  
  // 替换斜体
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')
  
  // 替换列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
  
  // 替换段落
  html = html.replace(/^\n/gim, '<br />')
  
  return html
}

// 个人简介内容（可以从后端API获取）
const profileMarkdown = ref(`
# 自己紹介

私はフルスタック開発エンジニアとして、Web技術およびバックエンドアプリケーション開発を中心に経験を積んでまいりました。
フロントエンドからバックエンド、データベース、インフラまで幅広く対応できる点が強みです。

## スキルスタック

- **フロントエンド**: Vue.js, React, JavaScript, HTML5, CSS3
- **バックエンド**: Java, Spring Boot, Node.js
- **データベース**: MongoDB, MySQL, Redis
- **その他**: Docker, Git, Linux

## プロジェクト経験

クラウドコンピューティングプラットフォームやビッグデータ分析システムなど、複数の大規模プロジェクトに参画し、設計から実装・運用まで幅広く担当いたしました。
これらの経験を通じて、安定したシステム構築と性能改善に貢献してまいりました。

## 連絡先

- メール: yac524yinaicheng@gmail.com
- GitHub: https://github.com/AiChengYin
`)

const renderedMarkdown = computed(() => {
  return renderMarkdown(profileMarkdown.value)
})
</script>

<style scoped>
.profile-content {
  padding: 12px;
  color: #00ff00;
  font-family: monospace;
  line-height: 1.6;
  overflow-y: auto;
  height: 100%;
}

.profile-content h1,
.profile-content h2,
.profile-content h3 {
  color: #00ff00;
  margin: 16px 0 8px 0;
}

.profile-content h1 {
  font-size: 24px;
  border-bottom: 1px solid #00ff00;
  padding-bottom: 4px;
}

.profile-content h2 {
  font-size: 20px;
  border-bottom: 1px dashed #00ff00;
  padding-bottom: 4px;
}

.profile-content h3 {
  font-size: 18px;
}

.profile-content ul {
  padding-left: 20px;
}

.profile-content li {
  margin: 5px 0;
}

.profile-content strong {
  color: #ffff00;
}

.profile-content em {
  color: #00ffff;
}
</style>