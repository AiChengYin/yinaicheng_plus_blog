<template>
  <div class="cmd-container">
    <header class="cmd-header">
      <h1>技術ブログ</h1>
    </header>
    
    <div class="cmd-content">
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
import BlogService from '../services/BlogService'

const blogs = ref<any[]>([])
const selectedCategory = ref<string | null>(null)
const selectedSubCategory = ref<string | null>(null)
const selectedBlog = ref<any | null>(null)
const commandInput = ref('')

const categories = ref([
  'Linux',
  '多线程并发编程',
  '算法与数据结构',
  '关系型数据库',
  '高并发网络编程',
  '负载均衡中间件',
  '分布式消息中间件'
])

// 示例数据，用于测试
const sampleBlogs = [
  {
    id: "1",
    title: "深入理解HashMap源码分析",
    content: "# HashMap源码解析\n\nHashMap是Java中最常用的数据结构之一，本文将深入分析其源码实现。\n\n## 数据结构\n\nHashMap底层采用数组+链表+红黑树的结构：\n\n1. 数组用于存储元素\n2. 链表用于解决哈希冲突\n3. 红黑树用于优化链表过长的情况\n\n## 核心方法\n\n### put方法\n```java\npublic V put(K key, V value) {\n    return putVal(hash(key), key, value, false, true);\n}\n```\n\n### get方法\n```java\npublic V get(Object key) {\n    Node<K,V> e;\n    return (e = getNode(hash(key), key)) == null ? null : e.value;\n}\n```\n\n## 扩容机制\n\n当元素数量超过阈值时，HashMap会进行扩容，扩容因子默认为0.75。",
    categoryLevel1: "算法与数据结构",
    categoryLevel2: "集合框架",
    createTime: "2023-05-15T10:30:00Z"
  },
  {
    id: "2",
    title: "MySQL索引优化实战",
    content: "# MySQL索引优化\n\n数据库索引是提升查询性能的关键技术，本文通过实际案例分析索引优化策略。\n\n## 索引类型\n\n1. **主键索引**：唯一且非空\n2. **唯一索引**：唯一但可为空\n3. **普通索引**：无限制\n4. **组合索引**：多个字段组合\n\n## 优化建议\n\n### 组合索引顺序\n\n遵循最左前缀原则：\n\n```sql\n-- 创建组合索引\nCREATE INDEX idx_name_age_city ON users(name, age, city);\n\n-- 有效使用索引\nSELECT * FROM users WHERE name = 'John' AND age = 25;\n\n-- 部分使用索引\nSELECT * FROM users WHERE name = 'John' AND city = 'Beijing';\n\n-- 无法使用索引\nSELECT * FROM users WHERE age = 25 AND city = 'Beijing';\n```\n\n## 性能对比\n\n通过EXPLAIN分析查询计划，优化前后性能提升300%。",
    categoryLevel1: "关系型数据库",
    categoryLevel2: "性能优化",
    createTime: "2023-06-20T14:45:00Z"
  },
  {
    id: "3",
    title: "Netty高性能网络编程",
    content: "# Netty网络编程框架\n\nNetty是一个高性能的异步事件驱动的网络应用框架，广泛应用于高并发场景。\n\n## 核心组件\n\n### EventLoop\n事件循环，处理I/O操作和任务执行。\n\n### Channel\n网络连接的抽象，支持多种协议。\n\n### ByteBuf\n优化的字节缓冲区，替代传统的ByteBuffer。\n\n## 内存管理\n\nNetty采用池化内存管理，减少GC压力：\n\n```java\n// 使用池化内存分配器\nByteBufAllocator allocator = PooledByteBufAllocator.DEFAULT;\nByteBuf buffer = allocator.buffer(1024);\n```\n\n## 高性能特性\n\n1. 零拷贝技术\n2. 内存池化\n3. 灵活的线程模型\n4. 无锁化设计",
    categoryLevel1: "高并发网络编程",
    categoryLevel2: "框架应用",
    createTime: "2023-07-10T09:15:00Z"
  }
]

// 获取二级分类
const subCategories = computed(() => {
  if (!selectedCategory.value) return []
  
  const subCats = blogs.value
    .filter(blog => blog.categoryLevel1 === selectedCategory.value)
    .map(blog => blog.categoryLevel2)
  
  // 去重
  return [...new Set(subCats)]
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

onMounted(async () => {
  try {
    blogs.value = await BlogService.getAllBlogs()
    console.log('获取到的博客数据:', blogs.value)
    // 如果没有获取到数据，使用示例数据
    if (blogs.value.length === 0) {
      blogs.value = sampleBlogs
    }
    // 默认选择第一个分类
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0]
      console.log('默认选择的一级分类:', selectedCategory.value)
    }
  } catch (error) {
    console.error('获取技術ブログ内容失败:', error)
    // 出错时使用示例数据
    blogs.value = sampleBlogs
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0]
    }
  }
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
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const handleCommand = () => {
  // 简单的命令解析
  const cmd = commandInput.value.trim()
  if (cmd.startsWith('查看')) {
    const categoryName = cmd.substring(2).trim()
    const category = categories.value.find(c => c.includes(categoryName))
    if (category) {
      selectCategory(category)
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

.blog-main {
  flex: 1;
  display: grid;
  grid-template-columns: 200px 200px 250px 1fr;
  gap: 8px;
  height: 100%;
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
  
  .cmd-content {
    padding: 4px;
  }
}
</style>