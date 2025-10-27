package com.personal.blog.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "project_showcase")
public class ProjectShowcase {
    @Id
    private String id;
    private String content;
    private String projectCategory;

    public ProjectShowcase() {}

    public ProjectShowcase(String content, String projectCategory) {
        this.content = content;
        this.projectCategory = projectCategory;
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

    public String getProjectCategory() {
        return projectCategory;
    }

    public void setProjectCategory(String projectCategory) {
        this.projectCategory = projectCategory;
    }

    @Override
    public String toString() {
        return "ProjectShowcase{" +
                "id='" + id + '\'' +
                ", content='" + content + '\'' +
                ", projectCategory='" + projectCategory + '\'' +
                '}';
    }
}