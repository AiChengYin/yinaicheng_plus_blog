# 个人博客网站后端

## 技术栈
- Java 8
- Spring Boot
- MongoDB

## 项目结构
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/personal/blog/
│   │   │       ├── BlogApplication.java (主应用入口)
│   │   │       ├── config/ (配置类)
│   │   │       ├── controller/ (控制器)
│   │   │       ├── model/ (数据模型)
│   │   │       ├── repository/ (数据访问层)
│   │   │       └── service/ (业务逻辑层)
│   │   └── resources/
│   │       └── application.yml (配置文件)
│   └── test/ (测试代码)
└── pom.xml (Maven配置文件)
```

## 运行项目

1. 确保已安装Java 8和MongoDB
2. 在项目根目录下运行：
   ```bash
   mvn spring-boot:run
   ```
3. 服务将启动在 `http://localhost:8080`

## API接口

### 日语学习
- GET `/api/japanese/all` - 获取所有日语学习内容
- GET `/api/japanese/category/{category}` - 根据分类获取内容
- POST `/api/japanese/add` - 添加新的学习内容
- PUT `/api/japanese/update/{id}` - 更新学习内容
- DELETE `/api/japanese/delete/{id}` - 删除学习内容

### 项目展示
- GET `/api/projects/all` - 获取所有项目展示内容
- GET `/api/projects/category/{projectCategory}` - 根据项目分类获取内容
- POST `/api/projects/add` - 添加新的项目内容
- PUT `/api/projects/update/{id}` - 更新项目内容
- DELETE `/api/projects/delete/{id}` - 删除项目内容

### 技术博客
- GET `/api/blog/all` - 获取所有技术博客文章
- GET `/api/blog/category/{categoryLevel1}` - 根据一级分类获取文章
- GET `/api/blog/category/{categoryLevel1}/{categoryLevel2}` - 根据一级和二级分类获取文章
- POST `/api/blog/add` - 添加新的博客文章
- PUT `/api/blog/update/{id}` - 更新博客文章
- DELETE `/api/blog/delete/{id}` - 删除博客文章

### 配置管理
- GET `/api/config/current` - 获取当前配置
- PUT `/api/config/cron` - 更新定时任务表达式
- PUT `/api/config/file-urls` - 更新文件URL配置
- PUT `/api/config/strategy` - 更新更新策略

## 定时任务配置

在 `application.yml` 中可以配置：

```yaml
sync:
  cron: "0 0 1 * * ?" # 每天凌晨1点执行
  file-urls:
    daily-sentence: "https://example.com/daily_sentence.txt"
    daily-grammar: "https://example.com/daily_grammar.txt"
    new-words: "https://example.com/new_words.txt"
    review-words: "https://example.com/review_words.txt"
    practice-topics: "https://example.com/practice_topics.txt"
  strategies:
    # 更新策略: incremental(增量更新), full(全量更新)
    update-strategy: incremental
```

## 启动

nohup java -jar blog-backend-1.0.0.jar > /data/software/yinaicheng_plus_blog/backend/blog-backend.log 2>&1 &