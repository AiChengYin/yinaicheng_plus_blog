<template>
  <CmdCard title="技術ブログ" :show-console="true" console-placeholder="入力練習">
    <div class="blog-container">
      <header>技術ブログ</header>
      <main class="blog-main">
        <!-- 第1階層メニュー -->
        <section class="level1-section">
          <div class="section-header">第1階層メニュー</div>
          <ul class="level1-list">
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

        <!-- 第2階層メニュー -->
        <section class="level2-section">
          <div class="section-header">第2階層メニュー</div>
          <ul class="level2-list">
            <li 
              v-for="subCategory in subCategories" 
              :key="subCategory" 
              :class="{ active: selectedSubCategory === subCategory }"
              @click="selectSubCategory(subCategory)"
            >
              {{ subCategory }}
            </li>
          </ul>
        </section>

        <!-- コンテンツタイトル -->
        <section class="titles-section">
          <div class="section-header">コンテンツタイトル</div>
          <ul class="titles-list">
            <li 
              v-for="blog in filteredBlogs" 
              :key="blog.id" 
              :class="{ active: selectedBlog && selectedBlog.id === blog.id }"
              @click="selectBlog(blog)"
            >
              {{ blog.title }}
            </li>
          </ul>
        </section>

        <!-- コンテンツ詳細 -->
        <section class="content-section">
          <div class="section-header">コンテンツ詳細</div>
          <div class="content-detail" v-if="selectedBlog" v-html="renderedContent"></div>
          <div class="content-placeholder" v-else>点击标题显示内容…</div>
        </section>
      </main>
    </div>
  </CmdCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import CmdCard from './CmdCard.vue'
import BlogService from '../services/BlogService'

const blogs = ref<any[]>([])
const categories = ref([
  'Linux',
  '多线程并发编程',
  '算法与数据结构',
  '关系型数据库',
  '高并发网络编程',
  '负载均衡中间件',
  '分布式消息中间件'
])

// 选中的分类
const selectedCategory = ref<string | null>(null)
const selectedSubCategory = ref<string | null>(null)
const selectedBlog = ref<any | null>(null)

onMounted(async () => {
  try {
    blogs.value = await BlogService.getAllBlogs()
    console.log('获取到的博客数据:', blogs.value)
    console.log('博客数据数量:', blogs.value.length)
    
    // 检查数据结构
    if (blogs.value.length > 0) {
      console.log('第一条博客数据示例:', blogs.value[0])
      console.log('categoryLevel1:', blogs.value[0].categoryLevel1)
      console.log('categoryLevel2:', blogs.value[0].categoryLevel2)
    }
    
    // 默认选择第一个分类
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0]
      console.log('默认选择的一级分类:', selectedCategory.value)
    }
  } catch (error) {
    console.error('获取技術ブログ内容失败:', error)
  }
})

// 获取二级分类
const subCategories = computed(() => {
  console.log('当前选中的一级分类:', selectedCategory.value)
  if (!selectedCategory.value) return []
  
  const subCats = blogs.value
    .filter(blog => blog.categoryLevel1 === selectedCategory.value)
    .map(blog => blog.categoryLevel2)
  
  // 去重
  const uniqueSubCats = [...new Set(subCats)]
  console.log('二级分类:', uniqueSubCats)
  return uniqueSubCats
})

// 获取过滤后的博客文章
const filteredBlogs = computed(() => {
  if (!selectedCategory.value && !selectedSubCategory.value) return []
  
  return blogs.value.filter(blog => {
    const categoryMatch = !selectedCategory.value || blog.categoryLevel1 === selectedCategory.value
    const subCategoryMatch = !selectedSubCategory.value || blog.categoryLevel2 === selectedSubCategory.value
    return categoryMatch && subCategoryMatch
  })
})

// 渲染的Markdown内容
const renderedContent = computed(() => {
  if (!selectedBlog.value) return ''
  return marked(selectedBlog.value.content || '')
})

// 选择一级分类
const selectCategory = (category: string) => {
  selectedCategory.value = category
  selectedSubCategory.value = null
  selectedBlog.value = null
}

// 选择二级分类
const selectSubCategory = (subCategory: string) => {
  selectedSubCategory.value = subCategory
  selectedBlog.value = null
}

// 选择博客文章
const selectBlog = (blog: any) => {
  selectedBlog.value = blog
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}
</script>

<style scoped>
.blog-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  padding: 12px;
  border-bottom: 1px solid #0f0;
  font-weight: bold;
  font-size: 18px;
}

.blog-main {
  flex: 1;
  display: grid;
  grid-template-columns: 200px 200px 250px 1fr;
  gap: 8px;
  padding: 8px;
  overflow: hidden;
}

.level1-section,
.level2-section,
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

.level1-list,
.level2-list,
.titles-list {
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.level1-list li,
.level2-list li,
.titles-list li {
  padding: 6px;
  cursor: pointer;
  border-bottom: 1px dashed #0f0;
}

.level1-list li:hover,
.level2-list li:hover,
.titles-list li:hover {
  background: rgba(0, 255, 0, 0.2);
}

.level1-list li.active,
.level2-list li.active,
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
  .blog-main {
    grid-template-columns: 150px 150px 200px 1fr;
  }
}

@media (max-width: 768px) {
  .blog-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
  }
}
</style>