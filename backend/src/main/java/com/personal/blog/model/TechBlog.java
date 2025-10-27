package com.personal.blog.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tech_blog")
public class TechBlog {
    @Id
    private String id;
    private String content;
    private String title;
    private String categoryLevel1;
    private String categoryLevel2;

    public TechBlog() {}

    public TechBlog(String content, String title, String categoryLevel1, String categoryLevel2) {
        this.content = content;
        this.title = title;
        this.categoryLevel1 = categoryLevel1;
        this.categoryLevel2 = categoryLevel2;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategoryLevel1() {
        return categoryLevel1;
    }

    public void setCategoryLevel1(String categoryLevel1) {
        this.categoryLevel1 = categoryLevel1;
    }

    public String getCategoryLevel2() {
        return categoryLevel2;
    }

    public void setCategoryLevel2(String categoryLevel2) {
        this.categoryLevel2 = categoryLevel2;
    }

    @Override
    public String toString() {
        return "TechBlog{" +
                "id='" + id + '\'' +
                ", content='" + content + '\'' +
                ", title='" + title + '\'' +
                ", categoryLevel1='" + categoryLevel1 + '\'' +
                ", categoryLevel2='" + categoryLevel2 + '\'' +
                '}';
    }
}