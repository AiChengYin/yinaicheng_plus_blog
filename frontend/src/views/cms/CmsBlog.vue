<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogService from '@/services/BlogService'

const blogs = ref<any[]>([])
const newBlog = ref({
  title: '',
  content: '',
  categoryLevel1: '算法与数据结构',
  categoryLevel2: ''
})
const categories = [
  'Linux',
  '多线程并发编程',
  '算法与数据结构',
  '关系型数据库',
  '高并发网络编程',
  '负载均衡中间件',
  '分布式消息中间件'
]

onMounted(async () => {
  await loadBlogs()
})

const loadBlogs = async () => {
  try {
    blogs.value = await BlogService.getAllBlogs()
  } catch (error) {
    console.error('加载博客文章失败:', error)
  }
}

const addBlog = async () => {
  try {
    await BlogService.addBlog(newBlog.value)
    newBlog.value.title = ''
    newBlog.value.content = ''
    newBlog.value.categoryLevel2 = ''
    await loadBlogs()
  } catch (error) {
    console.error('添加博客文章失败:', error)
  }
}

const deleteBlog = async (id: string) => {
  try {
    await BlogService.deleteBlog(id)
    await loadBlogs()
  } catch (error) {
    console.error('删除博客文章失败:', error)
  }
}
</script>

<template>
  <div class="cms-blog">
    <h2>技術ブログ管理</h2>
    
    <div class="form">
      <h3>添加新文章</h3>
      <div class="form-group">
        <label>标题:</label>
        <input v-model="newBlog.title" type="text" />
      </div>
      <div class="form-group">
        <label>内容:</label>
        <textarea v-model="newBlog.content" rows="5"></textarea>
      </div>
      <div class="form-group">
        <label>一级分类:</label>
        <select v-model="newBlog.categoryLevel1">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>二级分类:</label>
        <input v-model="newBlog.categoryLevel2" type="text" />
      </div>
      <button @click="addBlog">添加</button>
    </div>
    
    <div class="list">
      <h3>现有文章</h3>
      <div v-for="blog in blogs" :key="blog.id" class="blog-item">
        <div class="blog-content">
          <strong>{{ blog.categoryLevel1 }} - {{ blog.categoryLevel2 }}</strong>
          <h4>{{ blog.title }}</h4>
          <p>{{ blog.content }}</p>
        </div>
        <button @click="deleteBlog(blog.id)" class="delete-btn">删除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cms-blog {
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

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 150px;
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

.blog-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #eee;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.blog-content {
  flex: 1;
}

.blog-content h4 {
  margin: 0.5rem 0;
}

.blog-content p {
  margin: 0.5rem 0;
  color: #666;
}
</style>