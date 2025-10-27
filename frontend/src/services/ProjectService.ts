// プロジェクト紹介服务
const API_BASE_URL = 'http://localhost:8080/api/projects'

export default class ProjectService {
  // 获取所有プロジェクト紹介内容
  static async getAllProjects(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('获取プロジェクト紹介内容失败:', error)
      throw error
    }
  }

  // 根据项目分类获取内容
  static async getProjectsByCategory(projectCategory: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${projectCategory}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`获取分类 ${projectCategory} 的项目内容失败:`, error)
      throw error
    }
  }

  // 添加新的项目内容
  static async addProject(project: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('添加项目内容失败:', error)
      throw error
    }
  }

  // 更新项目内容
  static async updateProject(id: string, project: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('更新项目内容失败:', error)
      throw error
    }
  }

  // 删除项目内容
  static async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('删除项目内容失败:', error)
      throw error
    }
  }
}