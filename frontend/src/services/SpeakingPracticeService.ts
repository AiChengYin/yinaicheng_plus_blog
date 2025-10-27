// 面试专栏服务
const API_BASE_URL = 'http://localhost:8080/api/speakingPractice'

export interface SpeakingPractice {
  id?: string;
  category: string;
  title: string;
  content: string;
  remark: string;
}

export default class SpeakingPracticeService {
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

  // 根据分类获取口语练习
  static async getSpeakingPracticesByCategory(category: string): Promise<SpeakingPractice[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`获取分类 ${category} 的口语练习失败:`, error);
      throw error;
    }
  }

  // 获取所有口语练习
  static async getAllSpeakingPractices(): Promise<SpeakingPractice[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取所有口语练习失败:', error);
      throw error;
    }
  }

  // 根据ID获取口语练习
  static async getSpeakingPracticeById(id: string): Promise<SpeakingPractice> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`获取口语练习 ${id} 失败:`, error);
      throw error;
    }
  }

  // 添加新的口语练习
  static async addSpeakingPractice(speakingPractice: SpeakingPractice): Promise<SpeakingPractice> {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(speakingPractice)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('添加口语练习失败:', error);
      throw error;
    }
  }

  // 更新口语练习
  static async updateSpeakingPractice(id: string, speakingPractice: SpeakingPractice): Promise<SpeakingPractice> {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(speakingPractice)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('更新口语练习失败:', error);
      throw error;
    }
  }

  // 删除口语练习
  static async deleteSpeakingPractice(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('删除口语练习失败:', error);
      throw error;
    }
  }
}