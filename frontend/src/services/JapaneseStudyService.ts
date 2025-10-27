// 日本語学習服务
const API_BASE_URL = 'http://localhost:8080/api/japanese'

export default class JapaneseStudyService {
  // 获取所有日本語学習内容
  static async getAllStudies(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('获取日本語学習内容失败:', error)
      throw error
    }
  }

  // 根据分类获取日本語学習内容
  static async getStudiesByCategory(category: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${category}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`获取分类 ${category} 的日本語学習内容失败:`, error)
      throw error
    }
  }

  // 添加新的学习内容
  static async addStudy(study: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(study)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('添加日本語学習内容失败:', error)
      throw error
    }
  }

  // 更新学习内容
  static async updateStudy(id: string, study: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(study)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('更新日本語学習内容失败:', error)
      throw error
    }
  }

  // 删除学习内容
  static async deleteStudy(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('删除日本語学習内容失败:', error)
      throw error
    }
  }
}