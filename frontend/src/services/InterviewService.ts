// 面试专栏服务
const API_BASE_URL = 'http://localhost:8080/api/interview'

export interface Interview {
  id?: string;
  category: string;
  title: string;
  content: string;
  remark: string;
}

export default class InterviewService {
  // 获取所有分类
  static async getAllCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取分类失败:', error);
      throw error;
    }
  }

  // 根据分类获取面试记录
  static async getInterviewsByCategory(category: string): Promise<Interview[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`获取分类 ${category} 的面试记录失败:`, error);
      throw error;
    }
  }

  // 获取所有面试记录
  static async getAllInterviews(): Promise<Interview[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取所有面试记录失败:', error);
      throw error;
    }
  }

  // 根据ID获取面试记录
  static async getInterviewById(id: string): Promise<Interview> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`获取面试记录 ${id} 失败:`, error);
      throw error;
    }
  }

  // 添加新的面试记录
  static async addInterview(interview: Interview): Promise<Interview> {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interview)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('添加面试记录失败:', error);
      throw error;
    }
  }

  // 更新面试记录
  static async updateInterview(id: string, interview: Interview): Promise<Interview> {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interview)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('更新面试记录失败:', error);
      throw error;
    }
  }

  // 删除面试记录
  static async deleteInterview(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('删除面试记录失败:', error);
      throw error;
    }
  }
}