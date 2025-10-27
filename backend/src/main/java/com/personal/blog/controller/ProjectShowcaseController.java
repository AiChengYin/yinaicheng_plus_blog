package com.personal.blog.controller;

import com.personal.blog.model.ProjectShowcase;
import com.personal.blog.repository.ProjectShowcaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectShowcaseController {

    @Autowired
    private ProjectShowcaseRepository projectShowcaseRepository;

    /**
     * 获取所有项目展示内容
     */
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProjectShowcase> getAllProjects() {
        return projectShowcaseRepository.findAll();
    }

    /**
     * 根据项目分类获取内容
     */
    @GetMapping(value = "/category/{projectCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProjectShowcase> getProjectsByCategory(@PathVariable String projectCategory) {
        return projectShowcaseRepository.findByProjectCategory(projectCategory);
    }
}