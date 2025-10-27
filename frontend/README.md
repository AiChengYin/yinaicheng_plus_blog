# 个人博客网站前端

## 技术栈
- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia

## 项目结构
```
frontend/
├── src/
│   ├── assets/ (静态资源)
│   ├── services/ (API服务)
│   ├── views/ (页面视图)
│   │   ├── cms/ (CMS管理页面)
│   │   ├── HomeView.vue (ホーム)
│   │   ├── JapaneseView.vue (日本語学習页面)
│   │   ├── ProjectsView.vue (プロジェクト紹介页面)
│   │   └── BlogView.vue (技術ブログ页面)
│   ├── App.vue (根组件)
│   └── main.ts (入口文件)
├── public/ (公共静态资源)
├── index.html (入口HTML)
├── package.json (依赖配置)
└── vite.config.ts (Vite配置)
```

## 运行项目

1. 确保已安装Node.js v20.19.1
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```
4. 访问 `http://localhost:3000`

## 构建项目

```bash
npm run build
```

构建后的文件将位于 `dist/` 目录中。

## 页面说明

### ホーム
展示个人博客的简介和导航。

### 日本語学習
展示文句、文法、必要な覚える単語、聞き取れない単語和話題等内容。

### プロジェクト紹介
展示个人参与的项目，包括：
- 网易云计算计费出账
- 网易数帆云公共项目
- 三叉戟智能集运平台
- 洋山四期大数据运营效率分析系统
- 基于流量回放的自动化回归测试工具

### 技術ブログ
按分类展示技术文章，包括：
- 算法与数据结构
- 关系型数据库
- 高并发网络编程
- 负载均衡中间件
- 分布式消息中间件

### CMS管理
内容管理系统，可以添加、修改、删除日本語学習内容、プロジェクト紹介内容和技術ブログ文章。

## API服务

前端通过以下服务与后端API交互：
- `JapaneseStudyService.ts` - 日本語学習服务
- `ProjectService.ts` - プロジェクト紹介服务
- `BlogService.ts` - 技術ブログ服务

所有服务都通过 `fetch` API 与后端通信，默认后端地址为 `http://34.53.45.176:8080`。