// 技術ブログ服务
const API_BASE_URL = 'http://localhost:8080/api/blog'

export default class BlogService {
  // 获取所有技術ブログ文章
  static async getAllBlogs(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('获取技術ブログ文章失败:', error)
      throw error
    }
  }

  // 根据一级分类获取文章
  static async getBlogsByCategoryLevel1(categoryLevel1: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${categoryLevel1}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`获取一级分类 ${categoryLevel1} 的文章失败:`, error)
      throw error
    }
  }

  // 根据一级和二级分类获取文章
  static async getBlogsByCategories(categoryLevel1: string, categoryLevel2: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${categoryLevel1}/${categoryLevel2}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`获取分类 ${categoryLevel1}/${categoryLevel2} 的文章失败:`, error)
      throw error
    }
  }

  // 添加新的博客文章
  static async addBlog(blog: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('添加博客文章失败:', error)
      throw error
    }
  }

  // 更新博客文章
  static async updateBlog(id: string, blog: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('更新博客文章失败:', error)
      throw error
    }
  }

  // 删除博客文章
  static async deleteBlog(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('删除博客文章失败:', error)
      throw error
    }
  }
}